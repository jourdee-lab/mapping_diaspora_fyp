# 🗺️ Census Choropleth Quick Reference

## 🚀 Quick Start (3 Steps)

```bash
# 1. Convert data (one-time setup)
cd /home/jourdee/Workspace/manchester_spatial_lab/fyp_main
./scripts/setup_choropleth_web_app.sh

# 2. Start development server
cd /home/jourdee/Workspace/manchester_spatial_lab/manchester-cityscape-explorer-main
npm run dev

# 3. Open browser
http://localhost:5173/census-explorer
```

## 📊 Available Indicators

### 1981 Census (General Population)
| Indicator | Field Name | Category |
|-----------|------------|----------|
| % Chinese-Born | `PCT_CHINESE_BORN_1981` | Ethnicity |
| % Owner-Occupied | `PCT_OWNER_OCC_1981` | Housing |
| % No Car | `PCT_NO_CAR_1981` | Housing |
| % Overcrowded | `PCT_OVERCROWD_GT1P5_1981` | Housing |
| % No Bath/WC | `PCT_NO_BATH_OR_WC_1981` | Housing |
| Employment Rate | `EMP_RATE_1981` | Employment |
| Total Residents | `TOTAL_RES_1981` | Demographic |

### 1991 Census (Chinese-Focused)
| Indicator | Field Name | Category |
|-----------|------------|----------|
| % China-Born | `PCT_CHINA_BORN_1991` | Ethnicity |
| % Chinese Ethnic | `PCT_CHINESE_ETHNIC_1991` | Ethnicity |
| % Chinese Owner-Occ | `PCT_CHINESE_OWNER_OCC_1991` | Housing |
| % Chinese Overcrowd | `PCT_CHINESE_OVERCROWD_1991` | Housing |
| Chinese Population | `CHINESE_ETHNIC_1991` | Demographic |
| Chinese Households | `CHINESE_HOUSEHOLDS_1991` | Demographic |

## 🎨 Color Schemes

Current palettes (in `ChoroplethMapContainer.tsx`):

```typescript
sequential_blue   // 👈 Default (cool, professional)
sequential_red    // Warnings, negative indicators
sequential_green  // Positive indicators
sequential_purple // Alternative
diverging        // For indicators with natural midpoint
```

**To customize**: Edit `colorPalettes` object in `ChoroplethMapContainer.tsx`

