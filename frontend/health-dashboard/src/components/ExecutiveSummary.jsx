import React from "react";

const SparkleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L13.5 9.5L20 11L13.5 12.5L12 19L10.5 12.5L4 11L10.5 9.5L12 3Z"
      fill="#c084fc"
    />
    <path
      d="M19 18L19.5 20.5L22 21L19.5 21.5L19 24L18.5 21.5L16 21L18.5 20.5L19 18Z"
      fill="#c084fc"
    />
  </svg>
);

export default function ExecutiveSummary({ aiSummary }) {
  if (!aiSummary) return null;

  return (
    <div
      className="apple-card"
      style={{
        marginBottom: "30px",
        padding: "24px 30px",
        border: "1.5px solid #f2f2f7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle purple gradient edge on the left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: "linear-gradient(to bottom, #c084fc, #38bdf8)",
        }}
      ></div>

      <h3
        style={{
          marginBottom: "12px",
          color: "#1c1c1e",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <SparkleIcon /> AI Executive Summary
      </h3>

      <div
        style={{
          color: "#3a3a3c",
          lineHeight: "1.7",
          fontSize: "15px",
          whiteSpace: "pre-wrap",
        }}
      >
        {aiSummary}
      </div>
    </div>
  );
}
