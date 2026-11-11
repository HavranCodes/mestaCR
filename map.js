// Inicializace mapy - střed ČR
const mapa = L.map('mapa').setView([49.8175, 15.473], 7);

// Podkladová vrstva OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> přispěvatelé'
}).addTo(mapa);

// Ochrana proti vložení HTML z dat
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

// Popup pro každé město
function popupMesta(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(
    `<h3 class="popup-nazev">${escapeHtml(p.nazev)}</h3>` +
    `<p class="popup-popisek">${escapeHtml(p.popisek)}</p>` +
    `<div class="popup-id">ID: ${escapeHtml(String(p.id))}</div>`
  );
  layer.bindTooltip(escapeHtml(p.nazev));
}

// Načtení dat z GeoJSONu
fetch('body.geojson')
  .then((odpoved) => {
    if (!odpoved.ok) {
      throw new Error(`HTTP ${odpoved.status}`);
    }
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, { onEachFeature: popupMesta }).addTo(mapa);
    mapa.fitBounds(vrstva.getBounds().pad(0.3));
  })
  .catch((chyba) => {
    console.error('Nepodařilo se načíst body.geojson:', chyba);
    alert(
      'Data se nepodařilo načíst. Spusťte projekt přes lokální server ' +
      '(např. "python -m http.server"), ne přímým otevřením souboru.'
    );
  });
