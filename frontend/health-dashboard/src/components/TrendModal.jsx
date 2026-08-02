import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="#8e8e93"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#8e8e93"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TrendModal({
  selectedMarker,
  setSelectedMarker,
  chartData,
}) {
  if (!selectedMarker) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedMarker(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedMarker(null)}>
          <CloseIcon />
        </button>

        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1c1c1e",
              marginBottom: "4px",
            }}
          >
            {selectedMarker}
          </h2>
          <span
            style={{
              color: "#007aff",
              fontWeight: 800,
              fontSize: "32px",
              letterSpacing: "-1px",
            }}
          >
            {chartData[chartData.length - 1].value}
          </span>
        </div>

        <div style={{ height: "350px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007aff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#007aff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f2f2f7"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#8e8e93"
                tick={{ fill: "#8e8e93", fontSize: 12, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#8e8e93"
                tick={{ fill: "#8e8e93", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  fontWeight: 600,
                  color: "#1c1c1e",
                }}
                itemStyle={{ color: "#007aff" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#007aff"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorBlue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
