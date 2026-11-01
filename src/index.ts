import { MapBearingCard } from './map-bearing-card';
import { MapBearingCardEditor } from './map-bearing-card-editor';
import { CARD_TAG, CARD_EDITOR_TAG, CARD_VERSION } from './const';

// Register custom elements
if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, MapBearingCard);
}

if (!customElements.get(CARD_EDITOR_TAG)) {
  customElements.define(CARD_EDITOR_TAG, MapBearingCardEditor);
}

// Register in Home Assistant Lovelace custom card registry
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: 'Map Bearing Card',
    description: 'Displays a live map with a vehicle rotated to its heading/bearing.',
    preview: true,
    documentationURL: 'https://github.com/nicks-technik/map-bearing-card',
  });
}

// Log console banner
console.info(
  `%c MAP-BEARING-CARD %c v${CARD_VERSION} `,
  'color: #ffffff; background: #1e88e5; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;',
  'color: #38bdf8; background: #0f172a; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;'
);

export { MapBearingCard, MapBearingCardEditor };
