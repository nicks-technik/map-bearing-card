import { MapBearingCardConfig } from './types';

export const CARD_VERSION = '1.1.0';
export const CARD_TAG = 'map-bearing-card';
export const CARD_EDITOR_TAG = 'map-bearing-card-editor';

export const XPENG_COLOR_PRESETS = [
  { name: 'Fiery Orange (G6 Hero)', hex: '#ea580c' },
  { name: 'Arctic White', hex: '#f8fafc' },
  { name: 'Graphite Gray', hex: '#4b5563' },
  { name: 'Silver Frost', hex: '#94a3b8' },
  { name: 'Midnight Obsidian', hex: '#0f172a' },
  { name: 'Nebula Green', hex: '#059669' },
  { name: 'Starry Blue', hex: '#0284c7' },
];

export const DEFAULT_CONFIG: Partial<MapBearingCardConfig> = {
  type: `custom:${CARD_TAG}`,
  vehicle_type: 'xpeng_g6',
  vehicle_color: '#ea580c',
  vehicle_size: 48,
  show_bearing_cone: true,
  show_accuracy: true,
  map_provider: 'auto',
  dark_mode: 'auto',
  default_zoom: 16,
  min_zoom: 3,
  max_zoom: 19,
  card_height: '400px',
  follow_vehicle: true,
  recenter_button: true,
  heads_up_mode: false,
  show_zones: true,
  show_hud: true,
  show_speed: true,
  show_bearing: true,
  show_battery: true,
  show_range: true,
  show_charging: true,
  show_last_updated: true,
  show_fix_age: true,
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
