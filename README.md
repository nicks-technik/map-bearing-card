# 🧭 Map Bearing Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://github.com/nicks-technik/map-bearing-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, highly customizable Lovelace map card for **Home Assistant** that displays your vehicle at its live GPS position and **smoothly rotates the vehicle marker to match its real-time bearing / heading**.

Standard Home Assistant map cards display round entity pictures or fixed icons. **Map Bearing Card** brings full automotive navigation visualization to your Home Assistant dashboard!

---

## ✨ Features

- 🧭 **Real-Time Bearing / Heading Rotation**:
  - Marker rotates in real-time matching `bearing`, `heading`, `direction`, `course`, or a dedicated heading sensor.
  - **Continuous Shortest-Path Rotation**: Takes the shortest rotation arc across the $0^\circ / 360^\circ$ North boundary without wild $360^\circ$ reverse spins.
  - **Movement-Based Azimuth Fallback**: If an entity lacks a bearing attribute, the card automatically computes the forward azimuth from GPS coordinate delta when moving!
- 🏎️ **6 Built-in Top-Down Vehicle Silhouettes**:
  - `car` — Modern EV / Aerodynamic Sedan (e.g. Tesla Model 3 / Model S / EV)
  - `sports_car` — Aggressive GT Widebody with aero wing
  - `suv` — Modern SUV / Crossover with roof rails
  - `truck` — Pickup Truck or Delivery Van
  - `arrow` — Sleek navigation chevron (Apple / Google Maps style)
  - `pointer` — Compass needle teardrop pointer
  - `custom` — Use any custom top-down transparent PNG or SVG image URL!
- 🔦 **Directional Beam (Cone of Sight)**:
  - Optional forward headlight beam illuminating the road ahead in the direction of travel.
- 🎯 **GPS Accuracy Circle**:
  - Dynamic translucent radius circle matching `gps_accuracy` (meters).
- 🌓 **Home Assistant Theme-Aware Auto Dark / Light Mode**:
  - Automatically switches between **CartoDB Positron** (light) and **CartoDB Dark Matter** (dark) to seamlessly match your Home Assistant dashboard theme.
  - Or choose from OpenStreetMap, Esri Satellite Imagery, OpenTopoMap, or custom tile providers.
- 📊 **Interactive HUD Overlay**:
  - Displays vehicle friendly name, state badge (*"Driving"*, *"Parked"*), speed with units (*"58 km/h"*), battery level (*"78%"*), cardinal compass chip (*"🧭 184° S"*), and relative timestamp.
  - Tap header or vehicle marker to open the entity's native Home Assistant more-info dialog.
  - Recenter button appears when the map is manually panned away.
- 🏡 **Home Assistant Zones**:
  - Automatically displays zones (e.g. `zone.home`, `zone.work`) with custom radius and tooltips.
- ⚙️ **Full Lovelace GUI Card Editor**:
  - Configure entities, colors, models, zoom, height, and display toggles directly in the Home Assistant visual editor.
- 📦 **100% Offline & Self-Contained**:
  - Leaflet engine and styles are bundled inside the card. Zero external runtime CDN dependencies. Works completely offline on local networks!

---

## 📸 Overview

```
+-----------------------------------------------------------+
|  [ Tesla Model Y | Driving ]                 [ 62 km/h ]  |  <- Top HUD
|                                                           |
|                       ▲ (Directional Beam)                |
|                      / \                                  |
|                     [CAR] (Rotated to 38° NE)             |
|                    ( . . ) GPS Accuracy Circle            |
|                                                           |
|                                                           |
|  [ 🧭 38° NE ]                             [ ⌖ Recenter ] |  <- Bottom HUD
+-----------------------------------------------------------+
```

---

## 🚀 Installation

### Option 1: HACS (Recommended)

1. Open **HACS** in your Home Assistant sidebar.
2. Click the three dots in the top right corner and choose **Custom repositories**.
3. Enter the repository URL: `https://github.com/nicks-technik/map-bearing-card`
4. Select category: **Dashboard** (or **Lovelace**).
5. Click **Add**, then search for **Map Bearing Card** and click **Download**.
6. Refresh your browser dashboard.

### Option 2: Manual Installation

1. Download the bundled [`map-bearing-card.js`](dist/map-bearing-card.js) from the latest release.
2. Copy `map-bearing-card.js` into your Home Assistant directory:
   ```
   <config>/www/map-bearing-card.js
   ```
3. In Home Assistant, navigate to **Settings** -> **Dashboards** -> **Three dots menu** -> **Resources**.
4. Click **Add Resource**:
   - URL: `/local/map-bearing-card.js`
   - Resource type: `JavaScript Module`
5. Refresh your browser cache.

---

## 🛠️ Usage & YAML Configuration

### 1. Visual Card Editor
Add a new card to your dashboard and select **Map Bearing Card**. Use the dropdowns, sliders, and color picker to configure your vehicle without writing code!

### 2. YAML Examples

#### Basic Configuration
```yaml
type: custom:map-bearing-card
entity: device_tracker.my_car
title: "My Electric Vehicle"
```

