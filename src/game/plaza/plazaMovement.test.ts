import { expect, test } from "bun:test";
import { Vector3 } from "three";
import { computePlazaMovementDirection } from "./createPlazaExperience";

test("default plaza camera maps left and right input to screen-relative movement", () => {
  const left = computePlazaMovementDirection(Math.PI, -1, 0);
  const right = computePlazaMovementDirection(Math.PI, 1, 0);

  expect(left).toBeInstanceOf(Vector3);
  expect(right).toBeInstanceOf(Vector3);

  expect(left.x).toBeGreaterThan(0);
  expect(right.x).toBeLessThan(0);
  expect(left.z).toBeCloseTo(0, 6);
  expect(right.z).toBeCloseTo(0, 6);
});

test("forward plaza input follows the current camera yaw", () => {
  const forward = computePlazaMovementDirection(Math.PI, 0, 1);
  const backward = computePlazaMovementDirection(Math.PI, 0, -1);

  expect(forward.z).toBeGreaterThan(0);
  expect(backward.z).toBeLessThan(0);
  expect(forward.x).toBeCloseTo(0, 6);
  expect(backward.x).toBeCloseTo(0, 6);
});
