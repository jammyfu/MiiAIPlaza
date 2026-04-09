type PerfSample = {
  count: number;
  total: number;
  last: number;
  min: number;
  max: number;
};

const perfSamples = new Map<string, PerfSample>();

function hasLocationSearchFlag(flag: string) {
  if (typeof location === "undefined") return false;
  return new URLSearchParams(location.search).get(flag) === "1";
}

function hasLocalStorageFlag(key: string) {
  if (typeof localStorage === "undefined") return false;

  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function isPerfTraceEnabled() {
  return hasLocationSearchFlag("perf") || hasLocalStorageFlag("mii_perf_trace");
}

export function recordPerfTrace(label: string, durationMs: number) {
  if (!isPerfTraceEnabled()) return;

  const existing = perfSamples.get(label) ?? {
    count: 0,
    total: 0,
    last: 0,
    min: Number.POSITIVE_INFINITY,
    max: 0,
  };
  existing.count += 1;
  existing.total += durationMs;
  existing.last = durationMs;
  existing.min = Math.min(existing.min, durationMs);
  existing.max = Math.max(existing.max, durationMs);
  perfSamples.set(label, existing);

  const average = existing.total / existing.count;
  console.info(
    `[perf] ${label}: ${durationMs.toFixed(1)}ms (avg ${average.toFixed(1)}ms, min ${existing.min.toFixed(1)}ms, max ${existing.max.toFixed(1)}ms over ${existing.count})`
  );
}

export async function tracePerf<T>(label: string, fn: () => Promise<T> | T) {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    recordPerfTrace(label, performance.now() - start);
  }
}

export function getPerfTraceSummary() {
  return Array.from(perfSamples.entries()).map(([label, sample]) => ({
    label,
    count: sample.count,
    total: sample.total,
    last: sample.last,
    min: sample.min,
    max: sample.max,
    average: sample.total / sample.count,
  }));
}

export function clearPerfTraceSummary() {
  perfSamples.clear();
}
