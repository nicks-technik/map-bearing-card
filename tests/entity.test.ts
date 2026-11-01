import { describe, it, expect } from 'vitest';
import {
  extractCoordinates,
  extractBearing,
  extractSpeed,
  extractBattery,
  buildVehicleState,
  extractZones,
  parseNumber,
  formatRelativeTime,
} from '../src/utils/entity';
import { HomeAssistant, HassEntity, MapBearingCardConfig } from '../src/types';

describe('parseNumber', () => {
  it('parses numeric values and strings', () => {
    expect(parseNumber(42)).toBe(42);
    expect(parseNumber('42.5')).toBe(42.5);
    expect(parseNumber('-18.2')).toBe(-18.2);
    expect(parseNumber('  100  ')).toBe(100);
  });

  it('returns null for invalid inputs', () => {
    expect(parseNumber(null)).toBeNull();
    expect(parseNumber(undefined)).toBeNull();
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('unknown')).toBeNull();
    expect(parseNumber(NaN)).toBeNull();
    expect(parseNumber(Infinity)).toBeNull();
  });
});

describe('extractCoordinates', () => {
  const dummyHass: HomeAssistant = {
    states: {},
    callService: async () => {},
  };

  it('extracts latitude and longitude from entity attributes', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'home',
      attributes: {
        latitude: 52.5200,
        longitude: 13.4050,
      },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'device_tracker.car' };

    const coords = extractCoordinates(entity, dummyHass, config);
    expect(coords.lat).toBe(52.5200);
    expect(coords.lon).toBe(13.4050);
  });

  it('supports shorthand lat and lon / lng', () => {
    const entity: HassEntity = {
      entity_id: 'sensor.car_gps',
      state: 'ok',
      attributes: {
        lat: 40.7128,
        lon: -74.0060,
      },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'sensor.car_gps' };

    const coords = extractCoordinates(entity, dummyHass, config);
    expect(coords.lat).toBe(40.7128);
    expect(coords.lon).toBe(-74.0060);
  });

  it('supports separate latitude and longitude entities', () => {
    const hassWithSensors: HomeAssistant = {
      states: {
        'sensor.lat': {
          entity_id: 'sensor.lat',
          state: '37.7749',
          attributes: {},
          last_changed: '',
          last_updated: '',
        },
        'sensor.lon': {
          entity_id: 'sensor.lon',
          state: '-122.4194',
          attributes: {},
          last_changed: '',
          last_updated: '',
        },
      },
      callService: async () => {},
    };
    const config: MapBearingCardConfig = {
      type: 'custom:map-bearing-card',
      entity: 'device_tracker.car',
      latitude_entity: 'sensor.lat',
      longitude_entity: 'sensor.lon',
    };

    const coords = extractCoordinates(undefined, hassWithSensors, config);
    expect(coords.lat).toBe(37.7749);
    expect(coords.lon).toBe(-122.4194);
  });
});

describe('extractBearing', () => {
  const dummyHass: HomeAssistant = {
    states: {
      'sensor.car_heading': {
        entity_id: 'sensor.car_heading',
        state: '185.5',
        attributes: {},
        last_changed: '',
        last_updated: '',
      },
    },
    callService: async () => {},
  };

  it('extracts bearing from standard bearing attribute', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: { bearing: 90 },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'device_tracker.car' };

    const result = extractBearing(entity, dummyHass, config);
    expect(result.bearing).toBe(90);
  });

  it('extracts heading attribute when bearing is absent', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: { heading: 275 },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'device_tracker.car' };

    const result = extractBearing(entity, dummyHass, config);
    expect(result.bearing).toBe(275);
  });

  it('applies bearing offset if configured', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: { bearing: 350 },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = {
      type: 'custom:map-bearing-card',
      entity: 'device_tracker.car',
      bearing_offset: 20,
    };

    const result = extractBearing(entity, dummyHass, config);
    expect(result.bearing).toBe(10); // (350 + 20) % 360 = 10
  });

  it('uses dedicated bearing_entity when specified', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: { bearing: 10 },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = {
      type: 'custom:map-bearing-card',
      entity: 'device_tracker.car',
      bearing_entity: 'sensor.car_heading',
    };

    const result = extractBearing(entity, dummyHass, config);
    expect(result.bearing).toBe(185.5);
  });

  it('calculates bearing from movement fallback if no attribute provided', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: {},
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'device_tracker.car' };

    const prevPos = { lat: 50.0, lon: 10.0 };
    const curPos = { lat: 50.01, lon: 10.0 }; // Moved North

    const result = extractBearing(entity, dummyHass, config, prevPos, curPos);
    expect(result.bearing).toBeCloseTo(0, 0);
  });
});

describe('extractSpeed & extractBattery', () => {
  const dummyHass: HomeAssistant = {
    states: {},
    callService: async () => {},
  };

  it('extracts speed and battery from entity attributes', () => {
    const entity: HassEntity = {
      entity_id: 'device_tracker.car',
      state: 'driving',
      attributes: {
        speed: 68.4,
        unit_of_measurement: 'km/h',
        battery_level: 84,
      },
      last_changed: '',
      last_updated: '',
    };
    const config: MapBearingCardConfig = { type: 'custom:map-bearing-card', entity: 'device_tracker.car' };

    const speed = extractSpeed(entity, dummyHass, config);
    expect(speed.speedRaw).toBe(68.4);
    expect(speed.speedFormatted).toBe('68 km/h');

    const battery = extractBattery(entity, dummyHass, config);
    expect(battery).toBe(84);
  });
});

describe('extractZones', () => {
  it('extracts active Home Assistant zones', () => {
    const hass: HomeAssistant = {
      states: {
        'zone.home': {
          entity_id: 'zone.home',
          state: 'zoning',
          attributes: {
            friendly_name: 'Home',
            latitude: 48.1371,
            longitude: 11.5761,
            radius: 150,
          },
          last_changed: '',
          last_updated: '',
        },
        'zone.work': {
          entity_id: 'zone.work',
          state: 'zoning',
          attributes: {
            friendly_name: 'Office',
            latitude: 48.1400,
            longitude: 11.5800,
            radius: 80,
          },
          last_changed: '',
          last_updated: '',
        },
        'light.living_room': {
          entity_id: 'light.living_room',
          state: 'on',
          attributes: {},
          last_changed: '',
          last_updated: '',
        },
      },
      callService: async () => {},
    };

    const zones = extractZones(hass);
    expect(zones.length).toBe(2);
    expect(zones[0].name).toBe('Home');
    expect(zones[0].radius).toBe(150);
    expect(zones[1].name).toBe('Office');
  });
});

describe('formatRelativeTime', () => {
  it('formats recent timestamp', () => {
    const nowIso = new Date().toISOString();
    expect(formatRelativeTime(nowIso)).toBe('Just now');
  });
});
