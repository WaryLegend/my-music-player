import { useSearchParams } from "react-router-dom";
import { getFieldValue } from "../utils/constant";
import { useMemo } from "react";

export function useSortedTracks(tracksData) {
  const [searchParams] = useSearchParams();

  //Sort
  const sortBy = searchParams.get("sortBy") || "added_at-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedTracks = useMemo(() => {
    const sorted = [...(tracksData?.tracks?.items || [])].sort((a, b) => {
      const valA = getFieldValue(a, field);
      const valB = getFieldValue(b, field);

      if (typeof valA === "string" && typeof valB === "string") {
        // date
        if (/\d{4}-\d{2}-\d{2}T/.test(valA)) {
          return (new Date(valA) - new Date(valB)) * modifier;
        }
        // string
        return valA.localeCompare(valB) * modifier;
      }
      // number
      return (valA - valB) * modifier;
    });

    return {
      ...tracksData,
      tracks: {
        ...tracksData?.tracks,
        items: sorted,
      },
      sortBy: sortBy,
    };
  }, [tracksData, field, modifier, sortBy]);

  return { sortedTracks };
}