#### Full Automotive Dashboard Setup (Tesla / TeslaMate)
```yaml
type: custom:map-bearing-card
entity: device_tracker.tesla_model_y
bearing_entity: sensor.tesla_heading
speed_entity: sensor.tesla_speed
battery_entity: sensor.tesla_battery_level
vehicle_type: car
vehicle_color: "#1e88e5"
vehicle_size: 48
show_bearing_cone: true
show_accuracy: true
show_hud: true
show_zones: true
default_zoom: 16
card_height: 420px
map_provider: auto
```

#### Sports Car with Custom Color & Satellite Map
```yaml
type: custom:map-bearing-card
entity: device_tracker.porsche_911
vehicle_type: sports_car
vehicle_color: "#ef4444"
show_bearing_cone: true
map_provider: satellite
default_zoom: 17
card_height: 450px
```

#### Custom Top-Down Vehicle PNG / SVG
```yaml
type: custom:map-bearing-card
entity: device_tracker.delivery_van
vehicle_type: custom
vehicle_image: "/local/my_custom_van.png"
vehicle_size: 54
show_bearing_cone: true
```

#### OwnTracks / Traccar with Bearing Attribute
```yaml
type: custom:map-bearing-card
entity: device_tracker.owntracks_phone
bearing_attribute: course
speed_attribute: velocity
show_bearing_cone: true
follow_vehicle: true
```

---

## ⚙️ Configuration Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | **Required** | Must be `custom:map-bearing-card` |
| `entity` | string | **Required** | Vehicle `device_tracker.*`, `sensor.*`, or `person.*` entity |
| `title` | string | *Friendly Name* | Custom title displayed in the top HUD |
| `bearing_entity` | string | `optional` | Dedicated sensor entity providing bearing/heading (e.g. `sensor.car_heading`) |
| `bearing_attribute` | string | `auto` | Attribute on entity for bearing (checks `bearing`, `heading`, `direction`, `course`, `angle`) |
| `bearing_offset` | number | `0` | Degrees offset to calibrate heading (e.g. `90`, `180`, `-90`) |
| `latitude_entity` | string | `optional` | Separate sensor entity for latitude if not on main entity |
| `longitude_entity` | string | `optional` | Separate sensor entity for longitude if not on main entity |
| `speed_entity` | string | `optional` | Separate sensor entity for speed (e.g. `sensor.car_speed`) |
| `speed_attribute` | string | `auto` | Attribute for speed (checks `speed`, `velocity`) |
| `speed_unit` | string | `auto` | Speed unit (`km/h`, `mph`, `m/s`, `knots`) |
| `battery_entity` | string | `optional` | Separate entity for vehicle battery percentage |
| `battery_attribute` | string | `auto` | Attribute for battery (`battery_level`, `battery`, etc.) |
| `vehicle_type` | string | `car` | Vehicle silhouette: `car`, `sports_car`, `suv`, `truck`, `arrow`, `pointer`, `custom` |
| `vehicle_image` | string | `optional` | URL to custom top-down vehicle image (used when `vehicle_type: custom`) |
| `vehicle_color` | string | `#1e88e5` | Vehicle theme color (hex, rgb, or css color) |
| `vehicle_size` | number | `46` | Size in pixels of the vehicle marker (24 to 80) |
| `show_bearing_cone`| boolean | `true` | Show forward directional beam (cone of sight) |
| `cone_color` | string | *vehicle_color* | Color of the forward beam |
| `show_accuracy` | boolean | `true` | Show GPS accuracy radius circle |
| `map_provider` | string | `auto` | `auto`, `carto_light`, `carto_dark`, `osm`, `satellite`, `opentopo`, `custom` |
| `tile_url` | string | `optional` | Custom tile URL template when `map_provider: custom` |
| `default_zoom` | number | `16` | Initial zoom level (3 to 19) |
| `card_height` | string | `380px` | Card height in CSS units or pixels |
| `follow_vehicle` | boolean | `true` | Automatically pan the map to keep vehicle in view |
| `recenter_button` | boolean | `true` | Show "Recenter" button when map has been panned away |
| `show_zones` | boolean | `true` | Render Home Assistant zones (home, work) with radius circles |
| `show_hud` | boolean | `true` | Show top and bottom HUD overlay panels |
| `show_speed` | boolean | `true` | Show vehicle speed in top HUD |
| `show_bearing` | boolean | `true` | Show compass chip with degrees and cardinal direction |
| `show_battery` | boolean | `true` | Show battery percentage in top HUD |
| `show_last_updated`| boolean | `true` | Show relative last updated time |

---

## 🧪 Development & Testing

```bash
# Clone the repository
git clone https://github.com/nicks-technik/map-bearing-card.git
cd map-bearing-card

# Install dependencies
npm install

# Run unit tests (Vitest)
npm test

# Run interactive browser playground
npm run dev

# Build production bundle for release
npm run build
```

Production output is compiled to [`dist/map-bearing-card.js`](dist/map-bearing-card.js).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
