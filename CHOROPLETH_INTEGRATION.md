# Leaflet + GeoJSON Choropleth Integration Guide

## Overview

This integration enables choropleth mapping of census data in the Manchester Cityscape Explorer web application using Leaflet and GeoJSON.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Web Application Layer                     │
│  (manchester-cityscape-explorer-main)                       │
│                                                               │
│  ┌──────────────────┐      ┌─────────────────────┐         │
│  │ CensusExplorer   │──────│ ChoroplethMap       │         │
│  │ Page             │      │ Container           │         │
│  └──────────────────┘      └─────────────────────┘         │
│           │                          │                       │
│           │                          │                       │
│  ┌────────▼──────────┐      ┌───────▼──────────┐          │
│  │ Indicator         │      │ Leaflet.js       │          │
│  │ Definitions       │      │ + GeoJSON Layer  │          │
│  └───────────────────┘      └──────────────────┘          │
│                                       │                      │
└───────────────────────────────────────┼──────────────────────┘
                                        │
                        ┌───────────────▼──────────────┐
                        │  /public/geojson/            │
                        │  ├── manchester_eds_1981.geojson
                        │  ├── manchester_eds_1991.geojson
                        │  └── datasets.json           │
                        └──────────────────────────────┘
                                        ▲
                                        │
┌───────────────────────────────────────┼──────────────────────┐
│               Data Processing Layer                           │
│               (fyp_main)                                      │
│                                                               │
│  ┌─────────────────────────────────────────────────┐        │
│  │ convert_gpkg_to_geojson.py                      │        │
│  │                                                  │        │
│  │  • Reads .gpkg files                            │        │
│  │  • Reprojects to WGS84 (EPSG:4326)             │        │
│  │  • Simplifies geometries (10m tolerance)        │        │
│  │  • Rounds coordinates (6 decimal places)        │        │
│  │  • Exports optimized GeoJSON                    │        │
│  └─────────────────────────────────────────────────┘        │
│                          ▲                                    │
│                          │                                    │
│  ┌───────────────────────┴──────────────────────┐           │
│  │ data/processed/outputs/spatial/              │           │
│  │  ├── 1981/manchester_eds_1981_joined_indicators.gpkg
│  │  └── 1991/manchester_eds_1991_joined_indicators.gpkg
│  └──────────────────────────────────────────────┘           │
└───────────────────────────────────────────────────────────────┘
```

## Installation & Setup

### Step 1: Convert GeoPackages to GeoJSON

Navigate to your FYP project and run the conversion script:

```bash
cd /home/jourdee/Workspace/manchester_spatial_lab/fyp_main
python scripts/convert_gpkg_to_geojson.py
```

This will:
- Read GeoPackage files from `data/processed/outputs/spatial/{year}/`
- Convert to optimized GeoJSON format
- Save to `../manchester-cityscape-explorer-main/public/geojson/`
- Create a `datasets.json` metadata file

### Step 2: Verify GeoJSON Files

Check that the files were created:

```bash
ls -lh ../manchester-cityscape-explorer-main/public/geojson/
```

Expected output:
```
manchester_eds_1981.geojson  (~1-5 MB)
manchester_eds_1991.geojson  (~1-5 MB)
datasets.json
```

### Step 3: Start the Web Application

```bash
cd /home/jourdee/Workspace/manchester_spatial_lab/manchester-cityscape-explorer-main
npm run dev
```

### Step 4: Access the Census Explorer

Open your browser to: `http://localhost:5173/census-explorer`

## Features

### 🗺️ Interactive Choropleth Maps

- **Dynamic indicator selection**: Switch between 8+ census indicators
- **Year comparison**: Toggle between 1981 and 1991 data
- **Interactive tooltips**: Hover over polygons to see values
- **Click for details**: Click polygons for detailed information

### 📊 Available Indicators (1981)

