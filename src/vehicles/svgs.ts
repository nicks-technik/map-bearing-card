import { VehicleType } from '../types';

/**
 * Returns directional cone beam SVG element markup.
 * Dims opacity if the vehicle is parked.
 */
export function renderDirectionalBeam(
  color: string = '#38bdf8',
  baseOpacity: number = 0.35,
  isParked: boolean = false
): string {
  const effectiveOpacity = isParked ? baseOpacity * 0.3 : baseOpacity;
  const dash = isParked ? '2,4' : '3,3';

  return `
    <svg class="bearing-cone ${isParked ? 'cone-parked' : 'cone-active'}" viewBox="0 0 200 200" style="position: absolute; top: -100px; left: -50px; width: 200px; height: 200px; pointer-events: none; z-index: 1;">
      <defs>
        <radialGradient id="beamGrad" cx="50%" cy="100%" r="90%" fx="50%" fy="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="${effectiveOpacity * 1.5}" />
          <stop offset="40%" stop-color="${color}" stop-opacity="${effectiveOpacity * 0.8}" />
          <stop offset="80%" stop-color="${color}" stop-opacity="${effectiveOpacity * 0.2}" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Forward illumination fan: from bottom center (100, 165) pointing up to top fan -->
      <polygon points="100,165 40,0 160,0" fill="url(#beamGrad)" />
      <line x1="100" y1="165" x2="100" y2="20" stroke="${color}" stroke-width="1.5" stroke-dasharray="${dash}" opacity="${effectiveOpacity * 1.2}" />
    </svg>
  `;
}

/**
 * Returns the SVG string for the requested vehicle type.
 */
export function getVehicleSvg(
  type: VehicleType = 'xpeng_g6',
  color: string = '#ea580c',
  customImageUrl?: string,
  isParked: boolean = false
): string {
  if (type === 'custom' && customImageUrl) {
    return `
      <div class="vehicle-custom-img-wrap" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <img src="${customImageUrl}" alt="Vehicle" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.45));" />
      </div>
    `;
  }

  switch (type) {
    case 'xpeng_g6':
      return renderXpengG6(color, isParked);
    case 'sports_car':
      return renderSportsCar(color, isParked);
    case 'suv':
      return renderSuv(color, isParked);
    case 'truck':
      return renderTruck(color, isParked);
    case 'arrow':
      return renderArrow(color);
    case 'pointer':
      return renderPointer(color);
    case 'car':
    default:
      return renderSedan(color, isParked);
  }
}

/**
 * Authentic XPENG G6 Coupe-SUV Silhouette
 * Features:
 * - Signature XPENG "Robot Face" continuous LED light bar across front nose
 * - Split headlights on front corners
 * - Aerodynamic coupe-SUV fastback roofline
 * - Expansive tinted panoramic glass canopy
 * - Sporty rear fastback ducktail spoiler
 * - Full-width rear LED taillight strip
 * - Aero turbine EV wheels
 */
