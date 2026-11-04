# 🧭 Map Bearing Card for Home Assistant (XPENG & EV Edition)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/badge/release-v1.1.2-orange.svg)](https://github.com/nicks-technik/map-bearing-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=nicks-technik&repository=map-bearing-card&category=plugin)

A high-performance, customizable Lovelace map card for **Home Assistant** that displays your vehicle at its live GPS position and **rotates the vehicle in real-time to match its heading / bearing**.

Featuring dedicated first-class support for **XPENG vehicles** ([`xpengtoolkit`](https://github.com/xpengtoolkit/xpengtoolkit)) and modern Electric Vehicles (Tesla, BMW, Mercedes, Hyundai/Kia, etc.).

---

## ⚡ 1-Click HACS Installation Link

Click the badge below to automatically open your Home Assistant instance, pre-fill this repository, and install it via HACS:

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=nicks-technik&repository=map-bearing-card&category=plugin)

*(Or copy the custom repository link manually into HACS: `https://github.com/nicks-technik/map-bearing-card`)*

---

## ✨ Features

- 🧭 **Real-Time Bearing / Heading Rotation**:
  - Marker rotates in real-time matching `course`, `bearing`, `heading`, `direction`, or a dedicated heading sensor.
  - **Shortest-Arc Continuous Rotation**: Interpolates across the $0^\circ / 360^\circ$ North boundary smoothly without wild $360^\circ$ reverse spins.
  - **GPS Azimuth Fallback**: If an integration does not provide a bearing attribute, the card automatically computes the heading angle from GPS movement.
- 🏎️ **Authentic XPENG G6 Coupe-SUV Artwork**:
  - Signature full-width **Robot Face LED daytime light bar** across the front nose.
  - Distinctive aerodynamic fastback coupe-SUV body line with panoramic glass canopy.
  - Signature full-width **rear LED taillight strip**.
  - XPENG Factory Color Presets: **Fiery Orange** (G6 Hero Color), **Arctic White**, **Graphite Gray**, **Silver Frost**, **Midnight Obsidian**, **Nebula Green**, and **Starry Blue** (plus custom color picker).
- 🔄 **Heads-Up & North-Up Navigation Modes**:
  - **North-Up**: Standard map view; vehicle rotates while map faces North.
  - **Heads-Up**: Automotive driving view; map smoothly rotates with the vehicle so the driving direction is always facing straight UP!
  - 1-tap toggle button in the bottom HUD bar to switch modes on the fly.
- ⚡ **Full EV Telemetry HUD**:
  - Live speed (`km/h` or `mph`).
  - Battery SOC (`%`) with active pulsing green charging plug indicator when plugged in.
  - Remaining Range (`km` or `mi`).
  - Compass chip (`🧭 142° SE`).
- 🅿️ **Parked & Underground Fix Intelligence**:
  - Displays GPS fix freshness when parked (e.g. *"Parked · Fix 12m ago"* from XPENG `fix_age_s`).
  - Headlight beam automatically dims when parked and shines brightly when driving.
- 🎯 **GPS Accuracy Circle**:
  - Translucent dynamic radius ring matching `gps_accuracy` in meters.
- 🌓 **Home Assistant Theme-Aware Auto Dark/Light Map**:
  - Automatically switches between **CartoDB Positron** (light) and **CartoDB Dark Matter** (dark) to seamlessly match your Home Assistant dashboard theme.
  - Also supports OpenStreetMap, Esri Satellite Imagery, and OpenTopoMap.
- 📦 **100% Offline & Self-Contained**:
  - Bundled Leaflet 1.9.4 map engine with styles scoped inside Shadow DOM. Zero external CDN dependencies.

---

## 📸 Overview

```
+-----------------------------------------------------------+
|  [ XPENG G6 | Driving ]           [ 84 km/h | 🔋74% | 412km ] |  <- Top HUD
|                                                           |
|                       ▲ (Directional Beam)                |
|                      / \                                  |
|                 [XPENG G6] (Rotated to 142° SE)           |
|                ( . . . . . ) Accuracy Circle              |
|                                                           |
|                                                           |
|  [ 🧭 142° SE ] [ ⌖ Heads-Up ]              [ ⌖ Recenter ] |  <- Bottom HUD
+-----------------------------------------------------------+
```

---

## 🚀 Installation

### Option 1: HACS Link (Recommended)

1. Click the **[Open in Home Assistant](https://my.home-assistant.io/redirect/hacs_repository/?owner=nicks-technik&repository=map-bearing-card&category=plugin)** badge above.
2. In the popup dialog, click **Download**.
3. Reload your dashboard when prompted.

### Option 2: HACS Custom Repository via URL

1. In Home Assistant, open **HACS** &rarr; **Frontend / Dashboard**.
2. Click the three dots in the top right corner &rarr; **Custom repositories**.
3. Add:
   - **Repository**: `https://github.com/nicks-technik/map-bearing-card`
   - **Category**: `Dashboard` (or `Plugin`)
4. Click **Add**, find **Map Bearing Card**, and click **Download**.

### Option 3: Manual Installation

1. Download [`map-bearing-card.js`](dist/map-bearing-card.js) from the latest release.
2. Place it in your Home Assistant configuration directory at:
   ```
   <config>/www/map-bearing-card.js
   ```
3. In Home Assistant, go to **Settings** &rarr; **Dashboards** &rarr; **Three dots menu** &rarr; **Resources**.
4. Click **Add Resource**:
   - URL: `/local/map-bearing-card.js`
   - Resource type: `JavaScript Module`

---

## 🛠️ Configuration Examples

### 1. XPENG G6 / `xpengtoolkit` (Recommended)

```yaml
type: custom:map-bearing-card
entity: device_tracker.xpeng_g6_location
title: "XPENG G6"
vehicle_type: xpeng_g6
vehicle_color: "#ea580c"  # Fiery Orange hero color
battery_entity: sensor.xpeng_g6_battery_soc
range_entity: sensor.xpeng_g6_remaining_range
charging_entity: binary_sensor.xpeng_g6_charging
show_bearing_cone: true
show_accuracy: true
show_hud: true
show_range: true
show_charging: true
show_fix_age: true
heads_up_mode: false  # Can be toggled live on the card
card_height: 420px
default_zoom: 16
```

### 2. Tesla / TeslaMate Configuration

```yaml
type: custom:map-bearing-card
entity: device_tracker.tesla_model_y
bearing_entity: sensor.tesla_heading
speed_entity: sensor.tesla_speed
battery_entity: sensor.tesla_battery_level
vehicle_type: car
vehicle_color: "#1e88e5"
card_height: 400px
```

### 3. Sports Car with Satellite Imagery

```yaml
type: custom:map-bearing-card
entity: device_tracker.my_sports_car
vehicle_type: sports_car
vehicle_color: "#ef4444"
map_provider: satellite
card_height: 440px
```

---

## ⚙️ Configuration Options Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | **Required** | `custom:map-bearing-card` |
| `entity` | string | **Required** | Vehicle `device_tracker.*` or `sensor.*` entity |
| `title` | string | *Friendly Name* | Display title on the HUD |
| `vehicle_type` | string | `xpeng_g6` | `xpeng_g6`, `car`, `sports_car`, `suv`, `truck`, `arrow`, `pointer`, `custom` |
| `vehicle_color` | string | `#ea580c` | Vehicle color (hex code or XPENG preset) |
| `vehicle_size` | number | `48` | Size in pixels of the vehicle marker (28 to 80) |
| `heads_up_mode` | boolean | `false` | When true, map rotates so car points straight UP |
| `show_bearing_cone`| boolean | `true` | Show forward directional headlight beam |
| `show_accuracy` | boolean | `true` | Show GPS accuracy radius circle |
| `bearing_entity` | string | `optional` | Dedicated sensor for heading/bearing |
| `bearing_attribute` | string | `auto` | Attribute for bearing (`course`, `bearing`, `heading`, `direction`) |
| `bearing_offset` | number | `0` | Degrees calibration offset |
| `battery_entity` | string | `auto` | Battery sensor (auto-detects `sensor.*_battery_soc`) |
| `range_entity` | string | `auto` | Range sensor (auto-detects `sensor.*_remaining_range`) |
| `charging_entity` | string | `auto` | Charging entity (auto-detects `binary_sensor.*_charging`) |
| `map_provider` | string | `auto` | `auto`, `carto_dark`, `carto_light`, `osm`, `satellite`, `opentopo` |
| `card_height` | string | `400px` | CSS height of the card (e.g. `400px`, `500px`) |
| `default_zoom` | number | `16` | Initial zoom level (3 to 19) |
| `follow_vehicle` | boolean | `true` | Automatically center map on vehicle when moving |
| `recenter_button` | boolean | `true` | Show recenter button when panned away |
| `show_hud` | boolean | `true` | Show top and bottom HUD panels |
| `show_speed` | boolean | `true` | Show vehicle speed badge |
| `show_battery` | boolean | `true` | Show battery percentage badge |
| `show_range` | boolean | `true` | Show remaining range badge |
| `show_charging` | boolean | `true` | Show active charging indicator plug |
| `show_fix_age` | boolean | `true` | Show GPS fix freshness when parked |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## ?? Map Tile API Key (Carto)

If you use Carto tiles and your provider requires an API key (e.g. Carto requires authentication in some setups), you can add it in two ways:

### Via UI (Card Editor)
1. Edit the card ? Map & Navigation ? Tile API Key
2. Paste your API key from carto.com
3. Set Map Provider to CartoDB Light, CartoDB Dark, or Auto as desired

### Via YAML
`yaml
type: custom:map-bearing-card
entity: device_tracker.your_vehicle
map_provider: carto_light
tile_api_key: YOUR_CARTO_API_KEY
`
The card also accepts pi_key as an alternative key name.

> Note: OpenStreetMap tiles work without an API key. If you see "API KEY Required", switch to map_provider: osm or add your Carto key.
