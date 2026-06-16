// QA tool: stack 3 sources for the same layer on one map for visual diff.
//   - WMS raster (live GeoServer GetMap, the production look today)
//   - WFS vector (live GeoServer GetFeature → GeoJSON, raw features, no dissolve)
//   - PMTiles vector (locally-built dissolved tiles from `npm run build:pmtiles`)
// Per-source visibility + opacity. Local dev only. Served by `npm run qa`.

import maplibregl from 'https://esm.sh/maplibre-gl@5.5.0';
import * as pmtiles from 'https://esm.sh/pmtiles@4.3.0';

maplibregl.addProtocol('pmtiles', new pmtiles.Protocol().tile);

const GEOSERVER = 'https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver';
const MANIFEST_URL = '/dist-json/index.json';
const STYLE_URL = (path) => `/dist-json/${path}?t=${Date.now()}`;
const PMTILES_URL = (slug) => `/dist-pmtiles/${slug}.pmtiles?t=${Date.now()}`;

const $ = (id) => document.getElementById(id);
const setStatus = (s) => { $('status').textContent = s; };

const layerWorkspaceCache = new Map();
const fetchWorkspaceMap = async () => {
    const j = await fetch('/scripts/layers.json').then((r) => r.json());
    for (const slug of j.layers) {
        const [ws, name] = slug.split(':');
        layerWorkspaceCache.set(name, ws);
    }
};

const map = (window.__qaMap = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'raster',
                tiles: [
                    'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors © CARTO',
            },
        },
        layers: [{ id: 'basemap', type: 'raster', source: 'basemap' }],
    },
    center: [-111.65, 39.6],
    zoom: 6,
}));

const WMS_SOURCE = '__qa_wms';
const WMS_LAYER = '__qa_wms_layer';
const WFS_SOURCE = '__qa_wfs';
const PM_SOURCE = '__qa_pmtiles';
const wfsLayerIds = new Set();
const pmLayerIds = new Set();

const opacityProp = (type) =>
    type === 'fill' ? 'fill-opacity' :
    type === 'line' ? 'line-opacity' :
    type === 'circle' ? 'circle-opacity' :
    null;

const removeAll = () => {
    if (map.getLayer(WMS_LAYER)) map.removeLayer(WMS_LAYER);
    if (map.getSource(WMS_SOURCE)) map.removeSource(WMS_SOURCE);
    for (const id of wfsLayerIds) if (map.getLayer(id)) map.removeLayer(id);
    wfsLayerIds.clear();
    if (map.getSource(WFS_SOURCE)) map.removeSource(WFS_SOURCE);
    for (const id of pmLayerIds) if (map.getLayer(id)) map.removeLayer(id);
    pmLayerIds.clear();
    if (map.getSource(PM_SOURCE)) map.removeSource(PM_SOURCE);
};

const addWms = (qualified, opacity) => {
    const url =
        `${GEOSERVER}/wms?service=WMS&version=1.1.1&request=GetMap` +
        `&layers=${encodeURIComponent(qualified)}` +
        `&styles=&format=image/png&transparent=true` +
        `&srs=EPSG:3857&bbox={bbox-epsg-3857}&width=512&height=512`;
    map.addSource(WMS_SOURCE, { type: 'raster', tiles: [url], tileSize: 512 });
    map.addLayer({
        id: WMS_LAYER, type: 'raster', source: WMS_SOURCE,
        paint: { 'raster-opacity': opacity },
    });
};