function renderXpengG6(color: string, isParked: boolean): string {
  const lightColor = isParked ? '#94a3b8' : '#fef08a';
  const lightBarColor = isParked ? 'rgba(255,255,255,0.4)' : '#ffffff';
  const tailColor = isParked ? '#991b1b' : '#ef4444';

  return `
    <svg class="vehicle-svg xpeng-g6-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="xpengG6Shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
        <linearGradient id="g6BodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.88"/>
          <stop offset="45%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="55%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.88"/>
        </linearGradient>
        <linearGradient id="panoramicGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
          <stop offset="35%" stop-color="#0f172a" stop-opacity="0.92"/>
          <stop offset="85%" stop-color="#0f172a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.9"/>
        </linearGradient>
      </defs>

      <g filter="url(#xpengG6Shadow)">
        <!-- Aero Turbine Wheels (20" G6 Wheels) -->
        <rect x="25" y="23" width="7" height="17" rx="3" fill="#0f172a" />
        <rect x="68" y="23" width="7" height="17" rx="3" fill="#0f172a" />
        <rect x="24" y="66" width="8" height="18" rx="3" fill="#0f172a" />
        <rect x="68" y="66" width="8" height="18" rx="3" fill="#0f172a" />
        <!-- Wheel silver aero inserts -->
        <rect x="27" y="27" width="3" height="9" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="70" y="27" width="3" height="9" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="26" y="70" width="4" height="10" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="70" y="70" width="4" height="10" rx="1" fill="#94a3b8" opacity="0.6" />

        <!-- Aerodynamic Side Mirrors -->
        <path d="M 27 34 Q 22 34 21 37 Q 23 40 28 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />
        <path d="M 73 34 Q 78 34 79 37 Q 77 40 72 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />

        <!-- XPENG G6 Coupe-SUV Body Shell -->
        <path d="
          M 50 11
          C 42 11, 33 13, 30 20
          C 28 25, 27 40, 27 54
          C 27 66, 28 78, 30 84
          C 32 88, 40 91, 50 91
          C 60 91, 68 88, 70 84
          C 72 78, 73 66, 73 54
          C 73 40, 72 25, 70 20
          C 67 13, 58 11, 50 11 Z
        " fill="url(#g6BodyGrad)" stroke="#090d16" stroke-width="1.3" />

        <!-- XPENG Robot Face: Signature Full-Width Front Light Bar -->
        <path d="M 33 16 Q 48 13.5 50 13.5 Q 52 13.5 67 16"
              stroke="${lightBarColor}" stroke-width="2.2" stroke-linecap="round" fill="none"
              style="filter: drop-shadow(0 0 2px ${lightBarColor});" />

        <!-- Split Headlights (XPENG lower cluster) -->
        <polygon points="32,20 38,19 36,25 31,24" fill="${lightColor}" />
        <polygon points="68,20 62,19 64,25 69,24" fill="${lightColor}" />

        <!-- Front Hood Crease Lines -->
        <path d="M 39 19 Q 41 28 43 32" stroke="#090d16" stroke-width="0.8" opacity="0.4" fill="none" />
        <path d="M 61 19 Q 59 28 57 32" stroke="#090d16" stroke-width="0.8" opacity="0.4" fill="none" />

        <!-- G6 Panoramic Glass Canopy (Seamless Windshield + Glass Roof) -->
        <path d="
          M 36 33
          Q 50 29 64 33
          L 62 45
          L 60 67
          Q 50 68 40 67
          L 38 45 Z
        " fill="url(#panoramicGlass)" stroke="#090d16" stroke-width="1" />

        <!-- Glass Canopy Reflection Sheen -->
        <path d="M 39 36 Q 50 33 61 36 L 59 44 Q 50 42 41 44 Z" fill="#ffffff" opacity="0.22" />

        <!-- G6 Fastback Rear Window -->
        <path d="
          M 40 68
          Q 50 69 60 68
          L 62 78
          Q 50 81 38 78 Z
        " fill="url(#panoramicGlass)" stroke="#090d16" stroke-width="0.8" />

        <!-- XPENG G6 Rear Ducktail Spoiler Lip -->
        <path d="M 35 81 Q 50 84 65 81" stroke="#090d16" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- XPENG Signature Full-Width Rear LED Taillight Strip -->
        <path d="M 34 87 Q 50 90 66 87"
              stroke="${tailColor}" stroke-width="2.5" stroke-linecap="round" fill="none"
              style="filter: drop-shadow(0 0 2px ${tailColor});" />
      </g>
    </svg>
  `;
}

