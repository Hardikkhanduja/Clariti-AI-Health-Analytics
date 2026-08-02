import React from "react";

 
const HeartRateIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 16H9.5L12 9L18 25L21.5 16H28"
      stroke="#ff3b30"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BloodDropIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4C16 4 7 13.784 7 20C7 24.9706 11.0294 29 16 29C20.9706 29 25 24.9706 25 20C25 13.784 16 4 16 4Z"
      stroke="#007aff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 20C11 22.7614 13.2386 25 16 25"
      stroke="#007aff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5"
      y="7"
      width="22"
      height="20"
      rx="4"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 14H27"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 4V10"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4V10"
      stroke="#34c759"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="10" y="19" width="4" height="4" rx="1" fill="#34c759" />
  </svg>
);

export default function MetricsRow({
  dynamicScore,
  totalBiomarkers,
  lastUploadDate,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginBottom: "30px",
      }}
    >
      {/* Red Health Score Card */}
      <div
        className="apple-card"
        style={{ display: "flex", alignItems: "center", gap: "16px" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background: "#fff0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeartRateIcon />
        </div>
        <div>
          <h3
            style={{
              color: "#8e8e93",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Health Score
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1c1c1e",
              marginTop: "2px",
            }}
          >
            {dynamicScore}
          </p>
        </div>
      </div>

      {/* Blue Biomarkers Card */}
      <div
        className="apple-card"
        style={{ display: "flex", alignItems: "center", gap: "16px" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background: "#f0f8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BloodDropIcon />
        </div>
        <div>
          <h3
            style={{
              color: "#8e8e93",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Biomarkers Tracked
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1c1c1e",
              marginTop: "2px",
            }}
          >
            {totalBiomarkers}
          </p>
        </div>
      </div>

      {/* Green Calendar Card */}
      <div
        className="apple-card"
        style={{ display: "flex", alignItems: "center", gap: "16px" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background: "#f0fff4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalendarIcon />
        </div>
        <div>
          <h3
            style={{
              color: "#8e8e93",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Last Upload
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1c1c1e",
              marginTop: "2px",
            }}
          >
            {lastUploadDate}
          </p>
        </div>
      </div>
    </div>
  );
}