| Indicator | Category | Description |
|-----------|----------|-------------|
| % Chinese-Born Population | Ethnicity | Percentage of Far East-born residents |
| % Owner-Occupied Households | Housing | Home ownership rate |
| % Households Without Car | Housing | Car deprivation measure |
| % Overcrowded Households | Housing | >1.5 persons per room |
| % Households Without Bath/WC | Housing | Amenities deprivation |
| Employment Rate | Employment | % of 16+ employed |
| Unemployment Rate | Employment | % of 16+ unemployed |
| Total Residents | Demographic | Population count |

### 🎨 Visualization Features

- **Quantile classification**: Automatically creates color breaks
- **Custom color schemes**: Sequential palettes for clear patterns
- **Legend**: Dynamic legend showing value ranges
- **Base map options**: Street, Satellite, or Light base maps
- **Missing data handling**: Gray color for EDs without data

## File Structure

```
manchester-cityscape-explorer-main/
├── public/
│   └── geojson/                    # GeoJSON data files
│       ├── manchester_eds_1981.geojson
│       ├── manchester_eds_1991.geojson
│       └── datasets.json
├── src/
│   ├── components/
│   │   ├── ChoroplethMapContainer.tsx   # Main map component
│   │   └── ChoroplethLegend.tsx         # Legend component
│   ├── data/
│   │   └── indicators.ts                 # Indicator definitions
│   ├── pages/
│   │   └── CensusExplorer.tsx           # Census Explorer page
│   └── types/
│       └── data.ts                       # TypeScript types
```

## Component API

### ChoroplethMapContainer

```tsx
interface ChoroplethMapContainerProps {
  year: 1981 | 1991 | 2001;
  indicator: IndicatorMetadata;
  onIndicatorChange?: (indicator: IndicatorMetadata) => void;
  availableIndicators?: IndicatorMetadata[];
}
```

**Props:**
- `year`: Census year to display
- `indicator`: Current indicator configuration
- `onIndicatorChange`: Callback when user selects different indicator
- `availableIndicators`: List of indicators for dropdown

### ChoroplethLegend

```tsx
interface ChoroplethLegendProps {
  title: string;
  unit: 'percentage' | 'count' | 'rate';
  breaks: number[];
  colors: string[];
}
```

**Props:**
- `title`: Legend title (indicator name)
- `unit`: Data unit for formatting
- `breaks`: Array of classification breaks
- `colors`: Array of colors for each class

## TypeScript Types

### CensusProperties1981

```typescript
interface CensusProperties1981 {
  zoneid: string;
  TOTAL_RES_1981?: number;
  PCT_CHINESE_BORN_1981?: number;
  PCT_OWNER_OCC_1981?: number;
  PCT_NO_CAR_1981?: number;
  // ... more indicators
}
```

### IndicatorMetadata

```typescript
interface IndicatorMetadata {
  id: string;
  label: string;
  description: string;
  unit: 'percentage' | 'count' | 'rate';
  year: 1981 | 1991 | 2001;
  category: 'demographic' | 'ethnicity' | 'housing' | 'employment';
  field: keyof CensusProperties;
  colorScheme: 'sequential' | 'diverging' | 'categorical';
}
```

## Performance Optimizations

### GeoJSON Optimization

1. **Geometry Simplification**: 10m tolerance reduces file size by ~50-70%
2. **Coordinate Rounding**: 6 decimal places (~10cm precision)
3. **Compact JSON**: No whitespace in output
4. **Projection**: WGS84 (EPSG:4326) for web compatibility

### Leaflet Performance

- **Lazy loading**: GeoJSON loaded only when needed
- **Layer caching**: Reuses layer instances when possible
- **Event throttling**: Smooth interactions even with many polygons
- **Simplified rendering**: Optimized for web display

## Adding New Indicators

### 1. Update TypeScript Types

