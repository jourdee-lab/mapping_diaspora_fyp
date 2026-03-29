import { useState, useEffect } from 'react';
import type { FeatureCollection } from 'geojson';
import { WardGeoJSON } from '@/types/data';

export function useGeoJSON(year: number) {
  const [data, setData] = useState<WardGeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `/geojson/manchester_wards_${year}.geojson`;
        console.log(`[Data Load] Fetching: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        if (active) {
          console.log(`[Data Load] ✓ Loaded ${jsonData.features?.length || 0} features for ${year}`);
          setData(jsonData as WardGeoJSON);
        }
      } catch (err) {
        if (active) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to load census data';
          console.error('[Data Load] ✗ Error:', errorMsg);
          setError(errorMsg);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { active = false; };
  }, [year]);

  return { data, loading, error };
}
