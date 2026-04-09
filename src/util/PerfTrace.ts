type PerfSample = {
  count: number;
  total: number;
  last: number;
  min: number;
  max: number;
};

export type PerfTraceSummaryEntry = {
  label: string;
  count: number;
  total: number;
  share: number;
  last: number;
  min: number;
  max: number;
  average: number;
};

export type PerfTraceCategorySummaryEntry = PerfTraceSummaryEntry & {
  category: string;
};

export type PerfTraceSortKey =
  | "label"
  | "count"
  | "total"
  | "last"
  | "min"
  | "max"
  | "average";

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

export function getPerfTraceSummary(
  sortBy: PerfTraceSortKey = "average",
  limit?: number
): PerfTraceSummaryEntry[] {
  const totalDuration = Array.from(perfSamples.values()).reduce(
    (sum, sample) => sum + sample.total,
    0
  );
  const summary = Array.from(perfSamples.entries())
    .map(([label, sample]) => ({
      label,
      count: sample.count,
      total: sample.total,
      share: totalDuration === 0 ? 0 : sample.total / totalDuration,
      last: sample.last,
      min: sample.min,
      max: sample.max,
      average: sample.total / sample.count,
    }))
    .sort((a, b) => {
      if (sortBy === "label") {
        return a.label.localeCompare(b.label);
      }

      return b[sortBy] - a[sortBy];
    });

  if (limit === undefined) {
    return summary;
  }

  return summary.slice(0, limit);
}

export function clearPerfTraceSummary() {
  perfSamples.clear();
}

export function printPerfTraceSummary(
  sortBy: PerfTraceSortKey = "total",
  limit?: number
) {
  const summary = getPerfTraceSummary(sortBy, limit).map((entry) => ({
    label: entry.label,
    share: `${(entry.share * 100).toFixed(1)}%`,
    count: entry.count,
    last: Number(entry.last.toFixed(1)),
    min: Number(entry.min.toFixed(1)),
    avg: Number(entry.average.toFixed(1)),
    max: Number(entry.max.toFixed(1)),
    total: Number(entry.total.toFixed(1)),
  }));

  console.table(summary);
  return summary;
}

function getPerfTraceCategory(label: string) {
  return label.split(".")[0] || label;
}

export function getPerfTraceCategorySummary(
  sortBy: PerfTraceSortKey = "total",
  limit?: number
): PerfTraceCategorySummaryEntry[] {
  const grouped = new Map<string, PerfSample>();

  perfSamples.forEach((sample, label) => {
    const category = getPerfTraceCategory(label);
    const existing = grouped.get(category) ?? {
      count: 0,
      total: 0,
      last: 0,
      min: Number.POSITIVE_INFINITY,
      max: 0,
    };

    existing.count += sample.count;
    existing.total += sample.total;
    existing.last = Math.max(existing.last, sample.last);
    existing.min = Math.min(existing.min, sample.min);
    existing.max = Math.max(existing.max, sample.max);
    grouped.set(category, existing);
  });

  const totalDuration = Array.from(grouped.values()).reduce(
    (sum, sample) => sum + sample.total,
    0
  );
  const summary = Array.from(grouped.entries())
    .map(([category, sample]) => ({
      category,
      label: category,
      count: sample.count,
      total: sample.total,
      share: totalDuration === 0 ? 0 : sample.total / totalDuration,
      last: sample.last,
      min: sample.min,
      max: sample.max,
      average: sample.total / sample.count,
    }))
    .sort((a, b) => {
      if (sortBy === "label") {
        return a.category.localeCompare(b.category);
      }

      return b[sortBy] - a[sortBy];
    });

  if (limit === undefined) {
    return summary;
  }

  return summary.slice(0, limit);
}

export function printPerfTraceCategorySummary(
  sortBy: PerfTraceSortKey = "total",
  limit?: number
) {
  const summary = getPerfTraceCategorySummary(sortBy, limit).map((entry) => ({
    category: entry.category,
    share: `${(entry.share * 100).toFixed(1)}%`,
    count: entry.count,
    last: Number(entry.last.toFixed(1)),
    min: Number(entry.min.toFixed(1)),
    avg: Number(entry.average.toFixed(1)),
    max: Number(entry.max.toFixed(1)),
    total: Number(entry.total.toFixed(1)),
  }));

  console.table(summary);
  return summary;
}