const addWfs = async (qualified, styleDoc, opacity) => {
    const url =
        `${GEOSERVER}/wfs?service=WFS&version=2.0.0&request=GetFeature` +
        `&typeNames=${encodeURIComponent(qualified)}` +
        `&outputFormat=application/json&srsName=EPSG:4326&count=10000`;
    setStatus(`fetching WFS for ${qualified} (cap 10k)…`);
    const res = await fetch(url);
    if (!res.ok) {
        setStatus(`WFS HTTP ${res.status}`);
        return null;
    }
    const geojson = await res.json();
    setStatus(`WFS loaded: ${geojson.features?.length ?? 0} features`);

    map.addSource(WFS_SOURCE, {
        type: 'geojson',
        data: geojson,
        tolerance: 0,         // disable geojson-vt simplification
        buffer: 128,          // default; keep wide overlap to avoid edge clipping
        maxzoom: 22,          // build internal tiles up to z22 for full detail
    });
    for (const layer of styleDoc.layers) {
        const id = `__qa_wfs_${layer.id}`;
        const cloned = { ...layer, id, source: WFS_SOURCE };
        cloned.paint = { ...(layer.paint ?? {}) };
        const op = opacityProp(layer.type);
        if (op) cloned.paint[op] = opacity;
        map.addLayer(cloned);
        wfsLayerIds.add(id);
    }
    return geojson;
};

const addPmtiles = async (slug, styleDoc, opacity) => {
    const url = PMTILES_URL(slug);
    const head = await fetch(url, { method: 'HEAD' }).catch(() => null);
    if (!head?.ok) return false;
    map.addSource(PM_SOURCE, { type: 'vector', url: `pmtiles://${url}` });
    for (const layer of styleDoc.layers) {
        const id = `__qa_pm_${layer.id}`;
        const cloned = { ...layer, id, source: PM_SOURCE, 'source-layer': slug };
        cloned.paint = { ...(layer.paint ?? {}) };
        const op = opacityProp(layer.type);
        if (op) cloned.paint[op] = opacity;
        map.addLayer(cloned);
        pmLayerIds.add(id);
    }
    return true;
};

const updateVisibility = () => {
    const showOld = $('showOld').checked;
    const showNew = $('showNew').checked;
    const showPm = $('showPm').checked;
    if (map.getLayer(WMS_LAYER)) map.setLayoutProperty(WMS_LAYER, 'visibility', showOld ? 'visible' : 'none');
    for (const id of wfsLayerIds) map.setLayoutProperty(id, 'visibility', showNew ? 'visible' : 'none');
    for (const id of pmLayerIds) map.setLayoutProperty(id, 'visibility', showPm ? 'visible' : 'none');
};

const setOpacity = (ids, value) => {
    for (const id of ids) {
        const layer = map.getLayer(id);
        if (!layer) continue;
        const k = opacityProp(layer.type);
        if (k) map.setPaintProperty(id, k, value);
    }
};

const fitToFeatures = (geojson) => {
    if (!geojson?.features?.length) return;
    const b = new maplibregl.LngLatBounds();
    let added = false;
    const walk = (g) => {
        if (!g) return;
        if (g.type === 'Point') { b.extend(g.coordinates); added = true; }
        else if (g.type === 'MultiPoint' || g.type === 'LineString') for (const c of g.coordinates) { b.extend(c); added = true; }
        else if (g.type === 'MultiLineString' || g.type === 'Polygon') for (const r of g.coordinates) for (const c of r) { b.extend(c); added = true; }
        else if (g.type === 'MultiPolygon') for (const p of g.coordinates) for (const r of p) for (const c of r) { b.extend(c); added = true; }
        else if (g.type === 'GeometryCollection') for (const sub of g.geometries) walk(sub);
    };
    for (const f of geojson.features) walk(f.geometry);
    if (added) map.fitBounds(b, { padding: 60, maxZoom: 12, duration: 600 });
};

let currentGeojson = null;

const loadLayer = async (layerSlug, renderPath) => {
    const ws = layerWorkspaceCache.get(layerSlug);
    if (!ws) { setStatus(`no workspace for ${layerSlug}`); return; }
    const qualified = `${ws}:${layerSlug}`;
    document.body.classList.add('loading');
    try {
        removeAll();
        currentGeojson = null;

        const styleDoc = await fetch(STYLE_URL(renderPath)).then((r) => r.json());

        addWms(qualified, parseFloat($('oldOp').value));

        const pmHere = await addPmtiles(layerSlug, styleDoc, parseFloat($('pmOp').value));

        if ($('showNew').checked) {
            currentGeojson = await addWfs(qualified, styleDoc, parseFloat($('newOp').value));
        }

        const tally = ['WMS', pmHere ? 'PMTiles' : null, $('showNew').checked ? 'WFS' : null].filter(Boolean).join(' + ');
        setStatus(`loaded: ${tally}${pmHere ? '' : ' (no PMTiles built — run scripts/build-pmtiles.sh)'}`);
        updateVisibility();
    } finally {
        document.body.classList.remove('loading');
    }
};

