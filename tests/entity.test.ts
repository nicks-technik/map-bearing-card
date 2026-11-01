import { describe, it, expect } from 'vitest';
import {
  extractCoordinates,
  extractBearing,
  extractSpeed,
  extractBattery,
  extractRange,
  extractCharging,
  buildVehicleState,
  extractZones,
  parseNumber,
  formatRelativeTime,
  formatFixAge,
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

describe('XPENG extraction tests', () => {
  const dummyHass: HomeAssistant = {
    states: {
      'sensor.xpeng_g6_battery_soc': {
        entity_id: 'sensor.xpeng_g6_battery_soc',
        state: '74',
        attributes: { unit_of_measurement: '%' },
        last_changed: '',
        last_updated: '',
      },
      'sensor.xpeng_g6_remaining_range': {
        entity_id: 'sensor.xpeng_g6_remaining_range',
        state: '412',
        attributes: { unit_of_measurement: 'km' },
        last_changed: '',
        last_updated: '',
      },
      'binary_sensor.xpeng_g6_charging': {
        entity_id: 'binary_sensor.xpeng_g6_charging',
        state: 'on',
        attributes: {},
        last_changed: '',
        last_updated: '',
      },
    },
    callService: async () => {},
  };

  it('extracts XPENG course and bearing from device_tracker', () => {
    const xpengEntity: HassEntity = {
      entity_id: 'device_tracker.xpeng_g6_location',
      state: 'driving',
      attributes: {
        latitude: 48.1371,
        longitude: 11.5761,
        course: 142.0,
        bearing: 142.0,
        speed: 84.5,
        coord_valid: true,
        fix_age_s: 18,
      },
      last_changed: '',
      last_updated: '',
    };
    dummyHass.states['device_tracker.xpeng_g6_location'] = xpengEntity;
    const config: MapBearingCardConfig = {
      type: 'custom:map-bearing-card',
      entity: 'device_tracker.xpeng_g6_location',
    };

    const bearing = extractBearing(xpengEntity, dummyHass, config);
    expect(bearing.bearing).toBe(142.0);

    const speed = extractSpeed(xpengEntity, dummyHass, config);
    expect(speed.speedRaw).toBe(84.5);
    expect(speed.speedFormatted).toBe('85 km/h');

    const battery = extractBattery(xpengEntity, dummyHass, config);
    expect(battery).toBe(74);

    const range = extractRange(xpengEntity, dummyHass, config);
    expect(range).toBe('412 km');

    const charging = extractCharging(xpengEntity, dummyHass, config);
    expect(charging).toBe(true);

    const vs = buildVehicleState(dummyHass, config);
    expect(vs.isMoving).toBe(true);
    expect(vs.cardinal).toBe('SE');
    expect(vs.battery).toBe(74);
    expect(vs.range).toBe('412 km');
  });

  it('formats parked state with fix age for stale fixes', () => {
    const parkedEntity: HassEntity = {
      entity_id: 'device_tracker.xpeng_g6_location',
      state: 'parked',
      attributes: {
        latitude: 48.1371,
        longitude: 11.5761,
        course: 90,
        bearing: 90,
        speed: 0,
        coord_valid: false,
        fix_age_s: 720, // 12 minutes ago
      },
      last_changed: '',
      last_updated: '',
    };
    const hassWithParked: HomeAssistant = {
      states: {
        'device_tracker.xpeng_g6_location': parkedEntity,
      },
      callService: async () => {},
    };
    const config: MapBearingCardConfig = {
      type: 'custom:map-bearing-card',
      entity: 'device_tracker.xpeng_g6_location',
    };

    const vs = buildVehicleState(hassWithParked, config);
    expect(vs.isMoving).toBe(false);
    expect(vs.stateText).toContain('Fix 12m ago');
  });
});

describe('formatFixAge', () => {
  it('formats seconds, minutes, hours, days', () => {
    expect(formatFixAge(20)).toBe('Fix just now');
    expect(formatFixAge(60)).toBe('Fix 1m ago');
    expect(formatFixAge(300)).toBe('Fix 5m ago');
    expect(formatFixAge(7200)).toBe('Fix 2h ago');
    expect(formatFixAge(172800)).toBe('Fix 2d ago');
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
      },
      callService: async () => {},
    };

    const zones = extractZones(hass);
    expect(zones.length).toBe(1);
    expect(zones[0].name).toBe('Home');
  });
});