**Recommended**: Use [ColorBrewer](https://colorbrewer2.org/) for accessibility

## 🗂️ File Locations

### Data Files
```
manchester-cityscape-explorer-main/public/geojson/
├── manchester_eds_1981.geojson    # 1981 census data
├── manchester_eds_1991.geojson    # 1991 census data
└── datasets.json                   # Metadata
```

### Code Files
```
src/
├── components/
│   ├── ChoroplethMapContainer.tsx  # Main map component
│   └── ChoroplethLegend.tsx        # Legend component
├── data/
│   └── indicators.ts               # Indicator configs
├── pages/
│   └── CensusExplorer.tsx          # Census Explorer page
└── types/
    └── data.ts                     # TypeScript types
```

### Documentation
```
manchester-cityscape-explorer-main/
├── INTEGRATION_SUMMARY.md          # Full implementation guide
├── CHOROPLETH_INTEGRATION.md       # Detailed technical docs
├── INTEGRATION_TEST_RESULTS.md     # Test results
└── QUICK_REFERENCE.md              # This file
```

## 🔧 Common Tasks

### Update Data
```bash
# After modifying GeoPackages
cd /home/jourdee/Workspace/manchester_spatial_lab/fyp_main
python scripts/convert_gpkg_to_geojson.py

# Refresh browser - data auto-reloads
```

### Add New Indicator

**1. Add to TypeScript types** (`src/types/data.ts`):
```typescript
export interface CensusProperties1981 {
  // ... existing
  NEW_FIELD_1981?: number;
}
```

**2. Add indicator definition** (`src/data/indicators.ts`):
```typescript
{
  id: 'new_indicator_1981',
  label: 'New Indicator Name',
  description: 'What this measures',
  unit: 'percentage',  // or 'count' or 'rate'
  year: 1981,
  category: 'housing',  // or 'ethnicity', 'employment', 'demographic'
  field: 'NEW_FIELD_1981',
  colorScheme: 'sequential',
}
```

**3. Ensure field exists in GeoPackage** - if not, recompute indicators

### Change Default Indicator
Edit `getDefaultIndicator()` in `src/data/indicators.ts`:
```typescript
export function getDefaultIndicator(year: 1981 | 1991 | 2001): IndicatorMetadata {
  // Return specific indicator by ID
  return getIndicatorById('pct_chinese_born_1981') || AVAILABLE_INDICATORS[0];
}
```

### Change Classification Method
In `ChoroplethMapContainer.tsx`, line ~169:
```typescript
const calculatedBreaks = calculateBreaks(values, 7, 'quantile');
// Change 'quantile' to 'equalInterval' or 'naturalBreaks'
```

### Change Number of Classes
Same location, change `7` to desired number (recommended: 5-9):
```typescript
const calculatedBreaks = calculateBreaks(values, 5, 'quantile');
```

### Export Map Image
Use browser's built-in screenshot tools or:
```javascript
// In browser console:
window.print();  // Or use browser screenshot extension
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Map blank | Check console for errors, verify GeoJSON files exist |
| "404 Not Found" | Run conversion script, restart dev server |
| All polygons gray | Field name mismatch - check TypeScript types |
| Weird colors | Try different classification method |
| Slow performance | Reduce simplification tolerance (script) |
| Map misaligned | Check CRS is EPSG:4326 in GeoJSON |

## 📱 Component API

### ChoroplethMapContainer Props
```typescript
<ChoroplethMapContainer
  year={1981}                           // Census year
  indicator={indicatorObject}           // IndicatorMetadata
  onIndicatorChange={setIndicator}      // Optional callback
  availableIndicators={indicatorArray}  // Optional indicator list
/>
```

### Loading GeoJSON Manually
```typescript
const response = await fetch('/geojson/manchester_eds_1981.geojson');
const data: CensusGeoJSON = await response.json();
```

## 🎓 Research Tips

### Dissertation-Worthy Maps
1. **Choose meaningful indicators** for research questions
2. **Use consistent color schemes** across similar maps
3. **Include scale bar** (Leaflet control)
4. **Document classification method** in methodology
5. **Export at high zoom** for detail views
6. **Screenshot legend** separately if needed

### Comparative Analysis
```typescript
// Display two maps side-by-side (custom implementation)
<div className="grid grid-cols-2 gap-4">
  <ChoroplethMapContainer year={1981} indicator={ind1} />
  <ChoroplethMapContainer year={1991} indicator={ind2} />
</div>
```

### Data Exploration Workflow
1. Start with **% Chinese-Born** (main research focus)
2. Compare to **housing indicators** (integration proxy)
3. Examine **employment patterns** (economic integration)
4. Look for **spatial clusters** and patterns
5. Screenshot interesting findings

## 📐 Performance Tips

### Optimize GeoJSON Size
In `convert_gpkg_to_geojson.py`:
```python
simplify_tolerance=10,      # Increase to 20 for smaller files
coordinate_precision=6       # Reduce to 5 for smaller files (1m precision)
```

### Lazy Load Data
```typescript
// Only load when tab/page is active
useEffect(() => {
  if (isActive) {
    loadGeoJSON();
  }
}, [isActive]);
```

## 🌈 Color Accessibility

**Guidelines**:
- Use ColorBrewer "colorblind safe" palettes
- Avoid red-green combinations
- Test with grayscale conversion
- Provide numeric values in tooltips (don't rely on color alone)

**Good palettes for dissertations**:
- Blues (professional, academic)
- Purples (modern, engaging)
- Sequential greens (positive indicators)

## 📊 Statistics Helper

### Get Value Distribution
```typescript
const values = geojsonData.features
  .map(f => f.properties.PCT_CHINESE_BORN_1981)
  .filter(v => v != null);

const min = Math.min(...values);
const max = Math.max(...values);
const avg = values.reduce((a,b) => a+b) / values.length;
console.log({ min, max, avg });
```

## 🚢 Production Deployment

When ready to deploy:
```bash
npm run build
# Deploy /dist folder to web host
# GeoJSON files will be included automatically
```

## 📞 Getting Help

1. **Check console** for errors (F12 in browser)
2. **Read test results**: `INTEGRATION_TEST_RESULTS.md`
3. **Detailed guide**: `CHOROPLETH_INTEGRATION.md`
4. **Full summary**: `INTEGRATION_SUMMARY.md`

---

**Quick Links**:
- Development server: http://localhost:5173/census-explorer
- Leaflet docs: https://leafletjs.com/reference.html
- GeoJSON spec: https://geojson.org/
- Color Brewer: https://colorbrewer2.org/

**Status**: ✅ Ready for use  
**Last Updated**: 2026-02-04