const populateDropdown = (manifest) => {
    const sel = $('layerSel');
    for (const e of manifest) {
        const opt = document.createElement('option');
        opt.value = JSON.stringify({ layer: e.layer, render: e.render, path: e.path });
        opt.textContent = `${e.layer} / ${e.render}`;
        sel.appendChild(opt);
    }
};

// Register an SDF icon (single-channel, alpha-driven) so categorical layers can tint
// it via `icon-color`. Used by karstfeatures_*. Renders an FGDC-style depression
// marker — a filled disc with a transparent ring around the inner pit.
// 4 fat bars crossing at center at 0°/45°/90°/135° → 8-spoked asterisk.
// Matches the ESRI Transportation & Civic 0x72 glyph used by SLD karstfeatures.
const KARST_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -6 36 36'>
  <g fill='#000'>
    <rect x='-6' y='9' width='36' height='6'/>
    <rect x='-6' y='9' width='36' height='6' transform='rotate(45 12 12)'/>
    <rect x='-6' y='9' width='36' height='6' transform='rotate(90 12 12)'/>
    <rect x='-6' y='9' width='36' height='6' transform='rotate(135 12 12)'/>
  </g>
</svg>`;

const svgToImageData = (svg, w, h) =>
    new Promise((resolve, reject) => {
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = new Image(w, h);
        img.onload = () => {
            const c = document.createElement('canvas');
            c.width = w; c.height = h;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            resolve(ctx.getImageData(0, 0, w, h));
        };
        img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
        img.src = url;
    });

const main = async () => {
    await new Promise((r) => map.once('load', r));

    try {
        const data = await svgToImageData(KARST_SVG, 32, 32);
        map.addImage('karst-marker', data, { sdf: true });
    } catch (e) {
        console.warn('karst-marker icon failed to load:', e);
    }

    setStatus('loading manifest…');
    await fetchWorkspaceMap();
    const manifest = await fetch(MANIFEST_URL).then((r) => r.json());
    populateDropdown(manifest);
    setStatus(`ready · ${manifest.length} layers`);

    $('layerSel').addEventListener('change', (e) => {
        if (!e.target.value) return;
        const { layer, path } = JSON.parse(e.target.value);
        loadLayer(layer, path);
    });
    $('showOld').addEventListener('change', updateVisibility);
    $('showNew').addEventListener('change', async (e) => {
        // Lazy-load WFS the first time it's enabled (saves bandwidth on layers
        // user only wants to inspect via PMTiles).
        if (e.target.checked && !wfsLayerIds.size) {
            const sel = $('layerSel').value;
            if (sel) {
                document.body.classList.add('loading');
                try {
                    const { layer, path } = JSON.parse(sel);
                    const ws = layerWorkspaceCache.get(layer);
                    const styleDoc = await fetch(STYLE_URL(path)).then((r) => r.json());
                    currentGeojson = await addWfs(`${ws}:${layer}`, styleDoc, parseFloat($('newOp').value));
                } finally {
                    document.body.classList.remove('loading');
                }
            }
        }
        updateVisibility();
    });
    $('showPm').addEventListener('change', updateVisibility);
    $('oldOp').addEventListener('input', (e) => {
        if (map.getLayer(WMS_LAYER)) map.setPaintProperty(WMS_LAYER, 'raster-opacity', parseFloat(e.target.value));
    });
    $('newOp').addEventListener('input', (e) => setOpacity(wfsLayerIds, parseFloat(e.target.value)));
    $('pmOp').addEventListener('input', (e) => setOpacity(pmLayerIds, parseFloat(e.target.value)));
    $('zoomFit').addEventListener('click', () => fitToFeatures(currentGeojson));
};

main().catch((err) => {
    console.error(err);
    setStatus(`error: ${err.message}`);
});
