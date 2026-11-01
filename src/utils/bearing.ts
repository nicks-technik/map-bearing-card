const CARDINAL_POINTS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
] as const;

/**
 * Normalizes any angle in degrees to the [0, 360) range.
 */
export function normalizeBearing(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * Returns the 16-point cardinal compass string (e.g., 'N', 'SSW', 'ENE')
 */
export function getCardinalDirection(deg: number): string {
  const normalized = normalizeBearing(deg);
  const index = Math.round(normalized / 22.5) % 16;
  return CARDINAL_POINTS[index];
}

/**
 * Computes continuous cumulative angle to ensure shortest path rotation animation.
 * Prevents 360-degree reverse spins when crossing the 0/360 boundary.
 */
export function unwrapAngle(targetBearing: number, currentCumulativeAngle: number): number {
  const normCurrent = normalizeBearing(currentCumulativeAngle);
  const normTarget = normalizeBearing(targetBearing);
  
  let diff = normTarget - normCurrent;
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }
  
  return currentCumulativeAngle + diff;
}

/**
 * Computes forward azimuth (bearing) between two geographic coordinates in degrees [0, 360).
 */
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaLambda = toRad(lon2 - lon1);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  return normalizeBearing(toDeg(theta));
}

/**
 * Computes great-circle distance between two coordinates in meters.
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Formats a bearing for display (e.g., "184° S" or "23° NNE")
 */
export function formatBearingDisplay(bearing: number | null): string {
  if (bearing === null || isNaN(bearing)) {
    return '--';
  }
  const norm = Math.round(normalizeBearing(bearing));
  const cardinal = getCardinalDirection(norm);
  return `${norm}° ${cardinal}`;
}
