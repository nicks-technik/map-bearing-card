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
 * Handles XPENG's course and bearing attributes automatically.
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

  // 2. Check main entity attributes (course, bearing, heading, etc.)
  if (rawBearing === null && entity && entity.attributes) {
    const attrs = entity.attributes;
    if (config.bearing_attribute && attrs[config.bearing_attribute] !== undefined) {
      rawBearing = parseNumber(attrs[config.bearing_attribute]);
    } else {
      // XPENG device_tracker exposes 'course' and 'bearing'
      const candidates = ['course', 'bearing', 'heading', 'direction', 'angle', 'compass', 'azimuth'];
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

  // 3. Fallback: calculate bearing from GPS movement if vehicle traveled >= 3 meters
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
 * Extracts battery level in percent (supports XPENG battery_soc).
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

  // Auto-discover XPENG or vehicle battery sensor if not explicitly configured
  if (!config.battery_entity && entity) {
    const baseId = entity.entity_id.replace(/^device_tracker\./, 'sensor.').replace(/_location$/, '');
    const candidateSensor = `${baseId}_battery_soc`;
    if (hass.states[candidateSensor]) {
      const val = parseNumber(hass.states[candidateSensor].state);
      if (val !== null) return val;
    }
  }

  if (entity && entity.attributes) {
    const attrs = entity.attributes;
    if (config.battery_attribute && attrs[config.battery_attribute] !== undefined) {
      return parseNumber(attrs[config.battery_attribute]);
    }
    for (const k of ['battery_soc', 'battery_level', 'battery', 'battery_percent', 'battery_percentage', 'soc']) {
      if (k in attrs) {
        return parseNumber(attrs[k]);
      }
    }
  }
  return null;
}

/**
 * Extracts remaining range (km / miles).
 */
export function extractRange(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig
): string | null {
  let rangeNum: number | null = null;
  let unit = 'km';

  if (config.range_entity && hass.states[config.range_entity]) {
    const rState = hass.states[config.range_entity];
    rangeNum = config.range_attribute
      ? parseNumber(rState.attributes[config.range_attribute])
      : parseNumber(rState.state);
    if (rState.attributes?.unit_of_measurement) {
      unit = rState.attributes.unit_of_measurement;
    }
  } else if (entity) {
    // Auto-discover XPENG range sensor: e.g. sensor.xpeng_<vin>_remaining_range
    const baseId = entity.entity_id.replace(/^device_tracker\./, 'sensor.').replace(/_location$/, '');
    for (const suffix of ['_remaining_range', '_range', '_electric_range']) {
      const candidate = `${baseId}${suffix}`;
      if (hass.states[candidate]) {
        const val = parseNumber(hass.states[candidate].state);
        if (val !== null) {
          rangeNum = val;
          unit = hass.states[candidate].attributes?.unit_of_measurement || 'km';
          break;
        }
      }
    }

    if (rangeNum === null && entity.attributes) {
      for (const k of ['remaining_range', 'range', 'electric_range', 'distance_to_empty']) {
        if (k in entity.attributes) {
          rangeNum = parseNumber(entity.attributes[k]);
          if (entity.attributes.range_unit) unit = entity.attributes.range_unit;
          break;
        }
      }
    }
  }

  return rangeNum !== null ? `${Math.round(rangeNum)} ${unit}` : null;
}

/**
 * Extracts charging state (boolean).
 */
export function extractCharging(
  entity: HassEntity | undefined,
  hass: HomeAssistant,
  config: MapBearingCardConfig
): boolean {
  if (config.charging_entity && hass.states[config.charging_entity]) {
    const cState = hass.states[config.charging_entity];
    const val = config.charging_attribute
      ? cState.attributes[config.charging_attribute]
      : cState.state;
    return val === true || val === 'on' || val === 'charging' || val === 1 || val === '1';
  }

  // Auto-discover XPENG charging sensor: e.g. binary_sensor.xpeng_<vin>_charging
  if (entity) {
    const baseId = entity.entity_id.replace(/^device_tracker\./, 'binary_sensor.').replace(/_location$/, '');
    const candidate = `${baseId}_charging`;
    if (hass.states[candidate] && hass.states[candidate].state === 'on') {
      return true;
    }

    if (entity.attributes) {
      for (const k of ['charging', 'is_charging', 'charge_status', 'charging_state']) {
        const val = entity.attributes[k];
        if (val === true || val === 'on' || val === 'charging' || val === 1) return true;
      }
    }
  }

  return false;
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
  const range = extractRange(entity, hass, config);
  const isCharging = extractCharging(entity, hass, config);

  const accuracy = entity?.attributes?.gps_accuracy ?? entity?.attributes?.accuracy ?? null;
  const name = config.title || entity?.attributes?.friendly_name || config.entity || 'XPENG G6';

  // XPENG coord_valid and fix_age_s
  const coordValid = entity?.attributes?.coord_valid !== undefined
    ? !!entity.attributes.coord_valid
    : null;
  const fixAgeSeconds = parseNumber(entity?.attributes?.fix_age_s);
  const fixAgeText = fixAgeSeconds !== null ? formatFixAge(fixAgeSeconds) : null;

  let stateText = entity?.state || 'Parked';
  if (stateText === 'not_home') stateText = 'Away';
  else if (stateText === 'home') stateText = 'Home';

  const isMoving = (speedRaw !== null && speedRaw > 1) || (stateText.toLowerCase() === 'driving');

  // Format parked text with fix age if available
  if (!isMoving && fixAgeText && config.show_fix_age !== false) {
    stateText = `${stateText} · ${fixAgeText}`;
  }

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
    range,
    isCharging,
    accuracy: parseNumber(accuracy),
    name,
    stateText,
    lastUpdated: entity?.last_updated ? formatRelativeTime(entity.last_updated) : null,
    isMoving,
    coordValid,
    fixAgeSeconds,
    fixAgeText,
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
 * Formats fix age in seconds (e.g. 'Fix 45s ago', 'Fix 12m ago', 'Fix 2h ago').
 */
export function formatFixAge(seconds: number): string {
  if (seconds < 45) return 'Fix just now';
  if (seconds < 90) return 'Fix 1m ago';
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `Fix ${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Fix ${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `Fix ${days}d ago`;
}

/**
 * Formats ISO timestamp to human-friendly relative time.
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
