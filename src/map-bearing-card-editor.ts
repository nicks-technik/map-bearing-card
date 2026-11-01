import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant, MapBearingCardConfig, VehicleType, MapProvider } from './types';
import { DEFAULT_CONFIG } from './const';

export class MapBearingCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: MapBearingCardConfig;

  public setConfig(config: MapBearingCardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
  }

  private _valueChanged(ev: CustomEvent | Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    if (!target) return;

    const key = target.dataset.configKey as keyof MapBearingCardConfig;
    if (!key) return;

    let value: any;
    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    } else if (target.type === 'number' || target.type === 'range') {
      value = target.value === '' ? undefined : Number(target.value);
    } else {
      value = target.value;
    }

    const newConfig: MapBearingCardConfig = {
      ...this._config,
      [key]: value,
    };

    if (value === undefined || value === '') {
      delete (newConfig as any)[key];
    }

    this._config = newConfig;

    const event = new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: newConfig },
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = Object.keys(this.hass.states).sort();
    const trackerEntities = entities.filter(
      (eid) => eid.startsWith('device_tracker.') || eid.startsWith('sensor.') || eid.startsWith('person.')
    );

    const vehicleTypes: { value: VehicleType; label: string }[] = [
      { value: 'car', label: 'Modern Sedan / EV' },
      { value: 'sports_car', label: 'Sports Car (GT)' },
      { value: 'suv', label: 'SUV / Crossover' },
      { value: 'truck', label: 'Truck / Van' },
      { value: 'arrow', label: 'Navigation Arrow / Chevron' },
      { value: 'pointer', label: 'Compass Pointer' },
      { value: 'custom', label: 'Custom Image URL' },
    ];

    const mapProviders: { value: MapProvider; label: string }[] = [
      { value: 'auto', label: 'Auto (Matches HA Dark/Light Theme)' },
      { value: 'carto_light', label: 'CartoDB Positron (Light)' },
      { value: 'carto_dark', label: 'CartoDB Dark Matter (Dark)' },
      { value: 'osm', label: 'OpenStreetMap Standard' },
      { value: 'satellite', label: 'Satellite (Esri Imagery)' },
      { value: 'opentopo', label: 'OpenTopoMap (Topographic)' },
      { value: 'custom', label: 'Custom Tile URL' },
    ];

    return html`
      <div class="card-config">
        <!-- Main Entity Selection -->
        <div class="config-section">
          <div class="section-title">Vehicle & Location</div>

          <div class="form-row">
            <label class="form-label" for="entity-select">Vehicle Entity (required)</label>
            <input
              id="entity-select"
              list="entities-list"
              class="form-input"
              data-config-key="entity"
              .value=${this._config.entity || ''}
              @change=${this._valueChanged}
              placeholder="e.g. device_tracker.tesla_model_y"
            />
            <datalist id="entities-list">
              ${trackerEntities.map((eid) => html`<option value=${eid}></option>`)}
            </datalist>
          </div>

          <div class="form-row">
            <label class="form-label" for="card-title">Card Title (optional)</label>
            <input
              id="card-title"
              class="form-input"
              data-config-key="title"
              .value=${this._config.title || ''}
              @change=${this._valueChanged}
              placeholder="Friendly vehicle name"
            />
          </div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="bearing-entity">Bearing Entity (optional)</label>
              <input
                id="bearing-entity"
                list="entities-list"
                class="form-input"
                data-config-key="bearing_entity"
                .value=${this._config.bearing_entity || ''}
                @change=${this._valueChanged}
                placeholder="sensor.car_heading"
              />
            </div>

            <div class="form-row">
              <label class="form-label" for="bearing-offset">Bearing Offset (°)</label>
              <input
                id="bearing-offset"
                type="number"
                class="form-input"
                data-config-key="bearing_offset"
                .value=${this._config.bearing_offset ?? 0}
                @change=${this._valueChanged}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <!-- Vehicle Appearance -->
        <div class="config-section">
          <div class="section-title">Vehicle Styling</div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="vehicle-type">Vehicle Model</label>
              <select
                id="vehicle-type"
                class="form-select"
                data-config-key="vehicle_type"
                .value=${this._config.vehicle_type || 'car'}
                @change=${this._valueChanged}
              >
                ${vehicleTypes.map(
                  (vt) => html`<option value=${vt.value} ?selected=${this._config?.vehicle_type === vt.value}>${vt.label}</option>`
                )}
              </select>
            </div>

            <div class="form-row">
              <label class="form-label" for="vehicle-color">Vehicle Color</label>
              <div class="color-picker-wrap">
                <input
                  id="vehicle-color"
                  type="color"
                  class="color-input"
                  data-config-key="vehicle_color"
                  .value=${this._config.vehicle_color || '#1e88e5'}
                  @input=${this._valueChanged}
                />
                <input
                  type="text"
                  class="form-input color-hex-text"
                  data-config-key="vehicle_color"
                  .value=${this._config.vehicle_color || '#1e88e5'}
                  @change=${this._valueChanged}
                />
              </div>
            </div>
          </div>

          ${this._config.vehicle_type === 'custom'
            ? html`
                <div class="form-row">
                  <label class="form-label" for="custom-img">Vehicle Image URL</label>
                  <input
                    id="custom-img"
                    class="form-input"
                    data-config-key="vehicle_image"
                    .value=${this._config.vehicle_image || ''}
                    @change=${this._valueChanged}
                    placeholder="/local/my_car_topdown.png"
                  />
                </div>
              `
            : ''}

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="vehicle-size">
                Vehicle Size: <strong>${this._config.vehicle_size || 46}px</strong>
              </label>
              <input
                id="vehicle-size"
                type="range"
                min="24"
                max="80"
                step="2"
                class="form-range"
                data-config-key="vehicle_size"
                .value=${this._config.vehicle_size || 46}
                @input=${this._valueChanged}
              />
            </div>

            <div class="form-row">
              <label class="form-label" for="card-height">Card Height</label>
              <input
                id="card-height"
                class="form-input"
                data-config-key="card_height"
                .value=${this._config.card_height || '380px'}
                @change=${this._valueChanged}
                placeholder="380px"
              />
            </div>
          </div>
        </div>

        <!-- Map Settings -->
        <div class="config-section">
          <div class="section-title">Map Settings</div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="map-provider">Map Tiles</label>
              <select
                id="map-provider"
                class="form-select"
                data-config-key="map_provider"
                .value=${this._config.map_provider || 'auto'}
                @change=${this._valueChanged}
              >
                ${mapProviders.map(
                  (mp) => html`<option value=${mp.value} ?selected=${this._config?.map_provider === mp.value}>${mp.label}</option>`
                )}
              </select>
            </div>

            <div class="form-row">
              <label class="form-label" for="zoom-slider">
                Default Zoom: <strong>${this._config.default_zoom || 16}</strong>
              </label>
              <input
                id="zoom-slider"
                type="range"
                min="3"
                max="19"
                class="form-range"
                data-config-key="default_zoom"
                .value=${this._config.default_zoom || 16}
                @input=${this._valueChanged}
              />
            </div>
          </div>
        </div>

        <!-- Toggles & Features -->
        <div class="config-section">
          <div class="section-title">Display Options</div>

          <div class="toggle-grid">
            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_bearing_cone"
                ?checked=${this._config.show_bearing_cone !== false}
                @change=${this._valueChanged}
              />
              <span>Directional Beam (Cone of Sight)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_accuracy"
                ?checked=${this._config.show_accuracy !== false}
                @change=${this._valueChanged}
              />
              <span>GPS Accuracy Circle</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="follow_vehicle"
                ?checked=${this._config.follow_vehicle !== false}
                @change=${this._valueChanged}
              />
              <span>Auto-Follow Vehicle</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="recenter_button"
                ?checked=${this._config.recenter_button !== false}
                @change=${this._valueChanged}
              />
              <span>Recenter Button</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_zones"
                ?checked=${this._config.show_zones !== false}
                @change=${this._valueChanged}
              />
              <span>Show Zones (Home, Work, etc.)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_hud"
                ?checked=${this._config.show_hud !== false}
                @change=${this._valueChanged}
              />
              <span>HUD Overlay (Speed, Compass, State)</span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
      color: var(--primary-text-color, #1e293b);
      font-family: inherit;
    }

    .config-section {
      background: var(--card-background-color, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      border-radius: 8px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-color, #1e88e5);
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      padding-bottom: 6px;
      margin-bottom: 4px;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 500px) {
      .form-grid-2 {
        grid-template-columns: 1fr;
      }
    }

    .form-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #64748b);
    }

    .form-input,
    .form-select {
      background: var(--input-idle-line-color, rgba(255, 255, 255, 0.08));
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 13px;
      color: var(--primary-text-color, inherit);
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus,
    .form-select:focus {
      border-color: var(--primary-color, #1e88e5);
    }

    .color-picker-wrap {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-input {
      width: 38px;
      height: 36px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: transparent;
      padding: 0;
    }

    .color-hex-text {
      flex: 1;
    }

    .form-range {
      accent-color: var(--primary-color, #1e88e5);
      cursor: pointer;
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .toggle-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-item input[type='checkbox'] {
      accent-color: var(--primary-color, #1e88e5);
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  `;
}
