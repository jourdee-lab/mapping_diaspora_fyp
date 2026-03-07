# Choropleth Map Styling Reference

## Overview
This document describes the styling improvements implemented for the Manchester Census Explorer choropleth maps.

## Color Schemes (ColorBrewer)

### Sequential Single-Hue
Best for showing progression of a single variable (low to high).

```typescript
// Blues - for general population data
['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c']

// Reds - for highlighting negative indicators
['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d']

// Greens - for positive indicators
['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32']

// Purples - for employment/economic data
['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486']
```

### Sequential Multi-Hue
Better visual discrimination across value range.

```typescript
// Yellow-Green-Blue - for housing indicators
['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84']

// Yellow-Orange-Red - for ethnicity/concentration
['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026']
```

### Diverging
For data with meaningful midpoint (e.g., above/below average, change over time).

```typescript
// Red-Blue
['#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4']

// Brown-Teal
['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e']
```

## Boundary Styling

### Before (Heavy Boundaries)
```typescript
{
  weight: 1,           // Thick lines
  opacity: 1,          // 100% visible
  color: '#666',       // Gray boundaries
  fillOpacity: 0.7,    // 70% fill
}
```
**Issues**: Boundaries dominate the map, obscuring color patterns.

### After (Subtle Separation)
```typescript
{
  weight: 0.5,         // Thin lines
  opacity: 0.15,       // 15% visible (subtle)
  color: '#ffffff',    // White separators
  fillOpacity: 0.85,   // 85% fill (stronger colors)
}
```
**Benefits**: Colors take center stage, white lines provide just enough separation.

### Hover State
```typescript
{
  weight: 2,           // Slightly thicker on hover
  color: '#000000',    // Black border for emphasis
  opacity: 0.8,        // More visible
  fillOpacity: 0.95,   // Nearly opaque
}
```

## Legend Classification

### Custom Percentage Breaks
Instead of arbitrary quantile breaks, use human-readable thresholds:

```typescript
// For data with max ≤ 10%
[0, 1, 2, 3, 5, 7, 10]

// For data with max ≤ 25%
[0, 2, 5, 10, 15, 20, 25]

// For data with max ≤ 50%
[0, 5, 10, 15, 25, 35, 50]

// For data with max > 50%
[0, 10, 20, 30, 50, 70, 90, 100]
```

### Formatting Rules
```typescript
// Percentage indicators
Integer values: "5%" (no decimals)
Decimal values: "5.3%" (one decimal)

// Count indicators
Integer values: "1,234" (thousand separators)
Decimal values: "1,234.5" (one decimal max)
```

## Color Assignment by Category

```typescript
// Auto-select palette based on indicator metadata
if (indicator.colorScheme === 'diverging') {
  palette = diverging_red_blue;
} else if (indicator.category === 'ethnicity') {
  palette = sequential_yellow_orange_red;  // Warm colors for concentration
} else if (indicator.category === 'housing') {
  palette = sequential_yellow_green_blue;  // Cool-warm transition
} else if (indicator.category === 'employment') {
  palette = sequential_purple;             // Distinct hue
} else {
  palette = sequential_blue;               // Default safe choice
}
```

## Implementation Files

### Main Map Component
**File**: `src/components/ChoroplethMapContainer.tsx`
- Color palette definitions
- Break calculation logic
- Polygon styling function
- Hover interaction styling

### Legend Component
**File**: `src/components/ChoroplethLegend.tsx`
- Value formatting
- Color swatch display
- Range labeling

### Indicator Metadata
**File**: `src/data/indicators.ts`
- `colorScheme`: 'sequential' | 'diverging'
- `category`: 'ethnicity' | 'housing' | 'employment' | 'demographic'
- Used to auto-select appropriate palette

## Visual Design Principles

1. **Perceptual Uniformity**: ColorBrewer schemes are tested for:
   - Equal perceived differences between steps
   - Colorblind-friendly where possible
   - Print-friendly (high contrast)

2. **Boundary Hierarchy**:
   - Primary: Thin white separators (subtle)
   - Hover: Black outline (prominent)
   - Selected: Can add click state if needed

3. **Legend Clarity**:
   - Round numbers aid interpretation
   - Consistent formatting by unit type
   - Visual prominence (shadow, larger swatches)

4. **Color Saturation**:
   - Higher fill opacity (85%) = stronger colors
   - Lower boundary opacity (15%) = less interference
   - Result: Clean, vibrant choropleth

## Accessibility Considerations

### Color Vision Deficiency
- ColorBrewer schemes are tested for deuteranopia (red-green colorblindness)
- Multi-hue sequential schemes provide better discrimination than single-hue
- Avoid red-green combinations in diverging schemes

### Pattern Alternatives (Future Enhancement)
For critical applications, consider adding texture/pattern overlays:
```typescript
// Example: Hatching for high values
if (value > threshold) {
  style.fillPattern = 'diagonal-stripe';
}
```

## References

- **ColorBrewer 2.0**: https://colorbrewer2.org/
- **Leaflet Choropleth Tutorial**: https://leafletjs.com/examples/choropleth/
- **Color Theory for Data Vis**: https://blog.datawrapper.de/colorguide/
- **Perceptually Uniform Colormaps**: https://peterkovesi.com/projects/colourmaps/
