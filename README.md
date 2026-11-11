# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa měst České republiky postavená na knihovně [Leaflet](https://leafletjs.com/). Data o městech jsou uložena v samostatném souboru GeoJSON.

## Struktura projektu

| Soubor         | Popis                                              |
|----------------|----------------------------------------------------|
| `index.html`   | Hlavní stránka, načítá Leaflet, styly a skript     |
| `map.js`       | Inicializace mapy, načtení GeoJSONu, popupy        |
| `styl.css`     | Vzhled stránky a popupů                            |
| `body.geojson` | Data měst (body) s atributy                        |
| `README.md`    | Tato dokumentace                                   |

## Spuštění

Mapa načítá `body.geojson` pomocí `fetch()`, proto ji nelze otevřít dvojklikem na `index.html` (prohlížeč blokuje načítání lokálních souborů). Je potřeba lokální HTTP server:

```bash
# Python
python -m http.server 8000

# nebo Node.js
npx serve
```

Poté otevřete <http://localhost:8000>.

## Formát dat (`body.geojson`)

Každé město je jeden `Feature` typu `Point`:

```json
{
  "type": "Feature",
  "properties": {
    "id": 1,
    "nazev": "Olomouc",
    "popisek": "Popis města..."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [17.2509, 49.5938]
  }
}
```

### Atributy

- `id` – jedinečný identifikátor města
- `nazev` – název města
- `popisek` – krátký popis zobrazený v popupu

> Pozor: GeoJSON používá pořadí souřadnic **[délka, šířka]** (longitude, latitude).

## Přidání nového města

1. Otevřete `body.geojson`.
2. Za poslední `Feature` přidejte čárku a nový objekt se stejnou strukturou.
3. Zvolte nové unikátní `id` a zadejte souřadnice `[lon, lat]`.
4. Obnovte stránku – mapa se automaticky přizpůsobí všem bodům.

## Použité technologie

- [Leaflet 1.9.4](https://leafletjs.com/)
- Podkladové dlaždice © [OpenStreetMap](https://www.openstreetmap.org/copyright) přispěvatelé
