import { MapBearingCardConfig } from './types';

export const CARD_VERSION = '1.0.0';
export const CARD_TAG = 'map-bearing-card';
export const CARD_EDITOR_TAG = 'map-bearing-card-editor';

export const DEFAULT_CONFIG: Partial<MapBearingCardConfig> = {
  type: `custom:${CARD_TAG}`,
  vehicle_type: 'car',
  vehicle_color: '#1e88e5',
  vehicle_size: 46,
  show_bearing_cone: true,
  show_accuracy: true,
  map_provider: 'auto',
  dark_mode: 'auto',
  default_zoom: 16,
  min_zoom: 3,
  max_zoom: 19,
  card_height: '380px',
  follow_vehicle: true,
  recenter_button: true,
  rotate_with_bearing: false,
  show_zones: true,
  show_hud: true,
  show_speed: true,
  show_bearing: true,
  show_battery: true,
  show_last_updated: true,
  show_address: true,
  bearing_offset: 0,
};

export interface TileLayerDef {
  url: string;
  attribution: string;
  subdomains?: string[];
  maxZoom?: number;
}

export const TILE_LAYERS: Record<string, TileLayerDef> = {
  carto_light: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
  },
  carto_dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
  },
  osm: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
  },
  opentopo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 17,
  },
};
