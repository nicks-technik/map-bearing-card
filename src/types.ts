export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes?: {
    darkMode?: boolean;
    default_theme?: string;
    themes?: Record<string, any>;
  };
  language?: string;
  callService: (domain: string, service: string, serviceData?: Record<string, any>) => Promise<any>;
}

export type VehicleType = 'car' | 'sports_car' | 'suv' | 'truck' | 'arrow' | 'pointer' | 'custom';

export type MapProvider = 'auto' | 'carto_light' | 'carto_dark' | 'osm' | 'satellite' | 'opentopo' | 'custom';

export interface HistoryTrailConfig {
  enabled?: boolean;
  max_points?: number;
  trail_color?: string;
  trail_width?: number;
}

export interface MapBearingCardConfig {
  type: string;
  entity: string;
  title?: string;
  
  // Bearing & Coordinates
  bearing_entity?: string;
  bearing_attribute?: string;
  bearing_offset?: number;
  latitude_entity?: string;
  longitude_entity?: string;
  latitude_attribute?: string;
  longitude_attribute?: string;

  // Secondary metrics
  speed_entity?: string;
  speed_attribute?: string;
  speed_unit?: string;
  battery_entity?: string;
  battery_attribute?: string;

  // Vehicle styling
  vehicle_type?: VehicleType;
  vehicle_image?: string;
  vehicle_color?: string;
  vehicle_size?: number;
  show_bearing_cone?: boolean;
  cone_color?: string;
  show_accuracy?: boolean;

  // Map & Display
  map_provider?: MapProvider;
  dark_mode?: 'auto' | boolean;
  tile_url?: string;
  tile_attribution?: string;
  default_zoom?: number;
  min_zoom?: number;
  max_zoom?: number;
  card_height?: string | number;
  follow_vehicle?: boolean;
  recenter_button?: boolean;
  rotate_with_bearing?: boolean;
  show_zones?: boolean;

  // HUD
  show_hud?: boolean;
  show_speed?: boolean;
  show_bearing?: boolean;
  show_battery?: boolean;
  show_last_updated?: boolean;
  show_address?: boolean;

  // History / Trail
  history_trail?: HistoryTrailConfig;

  // Action
  tap_action?: Record<string, any>;
  hold_action?: Record<string, any>;
}

export interface VehicleState {
  latitude: number | null;
  longitude: number | null;
  bearing: number | null;
  displayBearing: number | null;
  cardinal: string;
  speed: string | null;
  speedRaw: number | null;
  speedUnit: string;
  battery: number | null;
  accuracy: number | null;
  name: string;
  stateText: string;
  lastUpdated: string | null;
  isMoving: boolean;
}

export interface ZoneData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  icon?: string;
  passive?: boolean;
}