function renderSedan(color: string, isParked: boolean): string {
  const lightColor = isParked ? '#94a3b8' : '#fef08a';
  const tailColor = isParked ? '#991b1b' : '#ef4444';

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
        <rect x="26" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="26" y="65" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="65" width="7" height="15" rx="3" fill="#1e293b" />

        <path d="M 27 34 Q 23 34 22 37 Q 24 40 28 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />
        <path d="M 73 34 Q 77 34 78 37 Q 76 40 72 39 Z" fill="${color}" stroke="#0f172a" stroke-width="0.8" />

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

        <path d="M 36 34 Q 50 31 64 34 L 62 44 Q 50 42 38 44 Z" fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />
        <path d="M 38 45 Q 50 44 62 45 L 61 63 Q 50 64 39 63 Z" fill="#1e293b" opacity="0.88" />
        <path d="M 39 65 Q 50 64 61 65 L 63 74 Q 50 76 37 74 Z" fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />

        <polygon points="34,16 41,14 40,19 33,20" fill="${lightColor}" />
        <polygon points="66,16 59,14 60,19 67,20" fill="${lightColor}" />

        <path d="M 35 87 Q 50 89 65 87" stroke="${tailColor}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </g>
    </svg>
  `;
}

function renderSportsCar(color: string, isParked: boolean): string {
  const lightColor = isParked ? '#94a3b8' : '#38bdf8';
  const tailColor = isParked ? '#991b1b' : '#ef4444';

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
        <rect x="22" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="69" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="21" y="64" width="10" height="18" rx="3" fill="#0f172a" />
        <rect x="69" y="64" width="10" height="18" rx="3" fill="#0f172a" />

        <path d="
          M 50 10
          L 39 15 L 30 22 L 30 38 L 28 48 L 27 64 L 28 84 L 38 88 L 50 89
          L 62 88 L 72 84 L 73 64 L 72 48 L 70 38 L 70 22 L 61 15 Z
        " fill="url(#sportsGrad)" stroke="#090d16" stroke-width="1.2" />

        <polygon points="46,24 50,22 54,24 53,28 47,28" fill="#090d16" opacity="0.75" />
        <path d="M 34 35 Q 50 30 66 35 L 63 46 Q 50 43 37 46 Z" fill="#0284c7" opacity="0.9" stroke="#090d16" stroke-width="0.8" />
        <path d="M 37 47 Q 50 44 63 47 L 61 65 Q 50 67 39 65 Z" fill="#0f172a" />
        <polygon points="40,66 60,66 58,74 42,74" fill="#0284c7" opacity="0.8" />

        <rect x="26" y="86" width="48" height="4" rx="2" fill="#090d16" />
        <rect x="36" y="83" width="3" height="6" fill="#475569" />
        <rect x="61" y="83" width="3" height="6" fill="#475569" />

        <polygon points="34,17 40,14 38,20" fill="${lightColor}" />
        <polygon points="66,17 60,14 62,20" fill="${lightColor}" />

        <rect x="33" y="89" width="4" height="2" fill="#94a3b8" />
        <rect x="63" y="89" width="4" height="2" fill="#94a3b8" />
        <path d="M 31 85 L 42 85" stroke="${tailColor}" stroke-width="2" stroke-linecap="round" />
        <path d="M 58 85 L 69 85" stroke="${tailColor}" stroke-width="2" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function renderSuv(color: string, isParked: boolean): string {
  const lightColor = isParked ? '#94a3b8' : '#fef08a';
  const tailColor = isParked ? '#991b1b' : '#ef4444';

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
        <rect x="24" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="24" y="66" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="66" width="8" height="17" rx="3" fill="#1e293b" />

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

        <path d="M 34 31 Q 50 28 66 31 L 64 42 Q 50 40 36 42 Z" fill="#0284c7" opacity="0.88" />
        <rect x="36" y="44" width="28" height="26" rx="3" fill="#0f172a" opacity="0.9" />
        <line x1="33" y1="36" x2="33" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
        <line x1="67" y1="36" x2="67" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
        <path d="M 35 73 Q 50 72 65 73 L 64 81 Q 50 83 36 81 Z" fill="#0284c7" opacity="0.88" />

        <rect x="32" y="14" width="8" height="5" rx="2" fill="${lightColor}" />
        <rect x="60" y="14" width="8" height="5" rx="2" fill="${lightColor}" />

        <path d="M 33 89 L 41 90" stroke="${tailColor}" stroke-width="3" stroke-linecap="round" />
        <path d="M 59 90 L 67 89" stroke="${tailColor}" stroke-width="3" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function renderTruck(color: string, isParked: boolean): string {
  const lightColor = isParked ? '#94a3b8' : '#fef08a';
  const tailColor = isParked ? '#991b1b' : '#ef4444';

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
        <rect x="23" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="70" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="21" y="65" width="9" height="18" rx="2" fill="#1e293b" />
        <rect x="70" y="65" width="9" height="18" rx="2" fill="#1e293b" />

        <path d="
          M 50 11
          C 40 11, 30 13, 29 20
          L 28 50 L 72 50 L 71 20
          C 70 13, 60 11, 50 11 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <path d="
          M 28 52
          L 28 90
          C 30 92, 45 93, 50 93
          C 55 93, 70 92, 72 90
          L 72 52 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <rect x="32" y="55" width="36" height="33" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1" />
        <path d="M 33 26 Q 50 23 67 26 L 65 37 Q 50 35 35 37 Z" fill="#0284c7" opacity="0.9" />
        <rect x="36" y="38" width="28" height="10" rx="1" fill="#0f172a" opacity="0.6" />

        <circle cx="43" cy="14" r="1" fill="#f59e0b" />
        <circle cx="50" cy="14" r="1" fill="#f59e0b" />
        <circle cx="57" cy="14" r="1" fill="#f59e0b" />
        <rect x="31" y="15" width="8" height="4" rx="1" fill="${lightColor}" />
        <rect x="61" y="15" width="8" height="4" rx="1" fill="${lightColor}" />

        <rect x="30" y="89" width="6" height="3" fill="${tailColor}" />
        <rect x="64" y="89" width="6" height="3" fill="${tailColor}" />
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
        <circle cx="50" cy="50" r="44" fill="${color}" opacity="0.15" />
        <circle cx="50" cy="50" r="38" fill="#ffffff" opacity="0.25" />
        <polygon points="50,10 82,82 50,66 18,82" fill="url(#arrowGrad)" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round" />
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
        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="${color}" stroke-width="3" />
        <polygon points="50,14 62,50 50,44" fill="#ef4444" />
        <polygon points="50,14 38,50 50,44" fill="#dc2626" />
        <polygon points="50,86 62,50 50,44" fill="${color}" />
        <polygon points="50,86 38,50 50,44" fill="#64748b" />
        <circle cx="50" cy="50" r="5" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      </g>
    </svg>
  `;
}
