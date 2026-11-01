import { describe, it, expect } from 'vitest';
import {
  normalizeBearing,
  getCardinalDirection,
  unwrapAngle,
  calculateBearing,
  calculateDistanceMeters,
  formatBearingDisplay,
} from '../src/utils/bearing';

describe('normalizeBearing', () => {
  it('keeps angles in 0..360 as-is', () => {
    expect(normalizeBearing(0)).toBe(0);
    expect(normalizeBearing(90)).toBe(90);
    expect(normalizeBearing(180)).toBe(180);
    expect(normalizeBearing(270)).toBe(270);
    expect(normalizeBearing(359.9)).toBeCloseTo(359.9);
  });

  it('normalizes negative angles', () => {
    expect(normalizeBearing(-10)).toBe(350);
    expect(normalizeBearing(-90)).toBe(270);
    expect(normalizeBearing(-360)).toBe(0);
    expect(normalizeBearing(-370)).toBe(350);
  });

  it('normalizes angles >= 360', () => {
    expect(normalizeBearing(360)).toBe(0);
    expect(normalizeBearing(370)).toBe(10);
    expect(normalizeBearing(720)).toBe(0);
    expect(normalizeBearing(735)).toBe(15);
  });
});

describe('getCardinalDirection', () => {
  it('correctly maps 16-point cardinal compass directions', () => {
    expect(getCardinalDirection(0)).toBe('N');
    expect(getCardinalDirection(360)).toBe('N');
    expect(getCardinalDirection(22.5)).toBe('NNE');
    expect(getCardinalDirection(45)).toBe('NE');
    expect(getCardinalDirection(90)).toBe('E');
    expect(getCardinalDirection(135)).toBe('SE');
    expect(getCardinalDirection(180)).toBe('S');
    expect(getCardinalDirection(225)).toBe('SW');
    expect(getCardinalDirection(270)).toBe('W');
    expect(getCardinalDirection(315)).toBe('NW');
    expect(getCardinalDirection(350)).toBe('N');
  });
});

describe('unwrapAngle (continuous shortest-path rotation)', () => {
  it('takes short clockwise step across 0 boundary', () => {
    // Current at 355 deg, target moves to 5 deg.
    // Instead of spinning backwards -350 deg, it rotates forward +10 deg to 365 deg!
    const result = unwrapAngle(5, 355);
    expect(result).toBe(365);
  });

  it('takes short counter-clockwise step across 0 boundary', () => {
    // Current at 5 deg, target moves to 355 deg.
    // Instead of spinning forward +350 deg, it rotates -10 deg to -5 deg!
    const result = unwrapAngle(355, 5);
    expect(result).toBe(-5);
  });

  it('handles cumulative multi-turn angles properly', () => {
    // Already rotated 2 turns (725 deg = 5 deg). Target moves to 355 deg.
    const result = unwrapAngle(355, 725);
    expect(result).toBe(715);
  });

  it('handles standard small rotation without wrapping', () => {
    expect(unwrapAngle(95, 90)).toBe(95);
    expect(unwrapAngle(80, 90)).toBe(80);
  });
});

describe('calculateBearing', () => {
  it('calculates due North bearing', () => {
    const bearing = calculateBearing(50.0, 10.0, 51.0, 10.0);
    expect(bearing).toBeCloseTo(0, 0);
  });

  it('calculates due East bearing', () => {
    const bearing = calculateBearing(0.0, 10.0, 0.0, 11.0);
    expect(bearing).toBeCloseTo(90, 0);
  });

  it('calculates due South bearing', () => {
    const bearing = calculateBearing(51.0, 10.0, 50.0, 10.0);
    expect(bearing).toBeCloseTo(180, 0);
  });

  it('calculates due West bearing', () => {
    const bearing = calculateBearing(0.0, 11.0, 0.0, 10.0);
    expect(bearing).toBeCloseTo(270, 0);
  });
});

describe('calculateDistanceMeters', () => {
  it('returns 0 for identical coordinates', () => {
    expect(calculateDistanceMeters(48.8566, 2.3522, 48.8566, 2.3522)).toBe(0);
  });

  it('computes realistic distance between Paris and London (~343 km)', () => {
    const dist = calculateDistanceMeters(48.8566, 2.3522, 51.5074, -0.1278);
    expect(dist).toBeGreaterThan(340000);
    expect(dist).toBeLessThan(350000);
  });
});

describe('formatBearingDisplay', () => {
  it('formats null/invalid to --', () => {
    expect(formatBearingDisplay(null)).toBe('--');
    expect(formatBearingDisplay(NaN)).toBe('--');
  });

  it('formats valid bearing with degrees and cardinal', () => {
    expect(formatBearingDisplay(0)).toBe('0° N');
    expect(formatBearingDisplay(90)).toBe('90° E');
    expect(formatBearingDisplay(184.2)).toBe('184° S');
    expect(formatBearingDisplay(247)).toBe('247° WSW');
  });
});
