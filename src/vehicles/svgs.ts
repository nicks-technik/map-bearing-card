import { VehicleType } from '../types';

/**
 * Returns directional cone beam SVG element markup.
 */
export function renderDirectionalBeam(color: string = '#38bdf8', opacity: number = 0.35): string {
  return `
    <svg class="bearing-cone" viewBox="0 0 200 200" style="position: absolute; top: -100px; left: -50px; width: 200px; height: 200px; pointer-events: none; z-index: 1;">
      <defs>
        <radialGradient id="beamGrad" cx="50%" cy="100%" r="90%" fx="50%" fy="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="${opacity * 1.5}" />
          <stop offset="40%" stop-color="${color}" stop-opacity="${opacity * 0.8}" />
          <stop offset="80%" stop-color="${color}" stop-opacity="${opacity * 0.2}" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Forward illumination fan: from bottom center (100, 190) pointing up to top fan -->
      <polygon points="100,165 40,0 160,0" fill="url(#beamGrad)" />
      <line x1="100" y1="165" x2="100" y2="20" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,3" opacity="${opacity * 1.2}" />
    </svg>
  `;
}

/**
 * Returns the SVG string for the requested vehicle type.
 * Default color is dynamic and center of rotation is (50, 50).
 */
export function getVehicleSvg(
  type: VehicleType = 'car',
  color: string = '#1e88e5',
  customImageUrl?: string
): string {
  if (type === 'custom' && customImageUrl) {
    return `
      <div class="vehicle-custom-img-wrap" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <img src="${customImageUrl}" alt="Vehicle" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.45));" />
      </div>
    `;
  }

  switch (type) {
    case 'sports_car':
      return renderSportsCar(color);
    case 'suv':
      return renderSuv(color);
    case 'truck':
      return renderTruck(color);
    case 'arrow':
      return renderArrow(color);
    case 'pointer':
      return renderPointer(color);
    case 'car':
    default:
      return renderSedan(color);
  }
}

