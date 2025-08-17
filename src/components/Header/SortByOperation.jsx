/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import SortBy from "./SortBy";

function SortByOperation({ styles }) {
  const location = useLocation();

  const showSortByRoutes = ["/app/favorites/", "/app/library/"];

  const showSortBy = showSortByRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {showSortBy && (
        <div className={styles.box}>
          <SortBy
            options={[
              { value: "name-asc", label: "Title (A-Z)" },
              { value: "name-desc", label: "Title (Z-A)" },
              { value: "artists-asc", label: "Artist (A-Z)" },
              { value: "artists-desc", label: "Artist (Z-A)" },
              { value: "added_at-asc", label: "Date added (asc)" },
              {
                value: "added_at-desc",
                label: "Date added (desc)",
              },
            ]}
          />
        </div>
      )}
    </>
  );
}

export default SortByOperation;
