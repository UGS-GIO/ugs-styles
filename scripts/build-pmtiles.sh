#!/usr/bin/env bash
# Build a PMTiles file for one GeoServer layer, end-to-end.
# Usage: scripts/build-pmtiles.sh <workspace:layer>
# Output: dist-pmtiles/<layer>.pmtiles  (and intermediate cache files under qa/cache)

set -euo pipefail

QUALIFIED="${1:?usage: build-pmtiles.sh <workspace:layer> [dissolve_property]}"
DISSOLVE_KEY="${2:-}"
WORKSPACE="${QUALIFIED%%:*}"
LAYER="${QUALIFIED##*:}"

GEOSERVER="${GEOSERVER:-https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CACHE_DIR="${ROOT}/qa/cache"
OUT_DIR="${ROOT}/dist-pmtiles"
mkdir -p "${CACHE_DIR}" "${OUT_DIR}"

GEOJSON="${CACHE_DIR}/${LAYER}.geojson"
MBTILES="${CACHE_DIR}/${LAYER}.mbtiles"
PMTILES="${OUT_DIR}/${LAYER}.pmtiles"

if [[ ! -s "${GEOJSON}" ]]; then
    echo "==> Fetch WFS: ${QUALIFIED}"
    curl -sf --get "${GEOSERVER}/wfs" \
        --data-urlencode "service=WFS" \
        --data-urlencode "version=2.0.0" \
        --data-urlencode "request=GetFeature" \
        --data-urlencode "typeNames=${QUALIFIED}" \
        --data-urlencode "outputFormat=application/json" \
        --data-urlencode "srsName=EPSG:4326" \
        -o "${GEOJSON}"
    echo "    saved $(wc -c <"${GEOJSON}") bytes"
else
    echo "==> Cache hit: ${GEOJSON}"
fi

FEATURES=$(python3 -c "import json,sys; d=json.load(open('${GEOJSON}')); print(len(d.get('features', [])))")
echo "    ${FEATURES} features"

if [[ "${FEATURES}" -eq 0 ]]; then
    echo "    skip: empty feature set (likely access-restricted or unpopulated layer)"
    exit 0
fi

INPUT_GEOJSON="${GEOJSON}"
if [[ -n "${DISSOLVE_KEY}" ]]; then
    DISSOLVED="${CACHE_DIR}/${LAYER}.dissolved.geojson"
    echo "==> Dissolve by '${DISSOLVE_KEY}' → ${DISSOLVED}"
    rm -f "${DISSOLVED}"
    npx --yes mapshaper "${GEOJSON}" -dissolve "${DISSOLVE_KEY}" -o "${DISSOLVED}"
    INPUT_GEOJSON="${DISSOLVED}"
fi

echo "==> Tippecanoe → ${MBTILES}"
rm -f "${MBTILES}"
# Flags chosen so that geometry at z11–z18 (county/neighborhood) is
# perceptually lossless: -z 18 -d 14 → ~9 mm grid cell at maxzoom.
# Below maxzoom a small tolerance still applies, so state-level views
# remain economical to render.
tippecanoe \
    -o "${MBTILES}" \
    -l "${LAYER}" \
    -n "${QUALIFIED}" \
    -Z 0 -z 18 -d 14 \
    -r1 --drop-rate=0 \
    -S 0.001 \
    -ps \
    --no-tiny-polygon-reduction \
    --no-simplification-of-shared-nodes \
    --no-tile-size-limit \
    --no-feature-limit \
    --read-parallel \
    --quiet \
    "${INPUT_GEOJSON}"

echo "==> Convert mbtiles → ${PMTILES}"
rm -f "${PMTILES}"
pmtiles convert "${MBTILES}" "${PMTILES}" >/dev/null

echo "==> Done."
ls -la "${PMTILES}"
