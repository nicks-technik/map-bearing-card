import { HomeAssistant, HassEntity, MapBearingCardConfig, VehicleState, ZoneData } from '../types';
import { normalizeBearing, getCardinalDirection, calculateBearing, calculateDistanceMeters } from './bearing';

/**
 * Safely parse a value as a finite number.
 */
export function parseNumber(val: any): number | null {
  if (val === null || val === undefined || val === '') return null;
  const num = typeof val === 'number' ? val : parseFloat(String(val).trim());
  return isFinite(num) ? num : null;
}

/**
 * Extracts coordinates from an entity or configured entities/attributes.
 */
export function extractCoordinates(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig
): { lat: number | null; lon: number | null } {
  // If separate lat/lon entities are configured
  if (config.latitude_entity && hass.states[config.latitude_entity]) {
    const latState = hass.states[config.latitude_entity];
    const latVal = config.latitude_attribute
      ? latState.attributes[config.latitude_attribute]
      : latState.state;
    const lonEntity = config.longitude_entity ? hass.states[config.longitude_entity] : null;
    const lonVal = lonEntity
      ? config.longitude_attribute
        ? lonEntity.attributes[config.longitude_attribute]
        : lonEntity.state
      : null;

    const lat = parseNumber(latVal);
    const lon = parseNumber(lonVal);
    if (lat !== null && lon !== null) return { lat, lon };
  }

  if (!entity || !entity.attributes) {
    return { lat: null, lon: null };
  }

  const attrs = entity.attributes;
  const latKey = config.latitude_attribute || ['latitude', 'lat', 'Latitude'].find(k => k in attrs);
  const lonKey = config.longitude_attribute || ['longitude', 'lon', 'lng', 'Longitude'].find(k => k in attrs);

  const lat = latKey ? parseNumber(attrs[latKey]) : null;
  const lon = lonKey ? parseNumber(attrs[lonKey]) : null;

  return { lat, lon };
}

/**
 * Extracts bearing/heading from entity attributes or dedicated bearing entity.
 */
export function extractBearing(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig,
  previousPos?: { lat: number; lon: number } | null,
  currentPos?: { lat: number; lon: number } | null
): { bearing: number | null; rawBearing: number | null } {
  let rawBearing: number | null = null;

  // 1. Check dedicated bearing entity if provided
  if (config.bearing_entity && hass.states[config.bearing_entity]) {
    const bState = hass.states[config.bearing_entity];
    if (config.bearing_attribute && bState.attributes[config.bearing_attribute] !== undefined) {
      rawBearing = parseNumber(bState.attributes[config.bearing_attribute]);
    } else {
      rawBearing = parseNumber(bState.state);
    }
  }

  // 2. Check main entity attributes if bearing entity not set or yielded no number
  if (rawBearing === null && entity && entity.attributes) {
    const attrs = entity.attributes;
    if (config.bearing_attribute && attrs[config.bearing_attribute] !== undefined) {
      rawBearing = parseNumber(attrs[config.bearing_attribute]);
    } else {
      const candidates = ['bearing', 'heading', 'direction', 'course', 'angle', 'compass', 'azimuth'];
      for (const key of candidates) {
        if (key in attrs) {
          const val = parseNumber(attrs[key]);
          if (val !== null) {
            rawBearing = val;
            break;
          }
        }
      }
    }
  }

  // 3. Fallback: calculate bearing from movement if vehicle traveled >= 3 meters
  if (rawBearing === null && previousPos && currentPos) {
    const dist = calculateDistanceMeters(previousPos.lat, previousPos.lon, currentPos.lat, currentPos.lon);
    if (dist >= 3) {
      rawBearing = calculateBearing(previousPos.lat, previousPos.lon, currentPos.lat, currentPos.lon);
    }
  }

  if (rawBearing === null) {
    return { bearing: null, rawBearing: null };
  }

  const offset = config.bearing_offset || 0;
  const finalBearing = normalizeBearing(rawBearing + offset);
  return { bearing: finalBearing, rawBearing };
}

/**
 * Extracts speed value and unit.
 */