function renderSedan(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
        </linearGradient>
      </defs>

      <g filter="url(#carShadow)">
        <!-- Wheels / Tires -->
        <rect x="26" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="26" y="65" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="65" width="7" height="15" rx="3" fill="#1e293b" />

        <!-- Side Mirrors -->
        <path d="M 27 34 Q 23 34 22 37 Q 24 40 28 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />
        <path d="M 73 34 Q 77 34 78 37 Q 76 40 72 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />

        <!-- Main Aerodynamic Body -->
        <path d="
          M 50 12
          C 42 12, 33 16, 31 24
          C 30 28, 29 42, 29 55
          C 29 68, 30 80, 33 86
          C 37 89, 44 90, 50 90
          C 56 90, 63 89, 67 86
          C 70 80, 71 68, 71 55
          C 71 42, 70 28, 69 24
          C 67 16, 58 12, 50 12 Z
        " fill="url(#bodyGrad)" stroke="#0f172a" stroke-width="1.2" />

        <!-- Front Windshield -->
        <path d="
          M 36 34
          Q 50 31 64 34
          L 62 44
          Q 50 42 38 44 Z
        " fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />

        <!-- Roof Panel -->
        <path d="
          M 38 45
          Q 50 44 62 45
          L 61 63
          Q 50 64 39 63 Z
        " fill="#1e293b" opacity="0.88" />

        <!-- Rear Glass -->
        <path d="
          M 39 65
          Q 50 64 61 65
          L 63 74
          Q 50 76 37 74 Z
        " fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />

        <!-- Headlights (Bright LED glow) -->
        <polygon points="34,16 41,14 40,19 33,20" fill="#fef08a" />
        <polygon points="66,16 59,14 60,19 67,20" fill="#fef08a" />

        <!-- Taillights (Red LED bar) -->
        <path d="M 35 87 Q 50 89 65 87" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </g>
    </svg>
  `;
}

function renderSportsCar(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sportsShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
        <linearGradient id="sportsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.8"/>
        </linearGradient>
      </defs>

      <g filter="url(#sportsShadow)">
        <!-- Wide Tires -->
        <rect x="22" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="69" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="21" y="64" width="10" height="18" rx="3" fill="#0f172a" />
        <rect x="69" y="64" width="10" height="18" rx="3" fill="#0f172a" />

        <!-- Aggressive Body / Wide Fenders -->
        <path d="
          M 50 10
          L 39 15 L 30 22 L 30 38 L 28 48 L 27 64 L 28 84 L 38 88 L 50 89
          L 62 88 L 72 84 L 73 64 L 72 48 L 70 38 L 70 22 L 61 15 Z
        " fill="url(#sportsGrad)" stroke="#090d16" stroke-width="1.2" />

        <!-- Hood Scoops / Vents -->
        <polygon points="46,24 50,22 54,24 53,28 47,28" fill="#090d16" opacity="0.75" />

        <!-- Windshield -->
        <path d="M 34 35 Q 50 30 66 35 L 63 46 Q 50 43 37 46 Z" fill="#0284c7" opacity="0.9" stroke="#090d16" stroke-width="0.8" />

        <!-- Tapered Cabin -->
        <path d="M 37 47 Q 50 44 63 47 L 61 65 Q 50 67 39 65 Z" fill="#0f172a" />

        <!-- Rear Glass -->
        <polygon points="40,66 60,66 58,74 42,74" fill="#0284c7" opacity="0.8" />

        <!-- Rear GT Wing / Spoiler -->
        <rect x="26" y="86" width="48" height="4" rx="2" fill="#090d16" />
        <rect x="36" y="83" width="3" height="6" fill="#475569" />
        <rect x="61" y="83" width="3" height="6" fill="#475569" />

        <!-- Aggressive Headlights -->
        <polygon points="34,17 40,14 38,20" fill="#38bdf8" />
        <polygon points="66,17 60,14 62,20" fill="#38bdf8" />

        <!-- Dual Exhaust & Taillights -->
        <rect x="33" y="89" width="4" height="2" fill="#94a3b8" />
        <rect x="63" y="89" width="4" height="2" fill="#94a3b8" />
        <path d="M 31 85 L 42 85" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
        <path d="M 58 85 L 69 85" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function renderSuv(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="suvShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="suvGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.9"/>
        </linearGradient>
      </defs>

      <g filter="url(#suvShadow)">
        <!-- Heavy Duty Tires -->
        <rect x="24" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="24" y="66" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="66" width="8" height="17" rx="3" fill="#1e293b" />

        <!-- Bold SUV Body -->
        <path d="
          M 50 11
          C 40 11, 31 14, 30 22
          C 29 27, 28 50, 28 65
          C 28 78, 30 87, 34 89
          C 38 91, 45 92, 50 92
          C 55 92, 62 91, 66 89
          C 70 87, 72 78, 72 65
          C 72 50, 71 27, 70 22
          C 69 14, 60 11, 50 11 Z
        " fill="url(#suvGrad)" stroke="#0f172a" stroke-width="1.3" />

        <!-- Windshield -->
        <path d="M 34 31 Q 50 28 66 31 L 64 42 Q 50 40 36 42 Z" fill="#0284c7" opacity="0.88" />

        <!-- Panoramic Sunroof & Roof Rails -->
        <rect x="36" y="44" width="28" height="26" rx="3" fill="#0f172a" opacity="0.9" />
        <!-- Roof rails (left and right silver bars) -->
        <line x1="33" y1="36" x2="33" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
        <line x1="67" y1="36" x2="67" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />

        <!-- Rear Glass -->
        <path d="M 35 73 Q 50 72 65 73 L 64 81 Q 50 83 36 81 Z" fill="#0284c7" opacity="0.88" />

        <!-- LED Headlights -->
        <rect x="32" y="14" width="8" height="5" rx="2" fill="#fef08a" />
        <rect x="60" y="14" width="8" height="5" rx="2" fill="#fef08a" />

        <!-- Taillights -->
        <path d="M 33 89 L 41 90" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
        <path d="M 59 90 L 67 89" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function renderTruck(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="truckShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="truckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="1"/>
        </linearGradient>
      </defs>

      <g filter="url(#truckShadow)">
        <!-- Heavy Dual Tires -->
        <rect x="23" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="70" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="21" y="65" width="9" height="18" rx="2" fill="#1e293b" />
        <rect x="70" y="65" width="9" height="18" rx="2" fill="#1e293b" />

        <!-- Truck Cab -->
        <path d="
          M 50 11
          C 40 11, 30 13, 29 20
          L 28 50 L 72 50 L 71 20
          C 70 13, 60 11, 50 11 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <!-- Truck Bed / Box -->
        <path d="
          M 28 52
          L 28 90
          C 30 92, 45 93, 50 93
          C 55 93, 70 92, 72 90
          L 72 52 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <!-- Inner Bed Liner -->
        <rect x="32" y="55" width="36" height="33" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1" />

        <!-- Cab Windshield -->
        <path d="M 33 26 Q 50 23 67 26 L 65 37 Q 50 35 35 37 Z" fill="#0284c7" opacity="0.9" />

        <!-- Cab Roof -->
        <rect x="36" y="38" width="28" height="10" rx="1" fill="#0f172a" opacity="0.6" />

        <!-- Amber Clearance Lights & Headlights -->
        <circle cx="43" cy="14" r="1" fill="#f59e0b" />
        <circle cx="50" cy="14" r="1" fill="#f59e0b" />
        <circle cx="57" cy="14" r="1" fill="#f59e0b" />
        <rect x="31" y="15" width="8" height="4" rx="1" fill="#fef08a" />
        <rect x="61" y="15" width="8" height="4" rx="1" fill="#fef08a" />

        <!-- Taillights -->
        <rect x="30" y="89" width="6" height="3" fill="#ef4444" />
        <rect x="64" y="89" width="6" height="3" fill="#ef4444" />
      </g>
    </svg>
  `;
}

function renderArrow(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="arrowShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="20%" stop-color="${color}"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.85"/>
        </linearGradient>
      </defs>

      <g filter="url(#arrowShadow)">
        <!-- Outer Halo -->
        <circle cx="50" cy="50" r="44" fill="${color}" opacity="0.15" />
        <circle cx="50" cy="50" r="38" fill="#ffffff" opacity="0.25" />

        <!-- Sleek Navigation Chevron -->
        <polygon points="50,10 82,82 50,66 18,82" fill="url(#arrowGrad)" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round" />
        <!-- Inner spine highlight -->
        <line x1="50" y1="14" x2="50" y2="64" stroke="#ffffff" stroke-width="2" opacity="0.8" />
      </g>
    </svg>
  `;
}

function renderPointer(color: string): string {
  return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pointerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <g filter="url(#pointerShadow)">
        <!-- Compass Ring -->
        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="${color}" stroke-width="3" />
        
        <!-- North Arrow (Red) -->
        <polygon points="50,14 62,50 50,44" fill="#ef4444" />
        <polygon points="50,14 38,50 50,44" fill="#dc2626" />

        <!-- South Arrow (Neutral/Color) -->
        <polygon points="50,86 62,50 50,44" fill="${color}" />
        <polygon points="50,86 38,50 50,44" fill="#64748b" />

        <!-- Center Hub -->
        <circle cx="50" cy="50" r="5" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      </g>
    </svg>
  `;
}