Add to [src/types/data.ts](cci:7://file:///home/jourdee/Workspace/manchester_spatial_lab/manchester-cityscape-explorer-main/src/types/data.ts:0:0-0:0):

```typescript
export interface CensusProperties1981 {
  // ... existing fields
  NEW_INDICATOR_1981?: number;
}
```

### 2. Add Indicator Definition

Add to [src/data/indicators.ts](cci:7://file:///home/jourdee/Workspace/manchester_spatial_lab/manchester-cityscape-explorer-main/src/data/indicators.ts:0:0-0:0):

```typescript
{
  id: 'new_indicator_1981',
  label: 'New Indicator Name',
  description: 'Description of what this measures',
  unit: 'percentage',
  year: 1981,
  category: 'housing',
  field: 'NEW_INDICATOR_1981',
  colorScheme: 'sequential',
}
```

### 3. Ensure Data Exists

The field must exist in your GeoPackage/GeoJSON. If not:

1. Update your indicator computation script in `fyp_main/scripts/`
2. Regenerate the GeoPackage with the new field
3. Re-run `convert_gpkg_to_geojson.py`

## Troubleshooting

### GeoJSON Not Loading

**Error**: "Failed to load data: 404"

**Solutions**:
1. Verify files exist in `public/geojson/`
2. Check file permissions
3. Ensure dev server is running
4. Check browser console for errors

### Map Not Rendering

**Symptoms**: Empty map container

**Solutions**:
1. Check Leaflet CSS is imported
2. Verify container has height (min 400px)
3. Check browser console for errors
4. Ensure GeoJSON data loaded successfully

### Incorrect CRS / Misaligned Data

**Symptoms**: Polygons in wrong location

**Solutions**:
1. Verify GeoPackage CRS (should be EPSG:27700 or EPSG:4326)
2. Check conversion script output for CRS warnings
3. Manually inspect GeoJSON coordinates (should be [-2.x, 53.x] for Manchester)

### Missing Indicator Values

**Symptoms**: All polygons show "No data"

**Solutions**:
1. Check field name matches exactly (case-sensitive)
2. Verify data exists in GeoJSON properties
3. Check TypeScript types match actual data
4. Inspect raw GeoJSON file

## Development Workflow

### Adding 2001 Data

When 2001 census data becomes available:

1. **Process data** (in `fyp_main`):
   ```bash
   python scripts/phase6_compute_indicators_2001_ed_level.py
   python scripts/create_joined_gpkg_2001.py
   ```

2. **Update conversion script**:
   ```python
   # In scripts/convert_gpkg_to_geojson.py
   conversions.append({
       "input": spatial_data_dir / "2001" / "manchester_eds_2001_joined_indicators.gpkg",
       "output_name": "manchester_eds_2001",
       "description": "2001 Output Areas with indicators"
   })
   ```

3. **Add TypeScript types**:
   ```typescript
   export interface CensusProperties2001 {
     // ... 2001 fields
   }
   ```

4. **Add indicators** to [src/data/indicators.ts](cci:7://file:///home/jourdee/Workspace/manchester_spatial_lab/manchester-cityscape-explorer-main/src/data/indicators.ts:0:0-0:0)

5. **Update UI** to support 2001 in year selector

## Best Practices

### Data Quality
- ✅ Always validate GeoPackage data before conversion
- ✅ Check for NULL values in key indicators
- ✅ Verify geographic coverage (all Manchester EDs present)
- ✅ Test choropleth with different indicators

### Performance
- ✅ Keep GeoJSON files under 5MB (use simplification)
- ✅ Limit color breaks to 5-9 classes
- ✅ Use quantile classification for skewed distributions
- ✅ Cache loaded GeoJSON data

### User Experience
- ✅ Show loading states during data fetch
- ✅ Handle missing data gracefully
- ✅ Provide clear legend and units
- ✅ Include descriptive tooltips
- ✅ Enable keyboard navigation

## References

- **Leaflet Documentation**: https://leafletjs.com/reference.html
- **GeoJSON Specification**: https://geojson.org/
- **React Leaflet**: https://react-leaflet.js.org/ (optional alternative)
- **Color Brewer**: https://colorbrewer2.org/ (color palette reference)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Python conversion script output
3. Inspect GeoJSON structure manually
4. Review component props and types
5. Check indicator definitions match data fields

---

**Version**: 1.0  
**Last Updated**: 2026-02-04  
**Maintainer**: Manchester Spatial Lab FYP Project
