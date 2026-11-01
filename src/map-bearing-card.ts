import { LitElement, html, css, PropertyValues, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import * as L from 'leaflet';
import leafletCss from 'leaflet/dist/leaflet.css?inline';

import {
  HomeAssistant,
  MapBearingCardConfig,
  VehicleState,
} from './types';
import { DEFAULT_CONFIG, TILE_LAYERS, TileLayerDef, CARD_TAG } from './const';
import { buildVehicleState, extractZones } from './utils/entity';
import { unwrapAngle, formatBearingDisplay } from './utils/bearing';
import { getVehicleSvg, renderDirectionalBeam } from './vehicles/svgs';

export class MapBearingCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: MapBearingCardConfig;
  @state() private _vehicleState: VehicleState | null = null;
  @state() private _isFollowing: boolean = true;
  @state() private _hasValidCoords: boolean = false;
  @state() private _currentThemeDark: boolean = false;
  @state() private _headsUpMode: boolean = false;

  private _map: L.Map | null = null;
  private _vehicleMarker: L.Marker | null = null;
  private _accuracyCircle: L.Circle | null = null;
  private _trailPolyline: L.Polyline | null = null;
  private _zoneLayers: L.LayerGroup = new L.LayerGroup();
  private _tileLayer: L.TileLayer | null = null;
  private _currentTileKey: string = '';

  private _lastRotatedAngle: number = 0;
  private _trailPoints: [number, number][] = [];
  private _previousPos: { lat: number; lon: number } | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _historyLoaded: boolean = false;

  static getStubConfig(hass: HomeAssistant): Partial<MapBearingCardConfig> {
    const xpengTracker = Object.keys(hass.states).find(
      (eid) => eid.includes('xpeng') && eid.startsWith('device_tracker.')
    );
    const anyTracker = Object.keys(hass.states).find(
      (eid) => eid.startsWith('device_tracker.') || eid.startsWith('sensor.')
    );

    return {
      type: `custom:${CARD_TAG}`,
      entity: xpengTracker || anyTracker || 'device_tracker.xpeng_g6_location',
      title: 'XPENG G6',
      vehicle_type: 'xpeng_g6',
      vehicle_color: '#ea580c',
      show_bearing_cone: true,
      show_accuracy: true,
      show_hud: true,
      show_range: true,
      show_charging: true,
      heads_up_mode: false,
      default_zoom: 16,
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./map-bearing-card-editor');
    return document.createElement('map-bearing-card-editor');
  }

  public setConfig(config: MapBearingCardConfig): void {
    if (!config.entity) {
      throw new Error('Please define an entity (e.g. device_tracker or sensor) in the card configuration.');
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
    this._headsUpMode = !!this._config.heads_up_mode;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this._map) {
      requestAnimationFrame(() => this._map?.invalidateSize());
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  }

  protected firstUpdated(): void {
    this._initMap();
    this._setupResizeObserver();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('hass') && this.hass && this._config) {
      this._updateVehicleFromHass();
      this._checkThemeChange();
      if (!this._historyLoaded && this._config.history_trail?.hours_to_show) {
        this._loadHistoryFromHA();
      }
    }

    if (changedProperties.has('_config') && this._config && this._map) {
      this._updateTileLayer();
    }
  }

  private _setupResizeObserver(): void {
    const container = this.shadowRoot?.querySelector('#map-container') as HTMLElement;
    if (container && window.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._map) {
          this._map.invalidateSize();
        }
      });
      this._resizeObserver.observe(container);
    }
  }

  private _isDarkMode(): boolean {
    if (this._config.dark_mode === true) return true;
    if (this._config.dark_mode === false) return false;
    if (this.hass?.themes?.darkMode !== undefined) {
      return !!this.hass.themes.darkMode;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private _checkThemeChange(): void {
    const isDark = this._isDarkMode();
    if (isDark !== this._currentThemeDark) {
      this._currentThemeDark = isDark;
      if (this._config.map_provider === 'auto' || !this._config.map_provider) {
        this._updateTileLayer();
      }
    }
  }

  private _initMap(): void {
    const mapEl = this.shadowRoot?.querySelector('#map') as HTMLElement;
    if (!mapEl || this._map) return;

    const initialZoom = this._config.default_zoom || 16;
    const minZoom = this._config.min_zoom || 3;
    const maxZoom = this._config.max_zoom || 19;

    this._map = L.map(mapEl, {
      zoomControl: false,
      attributionControl: false,
      minZoom,
      maxZoom,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this._map);
    L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(this._map);

    this._updateTileLayer();
    this._zoneLayers.addTo(this._map);

    this._map.on('dragstart', () => {
      this._isFollowing = false;
    });

    if (this._vehicleState && this._vehicleState.latitude !== null && this._vehicleState.longitude !== null) {
      this._map.setView(
        [this._vehicleState.latitude, this._vehicleState.longitude],
        initialZoom
      );
    } else {
      this._map.setView([51.505, -0.09], initialZoom);
    }

    requestAnimationFrame(() => {
      this._map?.invalidateSize();
      this._renderMapElements();
    });
  }

  private _updateTileLayer(): void {
    if (!this._map) return;

    let provider = this._config.map_provider || 'auto';
    let tileDef: TileLayerDef;

    if (provider === 'auto') {
      const dark = this._isDarkMode();
      tileDef = dark ? TILE_LAYERS.carto_dark : TILE_LAYERS.carto_light;
    } else if (provider === 'custom' && this._config.tile_url) {
      tileDef = {
        url: this._config.tile_url,
        attribution: this._config.tile_attribution || '',
      };
    } else {
      tileDef = TILE_LAYERS[provider] || TILE_LAYERS.carto_light;
    }

    const tileKey = `${provider}-${tileDef.url}`;
    if (this._tileLayer && this._currentTileKey === tileKey) {
      return;
    }

    if (this._tileLayer) {
      this._map.removeLayer(this._tileLayer);
    }

    this._tileLayer = L.tileLayer(tileDef.url, {
      attribution: tileDef.attribution,
      subdomains: tileDef.subdomains || ['abc'],
      maxZoom: tileDef.maxZoom || 19,
    }).addTo(this._map);

    this._currentTileKey = tileKey;
  }

  private _updateVehicleFromHass(): void {
    const newState = buildVehicleState(this.hass, this._config, this._previousPos);
    this._vehicleState = newState;

    const hasCoords = newState.latitude !== null && newState.longitude !== null;
    this._hasValidCoords = hasCoords;

    if (hasCoords) {
      this._previousPos = { lat: newState.latitude!, lon: newState.longitude! };

      if (this._config.history_trail?.enabled !== false) {
        const maxPoints = this._config.history_trail?.max_points || 120;
        const lastPoint = this._trailPoints[this._trailPoints.length - 1];
        if (!lastPoint || lastPoint[0] !== newState.latitude || lastPoint[1] !== newState.longitude) {
          this._trailPoints.push([newState.latitude!, newState.longitude!]);
          if (this._trailPoints.length > maxPoints) {
            this._trailPoints.shift();
          }
        }
      }

      this._renderMapElements();

      if (this._isFollowing && this._config.follow_vehicle !== false && this._map) {
        this._map.panTo([newState.latitude!, newState.longitude!], {
          animate: true,
          duration: 0.75,
        });
      }
    }
  }

  private async _loadHistoryFromHA(): Promise<void> {
    if (this._historyLoaded || !this.hass?.callApi || !this._config.entity) return;
    this._historyLoaded = true;

    try {
      const hours = this._config.history_trail?.hours_to_show || 2;
      const startTime = new Date(Date.now() - hours * 3600 * 1000).toISOString();
      const endpoint = `history/period/${startTime}?filter_entity_id=${this._config.entity}&minimal_response&significant_changes_only=0`;
      
      const historyData = await this.hass.callApi<any[]>('GET', endpoint);
      if (Array.isArray(historyData) && historyData.length > 0 && Array.isArray(historyData[0])) {
        const points: [number, number][] = [];
        for (const item of historyData[0]) {
          const lat = parseFloat(item.attributes?.latitude);
          const lon = parseFloat(item.attributes?.longitude);
          if (isFinite(lat) && isFinite(lon)) {
            points.push([lat, lon]);
          }
        }
        if (points.length > 0) {
          this._trailPoints = points;
          this._renderMapElements();
        }
      }
    } catch {
      // Gracefully continue with live breadcrumbs if history API not available
    }
  }

  private _renderMapElements(): void {
    if (!this._map || !this._vehicleState || !this._hasValidCoords) return;

    const { latitude, longitude, bearing, accuracy, isMoving } = this._vehicleState;
    if (latitude === null || longitude === null) return;

    const latLng = L.latLng(latitude, longitude);
    const vehicleColor = this._config.vehicle_color || '#ea580c';
    const vehicleSize = this._config.vehicle_size || 48;
    const showCone = this._config.show_bearing_cone !== false;

    // Smooth continuous angle
    const targetBearing = bearing ?? 0;
    const smoothAngle = unwrapAngle(targetBearing, this._lastRotatedAngle);
    this._lastRotatedAngle = smoothAngle;

    // If Heads-Up mode active, rotate the map so vehicle faces UP
    const mapRotator = this.shadowRoot?.querySelector('#map-rotator') as HTMLElement;
    if (mapRotator) {
      if (this._headsUpMode) {
        mapRotator.style.transform = `rotate(${-smoothAngle}deg)`;
      } else {
        mapRotator.style.transform = 'none';
      }
    }

    // Vehicle SVG markup
    const vehicleSvg = getVehicleSvg(
      this._config.vehicle_type,
      vehicleColor,
      this._config.vehicle_image,
      !isMoving
    );

    // Directional beam: dimmed when parked
    const coneHtml = showCone
      ? renderDirectionalBeam(this._config.cone_color || vehicleColor, 0.38, !isMoving)
      : '';

    // If Heads-Up mode is active, vehicle rotator stays 0 (pointing UP on screen)
    const markerRotation = this._headsUpMode ? 0 : smoothAngle;

    const iconHtml = `
      <div class="map-bearing-vehicle-wrapper" style="width: ${vehicleSize}px; height: ${vehicleSize}px;">
        <div class="vehicle-bearing-rotator" style="transform: rotate(${markerRotation}deg);">
          ${coneHtml}
          <div class="vehicle-icon-inner" style="width: 100%; height: 100%;">
            ${vehicleSvg}
          </div>
        </div>
      </div>
    `;

    const customDivIcon = L.divIcon({
      className: 'map-bearing-custom-div-icon',
      html: iconHtml,
      iconSize: [vehicleSize, vehicleSize],
      iconAnchor: [vehicleSize / 2, vehicleSize / 2],
    });

    if (!this._vehicleMarker) {
      this._vehicleMarker = L.marker(latLng, {
        icon: customDivIcon,
        zIndexOffset: 1000,
      }).addTo(this._map);

      this._vehicleMarker.on('click', () => this._handleEntityClick());
    } else {
      this._vehicleMarker.setLatLng(latLng);
      this._vehicleMarker.setIcon(customDivIcon);
    }

    // Render GPS Accuracy Circle
    if (this._config.show_accuracy !== false && accuracy !== null && accuracy > 0) {
      if (!this._accuracyCircle) {
        this._accuracyCircle = L.circle(latLng, {
          radius: accuracy,
          color: vehicleColor,
          weight: 1.5,
          opacity: 0.6,
          fillColor: vehicleColor,
          fillOpacity: 0.1,
          dashArray: '4, 4',
        }).addTo(this._map);
      } else {
        this._accuracyCircle.setLatLng(latLng);
        this._accuracyCircle.setRadius(accuracy);
        this._accuracyCircle.setStyle({ color: vehicleColor, fillColor: vehicleColor });
      }
    } else if (this._accuracyCircle) {
      this._map.removeLayer(this._accuracyCircle);
      this._accuracyCircle = null;
    }

    // Render History Trail
    if (this._config.history_trail?.enabled !== false && this._trailPoints.length > 1) {
      const trailColor = this._config.history_trail?.trail_color || vehicleColor;
      const trailWidth = this._config.history_trail?.trail_width || 3;
      if (!this._trailPolyline) {
        this._trailPolyline = L.polyline(this._trailPoints, {
          color: trailColor,
          weight: trailWidth,
          opacity: 0.75,
          dashArray: '6, 6',
        }).addTo(this._map);
      } else {
        this._trailPolyline.setLatLngs(this._trailPoints);
        this._trailPolyline.setStyle({ color: trailColor, weight: trailWidth });
      }
    }

    // Render Zones
    if (this._config.show_zones !== false) {
      this._renderZones();
    }
  }

  private _renderZones(): void {
    if (!this._map || !this.hass) return;
    this._zoneLayers.clearLayers();

    const zones = extractZones(this.hass);
    for (const z of zones) {
      if (z.passive) continue;
      const circle = L.circle([z.latitude, z.longitude], {
        radius: z.radius,
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '3, 4',
      });
      circle.bindTooltip(z.name, {
        permanent: false,
        direction: 'top',
        className: 'zone-tooltip',
      });
      this._zoneLayers.addLayer(circle);
    }
  }

  private _handleRecenter(): void {
    this._isFollowing = true;
    if (this._map && this._vehicleState && this._vehicleState.latitude !== null && this._vehicleState.longitude !== null) {
      const zoom = this._config.default_zoom || 16;
      this._map.setView(
        [this._vehicleState.latitude, this._vehicleState.longitude],
        zoom,
        { animate: true, duration: 0.6 }
      );
    }
  }

  private _toggleHeadsUpMode(): void {
    this._headsUpMode = !this._headsUpMode;
    this._renderMapElements();
  }

  private _handleEntityClick(): void {
    const entityId = this._config.entity;
    if (!entityId) return;

    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this._config) {
      return html`<ha-card><div class="card-warning">Card not configured</div></ha-card>`;
    }

    const height = typeof this._config.card_height === 'number'
      ? `${this._config.card_height}px`
      : this._config.card_height || '400px';

    const vs = this._vehicleState;
    const showHud = this._config.show_hud !== false;
    const hasBearing = vs?.bearing !== null && vs?.bearing !== undefined;
    const hasSpeed = vs?.speed !== null;
    const hasBattery = vs?.battery !== null;
    const hasRange = vs?.range !== null;

    return html`
      <ha-card class="map-bearing-card">
        <div id="map-container" style="height: ${height};">
          <!-- Inner wrapper that rotates when Heads-Up mode is active -->
          <div id="map-rotator" class="${this._headsUpMode ? 'heads-up-active' : ''}">
            <div id="map"></div>
          </div>

          ${!this._hasValidCoords
            ? html`
                <div class="no-gps-overlay">
                  <div class="no-gps-box">
                    <svg class="no-gps-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div class="no-gps-title">Waiting for GPS location</div>
                    <div class="no-gps-subtitle">${this._config.entity}</div>
                  </div>
                </div>
              `
            : ''}

          ${showHud && vs
            ? html`
                <!-- Top HUD Bar: Name, Status, EV Metrics (Speed, Battery, Range, Charging) -->
                <div class="hud-top-bar" @click=${this._handleEntityClick}>
                  <div class="hud-title-wrap">
                    <span class="hud-entity-name">${vs.name}</span>
                    <span class="hud-state-badge ${vs.isMoving ? 'moving' : 'parked'}">
                      ${vs.stateText}
                    </span>
                  </div>

                  <div class="hud-metrics-wrap">
                    ${this._config.show_speed !== false && hasSpeed
                      ? html`
                          <div class="hud-badge speed-badge">
                            <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 6v6l4 2"/>
                            </svg>
                            <span>${vs.speed}</span>
                          </div>
                        `
                      : ''}

                    ${this._config.show_battery !== false && hasBattery
                      ? html`
                          <div class="hud-badge battery-badge ${vs.isCharging ? 'charging' : ''}">
                            ${vs.isCharging
                              ? html`
                                  <svg class="hud-icon charge-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                                  </svg>
                                `
                              : html`
                                  <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"/>
                                    <line x1="22" y1="11" x2="22" y2="13"/>
                                  </svg>
                                `}
                            <span>${vs.battery}%</span>
                          </div>
                        `
                      : ''}

                    ${this._config.show_range !== false && hasRange
                      ? html`
                          <div class="hud-badge range-badge">
                            <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            <span>${vs.range}</span>
                          </div>
                        `
                      : ''}
                  </div>
                </div>

                <!-- Bottom HUD Bar: Compass, Heads-Up Toggle, Recenter -->
                <div class="hud-bottom-bar">
                  <div class="hud-left-controls">
                    ${this._config.show_bearing !== false && hasBearing
                      ? html`
                          <div class="hud-compass-chip">
                            <svg
                              class="compass-needle-icon"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              style="transform: rotate(${vs.bearing}deg);"
                            >
                              <polygon points="12,2 17,21 12,17 7,21" fill="#ef4444" />
                            </svg>
                            <span class="compass-text">${formatBearingDisplay(vs.bearing)}</span>
                          </div>
                        `
                      : ''}

                    <button
                      class="nav-mode-btn ${this._headsUpMode ? 'active' : ''}"
                      @click=${this._toggleHeadsUpMode}
                      title="Toggle Heads-Up (rotating map) or North-Up mode"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="12,6 16,14 12,12 8,14" fill="currentColor" />
                      </svg>
                      <span>${this._headsUpMode ? 'Heads-Up' : 'North-Up'}</span>
                    </button>
                  </div>

                  <div class="hud-controls">
                    ${this._config.recenter_button !== false && !this._isFollowing
                      ? html`
                          <button
                            class="recenter-btn"
                            @click=${this._handleRecenter}
                            title="Re-center on vehicle"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="9"/>
                              <circle cx="12" cy="12" r="3"/>
                              <line x1="12" y1="1" x2="12" y2="5"/>
                              <line x1="12" y1="19" x2="12" y2="23"/>
                              <line x1="1" y1="12" x2="5" y2="12"/>
                              <line x1="19" y1="12" x2="23" y2="12"/>
                            </svg>
                            <span>Recenter</span>
                          </button>
                        `
                      : ''}

                    ${this._config.show_last_updated !== false && vs.lastUpdated
                      ? html`
                          <div class="last-updated-chip">
                            ${vs.lastUpdated}
                          </div>
                        `
                      : ''}
                  </div>
                </div>
              `
            : ''}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    unsafeCSS(leafletCss),
    css`
      :host {
        display: block;
        --card-radius: var(--ha-card-border-radius, 16px);
        --primary-color: var(--primary-color, #ea580c);
      }

      ha-card {
        overflow: hidden;
        position: relative;
        border-radius: var(--card-radius);
      }

      #map-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        background-color: var(--primary-background-color, #0f172a);
      }

      #map-rotator {
        position: absolute;
        inset: -50%;
        width: 200%;
        height: 200%;
        transform-origin: center center;
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
      }

      #map-rotator.heads-up-active {
        will-change: transform;
      }

      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }

      /* Vehicle Marker Styles */
      .map-bearing-custom-div-icon {
        background: transparent !important;
        border: none !important;
        overflow: visible !important;
      }

      .map-bearing-vehicle-wrapper {
        position: relative;
        overflow: visible;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .vehicle-bearing-rotator {
        width: 100%;
        height: 100%;
        transform-origin: center center;
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .vehicle-icon-inner {
        position: relative;
        z-index: 2;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* No GPS overlay */
      .no-gps-overlay {
        position: absolute;
        inset: 0;
        z-index: 500;
        background: rgba(15, 23, 42, 0.78);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .no-gps-box {
        text-align: center;
        color: #f8fafc;
        padding: 24px 32px;
        background: rgba(30, 41, 59, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      }

      .no-gps-icon {
        stroke: #f59e0b;
        margin-bottom: 8px;
      }

      .no-gps-title {
        font-weight: 600;
        font-size: 16px;
      }

      .no-gps-subtitle {
        font-size: 13px;
        color: #94a3b8;
        margin-top: 4px;
        font-family: monospace;
      }

      /* Top HUD Bar */
      .hud-top-bar {
        position: absolute;
        top: 12px;
        left: 12px;
        right: 12px;
        z-index: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        flex-wrap: wrap;
        gap: 8px;
      }

      .hud-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 6px 14px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        pointer-events: auto;
        cursor: pointer;
        transition: transform 0.15s ease, background-color 0.15s ease;
      }

      .hud-title-wrap:hover {
        background: rgba(15, 23, 42, 0.95);
        transform: translateY(-1px);
      }

      .hud-entity-name {
        font-weight: 700;
        font-size: 13px;
        color: #ffffff;
        letter-spacing: -0.2px;
      }

      .hud-state-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
        background: rgba(148, 163, 184, 0.2);
        color: #e2e8f0;
      }

      .hud-state-badge.moving {
        background: rgba(34, 197, 94, 0.28);
        color: #4ade80;
      }

      .hud-state-badge.parked {
        background: rgba(148, 163, 184, 0.18);
        color: #cbd5e1;
      }

      .hud-metrics-wrap {
        display: flex;
        gap: 6px;
        pointer-events: auto;
      }

      .hud-badge {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 11px;
        border-radius: 18px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #f8fafc;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      }

      .speed-badge svg {
        stroke: #38bdf8;
      }

      .battery-badge svg {
        stroke: #4ade80;
      }

      .battery-badge.charging {
        border-color: #22c55e;
        color: #4ade80;
      }

      .charge-icon {
        color: #22c55e;
        animation: pulse 1.8s infinite ease-in-out;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.9); }
      }

      .range-badge svg {
        stroke: #f59e0b;
      }

      /* Bottom HUD Bar */
      .hud-bottom-bar {
        position: absolute;
        bottom: 12px;
        left: 12px;
        right: 12px;
        z-index: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
      }

      .hud-left-controls {
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: auto;
      }

      .hud-compass-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 5px 11px;
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        font-size: 12px;
        font-weight: 600;
      }

      .compass-needle-icon {
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
      }

      .nav-mode-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        color: #cbd5e1;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .nav-mode-btn.active {
        background: #0284c7;
        color: #ffffff;
        border-color: #38bdf8;
      }

      .hud-controls {
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: auto;
      }

      .recenter-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 18px;
        background: var(--primary-color, #ea580c);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: filter 0.15s ease, transform 0.15s ease;
      }

      .recenter-btn:hover {
        filter: brightness(1.15);
        transform: translateY(-1px);
      }

      .last-updated-chip {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(6px);
        color: #94a3b8;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      /* Custom Leaflet Controls */
      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35) !important;
        border-radius: 8px !important;
        overflow: hidden;
        margin-right: 12px !important;
        margin-bottom: 48px !important;
      }

      .leaflet-control-zoom a {
        background-color: rgba(15, 23, 42, 0.88) !important;
        color: #f8fafc !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(8px);
      }

      .leaflet-control-zoom a:hover {
        background-color: rgba(30, 41, 59, 0.95) !important;
      }

      .leaflet-control-attribution {
        background: rgba(15, 23, 42, 0.65) !important;
        color: #94a3b8 !important;
        font-size: 9px !important;
        padding: 2px 6px !important;
        border-radius: 4px;
        margin-left: 12px !important;
        margin-bottom: 4px !important;
      }

      .leaflet-control-attribution a {
        color: #cbd5e1 !important;
        text-decoration: none;
      }

      /* Zone Tooltip */
      .zone-tooltip {
        background: rgba(15, 23, 42, 0.88) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        color: #f8fafc !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        padding: 3px 6px !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
      }
      .zone-tooltip::before {
        border-top-color: rgba(15, 23, 42, 0.88) !important;
      }
    `,
  ];
}
