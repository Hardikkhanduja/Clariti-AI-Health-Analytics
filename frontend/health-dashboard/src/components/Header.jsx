import React from "react";

 
const AppleSparkleIcon = () => (
  <svg
    width="18"
    height="18"
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

const UserAvatarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="#007aff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
      stroke="#007aff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#8e8e93"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header({
  activePatient,
  allPatientsList,
  showPatientMenu,
  setShowPatientMenu,
  setActivePatient,
  setActiveCategory,
  setAiSummary,
  handleGenerateSummary,
  loadingSummary,
}) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <h1>Clariti</h1>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
         
        <button
          onClick={handleGenerateSummary}
          disabled={loadingSummary}
          style={{
            background: "#ffffff",
            border: "1.5px solid #e5e5ea",
            color: "#1c1c1e",
            padding: "10px 20px",
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "14px",
            cursor: loadingSummary ? "not-allowed" : "pointer",
            opacity: loadingSummary ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "#c084fc";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(192, 132, 252, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "#e5e5ea";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
          }}
        >
          <AppleSparkleIcon />
          {loadingSummary ? "Analyzing..." : "Generate Insights"}
        </button>

        {/* Patient Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid #e5e5ea",
              padding: "10px 20px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
            onClick={() => setShowPatientMenu(!showPatientMenu)}
          >
            <UserAvatarIcon />
            <span
              style={{ fontWeight: 600, fontSize: "15px", color: "#1c1c1e" }}
            >
              {activePatient}
            </span>
            <ChevronDownIcon />
          </div>

          {showPatientMenu && (
            <div
              style={{
                position: "absolute",
                top: "115%",
                right: "0",
                width: "100%",
                background: "#ffffff",
                border: "1px solid #e5e5ea",
                borderRadius: "16px",
                overflow: "hidden",
                zIndex: 50,
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              {allPatientsList.map((pat) => (
                <div
                  key={pat}
                  style={{
                    padding: "14px 20px",
                    cursor: "pointer",
                    color: pat === activePatient ? "#007aff" : "#1c1c1e",
                    background: pat === activePatient ? "#f0f8ff" : "#ffffff",
                    borderBottom: "1px solid #f2f2f7",
                    fontSize: "15px",
                    fontWeight: pat === activePatient ? 600 : 500,
                  }}
                  onClick={() => {
                    setActivePatient(pat);
                    setShowPatientMenu(false);
                    setActiveCategory("All");
                    setAiSummary(null);
                  }}
                >
                  {pat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
