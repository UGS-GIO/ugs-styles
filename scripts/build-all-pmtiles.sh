#!/usr/bin/env bash
# Build PMTiles for every hazards layer in /tmp/hazards-designs.json.
# Pulls dissolve key from each design's rules[0].prop (categorical property).
# Skips layers whose pmtiles file is already up to date relative to its WFS cache.
#
# Usage: scripts/build-all-pmtiles.sh
# Output: dist-pmtiles/<layer>.pmtiles  for each hazards layer

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DESIGNS="${ROOT}/tmp-hazards-designs.json"
[[ -f "${DESIGNS}" ]] || DESIGNS=/tmp/hazards-designs.json

if [[ ! -f "${DESIGNS}" ]]; then
    echo "missing: ${DESIGNS}. Re-run the SLD parsing step first." >&2
    exit 1
fi

# Default: no dissolve (preserves per-feature detail). To opt a specific layer
# into dissolve, edit DISSOLVE_KEYS below (slug → property name).
declare -A DISSOLVE_KEYS=(
    [alluvialfan_current]=aafhazardunit
    [alluvialfan_review]=aafhazardunit
)

mapfile -t SPECS < <(python3 - <<'PY'
import json
designs = json.load(open('/tmp/hazards-designs.json'))
seen = set()
for d in designs:
    for layer_qualified in d['layers']:
        if layer_qualified in seen: continue
        seen.add(layer_qualified)
        print(layer_qualified)
PY
)

TOTAL=${#SPECS[@]}
i=0
for qualified in "${SPECS[@]}"; do
    i=$((i + 1))
    layer="${qualified##*:}"
    key="${DISSOLVE_KEYS[$layer]:-}"

    if [[ -n "${key}" ]]; then
        printf '[%d/%d] build %s (dissolve by %s)\n' "$i" "$TOTAL" "$qualified" "$key"
        bash "${ROOT}/scripts/build-pmtiles.sh" "${qualified}" "${key}" || printf '    !!! failed (continuing)\n'
    else
        printf '[%d/%d] build %s (raw geom)\n' "$i" "$TOTAL" "$qualified"
        bash "${ROOT}/scripts/build-pmtiles.sh" "${qualified}" || printf '    !!! failed (continuing)\n'
    fi
done

echo
echo "Done. ${TOTAL} layers processed."
ls -la "${ROOT}/dist-pmtiles" | tail -n +2