export function extractSpeed(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig
): { speedFormatted: string | null; speedRaw: number | null; speedUnit: string } {
  let speedRaw: number | null = null;
  let unit = config.speed_unit || 'km/h';

  if (config.speed_entity && hass.states[config.speed_entity]) {
    const sState = hass.states[config.speed_entity];
    speedRaw = config.speed_attribute
      ? parseNumber(sState.attributes[config.speed_attribute])
      : parseNumber(sState.state);
    if (sState.attributes.unit_of_measurement) {
      unit = config.speed_unit || sState.attributes.unit_of_measurement;
    }
  } else if (entity && entity.attributes) {
    const attrs = entity.attributes;
    if (config.speed_attribute && attrs[config.speed_attribute] !== undefined) {
      speedRaw = parseNumber(attrs[config.speed_attribute]);
    } else {
      for (const k of ['speed', 'velocity']) {
        if (k in attrs) {
          speedRaw = parseNumber(attrs[k]);
          break;
        }
      }
    }
    if (attrs.speed_unit || attrs.unit_of_measurement) {
      unit = config.speed_unit || attrs.speed_unit || attrs.unit_of_measurement;
    }
  }

  const speedFormatted = speedRaw !== null ? `${Math.round(speedRaw)} ${unit}` : null;
  return { speedFormatted, speedRaw, speedUnit: unit };
}

/**
 * Extracts battery level in percent.
 */
export function extractBattery(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig
): number | null {
  if (config.battery_entity && hass.states[config.battery_entity]) {
    const bState = hass.states[config.battery_entity];
    const val = config.battery_attribute
      ? bState.attributes[config.battery_attribute]
      : bState.state;
    return parseNumber(val);
  }

  if (entity && entity.attributes) {
    const attrs = entity.attributes;
    if (config.battery_attribute && attrs[config.battery_attribute] !== undefined) {
      return parseNumber(attrs[config.battery_attribute]);
    }
    for (const k of ['battery_level', 'battery', 'battery_percent', 'battery_percentage']) {
      if (k in attrs) {
        return parseNumber(attrs[k]);
      }
    }
  }
  return null;
}

/**
 * Builds full VehicleState object from Home Assistant states.
 */
export function buildVehicleState(
  hass: HomeAssistant,
  config: MapBearingCardConfig,
  previousPos?: { lat: number; lon: number } | null
): VehicleState {
  const entity = hass.states[config.entity];
  const { lat, lon } = extractCoordinates(entity, hass, config);
  const currentPos = lat !== null && lon !== null ? { lat, lon } : null;

  const { bearing, rawBearing } = extractBearing(entity, hass, config, previousPos, currentPos);
  const { speedFormatted, speedRaw, speedUnit } = extractSpeed(entity, hass, config);
  const battery = extractBattery(entity, hass, config);

  const accuracy = entity?.attributes?.gps_accuracy ?? entity?.attributes?.accuracy ?? null;
  const name = config.title || entity?.attributes?.friendly_name || config.entity || 'Vehicle';
  
  let stateText = entity?.state || 'Unknown';
  if (stateText === 'not_home') stateText = 'Away';
  else if (stateText === 'home') stateText = 'Home';

  const isMoving = (speedRaw !== null && speedRaw > 1) || (stateText.toLowerCase() === 'driving');

  return {
    latitude: lat,
    longitude: lon,
    bearing,
    displayBearing: rawBearing,
    cardinal: bearing !== null ? getCardinalDirection(bearing) : '',
    speed: speedFormatted,
    speedRaw,
    speedUnit,
    battery: battery !== null ? Math.round(battery) : null,
    accuracy: parseNumber(accuracy),
    name,
    stateText,
    lastUpdated: entity?.last_updated ? formatRelativeTime(entity.last_updated) : null,
    isMoving,
  };
}

/**
 * Extracts zones defined in Home Assistant.
 */
export function extractZones(hass: HomeAssistant): ZoneData[] {
  const zones: ZoneData[] = [];
  for (const entityId of Object.keys(hass.states)) {
    if (entityId.startsWith('zone.')) {
      const z = hass.states[entityId];
      const lat = parseNumber(z.attributes?.latitude);
      const lon = parseNumber(z.attributes?.longitude);
      const radius = parseNumber(z.attributes?.radius) || 100;
      if (lat !== null && lon !== null) {
        zones.push({
          id: entityId,
          name: z.attributes?.friendly_name || entityId.replace('zone.', ''),
          latitude: lat,
          longitude: lon,
          radius,
          icon: z.attributes?.icon,
          passive: !!z.attributes?.passive,
        });
      }
    }
  }
  return zones;
}

/**
 * Formats ISO timestamp to human-friendly relative time (e.g., 'Just now', '4m ago', '2h ago').
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const diffSeconds = Math.round((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diffSeconds < 30) return 'Just now';
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const minutes = Math.floor(diffSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return '';
  }
}
