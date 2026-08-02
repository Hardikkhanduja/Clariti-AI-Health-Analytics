import React from "react";

 
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="#8e8e93"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L16 16"
      stroke="#8e8e93"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendUpIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 6L13.5 15.5L8.5 10.5L1 18"
      stroke="#ff3b30"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 6H23V12"
      stroke="#ff3b30"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 18L13.5 8.5L8.5 13.5L1 6"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H23V12"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function BiomarkerGrid({
  searchQuery,
  setSearchQuery,
  availableCategories,
  activeCategory,
  setActiveCategory,
  filteredBiomarkers,
  latestRecord,
  patientData,
  setSelectedMarker,
}) {
  return (
    <div>
      {/* Search Bar */}
      <div className="search-container" style={{ marginBottom: "24px" }}>
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder="Search for a specific biomarker (e.g., Iron, Cholesterol)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className="tabs-container">
        {availableCategories.map((category) => (
          <button
            key={category}
            className={`tab-button ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <section className="biomarker-grid">
        {filteredBiomarkers.map((marker) => {
          const markerData = latestRecord.markers[marker];
          let currentVal = 0;
          let minNormal = null;
          let maxNormal = null;

          if (typeof markerData === "object" && markerData !== null) {
            currentVal = parseFloat(markerData.value || 0);
            if (markerData.min_normal)
              minNormal = parseFloat(markerData.min_normal);
            if (markerData.max_normal)
              maxNormal = parseFloat(markerData.max_normal);
          } else {
            currentVal = parseFloat(markerData || 0);
          }

          let isAbnormal = false;
          let alertText = "";
          if (minNormal !== null && maxNormal !== null) {
            if (currentVal < minNormal) {
              isAbnormal = true;
              alertText = "(Low)";
            } else if (currentVal > maxNormal) {
              isAbnormal = true;
              alertText = "(High)";
            }
          }

          let trendElement = null;
          if (patientData.length > 1) {
            const prevData =
              patientData[patientData.length - 2].markers[marker];
            let previousVal = 0;
            if (prevData !== undefined) {
              previousVal =
                typeof prevData === "object" && prevData !== null
                  ? parseFloat(prevData.value || 0)
                  : parseFloat(prevData || 0);
            }

            if (previousVal > 0) {
              const diff = currentVal - previousVal;
              const percentChange = (
                (Math.abs(diff) / previousVal) *
                100
              ).toFixed(1);

              if (diff > 0) {
                trendElement = (
                  <span
                    style={{
                      color: "#ff3b30",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    <TrendUpIcon /> {percentChange}%
                  </span>
                );
              } else if (diff < 0) {
                trendElement = (
                  <span
                    style={{
                      color: "#34c759",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    <TrendDownIcon /> {percentChange}%
                  </span>
                );
              } else {
                trendElement = (
                  <span
                    style={{
                      color: "#8e8e93",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    — 0%
                  </span>
                );
              }
            } else {
              trendElement = (
                <span
                  style={{
                    color: "#007aff",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: 600,
                  }}
                >
                  New
                </span>
              );
            }
          } else {
            trendElement = (
              <span
                style={{
                  color: "#8e8e93",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontWeight: 600,
                }}
              >
                First Upload
              </span>
            );
          }

          return (
            <div
              key={marker}
              className={`bio-card ${isAbnormal ? "bio-card-abnormal" : ""}`}
              onClick={() => setSelectedMarker(marker)}
            >
              <div style={{ marginBottom: "12px" }}>
                <div className="bio-title" title={marker}>
                  {marker}
                </div>
                {minNormal !== null && maxNormal !== null && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8e8e93",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Range: {minNormal} - {maxNormal}
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div className="bio-value">
                  {currentVal}
                  {isAbnormal && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#ff3b30",
                        marginLeft: "6px",
                      }}
                    >
                      {alertText}
                    </span>
                  )}
                </div>
                {trendElement}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
