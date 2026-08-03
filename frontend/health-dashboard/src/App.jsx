import { useEffect, useState } from "react";
import Header from "./components/Header";
import MetricsRow from "./components/MetricsRow";
import ExecutiveSummary from "./components/ExecutiveSummary";
import BiomarkerGrid from "./components/BiomarkerGrid";
import TrendModal from "./components/TrendModal";
import "./index.css";

function App() {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPhone, setUserPhone] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const [activePatient, setActivePatient] = useState(null);
  const [showPatientMenu, setShowPatientMenu] = useState(false);

  const [aiSummary, setAiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch Data from Python Backend (Live on Render)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (!user) {
      // If no user is in the URL, trigger the Marketing Landing Page!
      setError("empty");
      setLoading(false);
      return;
    }
    setUserPhone(user);

    fetch(
      `https://clariti-backend.onrender.com/api/health_data?user=${encodeURIComponent(user)}`,
    )
      .then((res) => res.json())
      .then((result) => {
        if (!result.data || result.data.length === 0) {
          setError("empty");
        } else {
          const parsedData = result.data.map((record) => ({
            ...record,
            date: new Date(record.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            markers:
              typeof record.biomarkers === "string"
                ? JSON.parse(record.biomarkers)
                : record.biomarkers,
          }));
          setHealthData(parsedData);

          const uniquePatients = Array.from(
            new Set(parsedData.map((r) => r.patient_name || "Unknown Patient")),
          );
          if (uniquePatients.length > 0) setActivePatient(uniquePatients[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("network");
        setLoading(false);
      });
  }, []);

  // Call the AI Insights API (Live on Render)
  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    setAiSummary(null);

    try {
      const response = await fetch(
        "https://clariti-backend.onrender.com/api/generate_summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userPhone,
            patient_name: activePatient,
          }),
        },
      );
      const data = await response.json();
      setAiSummary(data.summary);
    } catch (err) {
      console.error(err);
      setAiSummary(
        "Failed to generate summary. Please check your backend connection.",
      );
    }
    setLoadingSummary(false);
  };

  // THE NEW MARKETING LANDING PAGE!
  if (error === "empty") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
        }}
      >
        {/* Navigation Bar */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="/favicon.png"
              alt="Clariti Logo"
              style={{ width: "24px", height: "24px" }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "21px",
                color: "#000000",
                letterSpacing: "-0.5px",
              }}
            >
              Clariti.
            </span>
          </div>
          <a
            href="https://wa.me/15552020389"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066cc",
              fontSize: "15px",
              fontWeight: 400,
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Start free trial &gt;
          </a>
        </nav>

        {/* HERO SECTION */}
        <div
          style={{
            textAlign: "center",
            padding: "120px 20px 0px 20px",
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <h1 className="mac-hero-title">
            Your blood work.
            <br />
            Demystified.
          </h1>
          <p className="mac-hero-subtitle" style={{ marginBottom: "40px" }}>
            Forward your lab reports to our secure AI on WhatsApp. Receive a
            clinical, interactive health dashboard in seconds.
          </p>
          <a
            href="https://wa.me/15552020389"
            target="_blank"
            rel="noopener noreferrer"
            className="mac-button"
          >
            Try it on WhatsApp
          </a>
        </div>

        {/* EDGE-TO-EDGE PRODUCT MOCKUP */}
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "80px 20px 0 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              border: "1px solid #e5e5ea",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                background: "#f2f2f7",
                height: "40px",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                borderBottom: "1px solid #e5e5ea",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ff3b30",
                  marginRight: "8px",
                }}
              ></div>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ffcc00",
                  marginRight: "8px",
                }}
              ></div>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#34c759",
                }}
              ></div>
            </div>
            <img
              src="/mockup.png"
              alt="Dashboard"
              style={{ width: "100%", maxWidth: "1200px", display: "block" }}
            />
          </div>
        </div>

        {/* BORDERLESS FEATURE GRID */}
        <div className="mac-feature-grid">
          <div>
            <div className="mac-feature-num">1</div>
            <h3 className="mac-feature-title">Send PDF</h3>
            <p className="mac-feature-desc">
              Drop your raw lab report directly into our secure WhatsApp chat.
              No apps required.
            </p>
          </div>
          <div>
            <div className="mac-feature-num">2</div>
            <h3 className="mac-feature-title">AI Processing</h3>
            <p className="mac-feature-desc">
              Our clinical AI standardizes and maps every single biomarker with
              extreme accuracy.
            </p>
          </div>
          <div>
            <div className="mac-feature-num">3</div>
            <h3 className="mac-feature-title">Get Insights</h3>
            <p className="mac-feature-desc">
              Receive a highly actionable, historical health dashboard
              instantly.
            </p>
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer
          style={{
            padding: "60px 20px",
            textAlign: "center",
            background: "#f5f5f7",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginBottom: "20px",
            }}
          >
            <a
              href="mailto:support@clariti.health"
              style={{
                color: "#515154",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Support
            </a>
            <a
              href="#"
              style={{
                color: "#515154",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: "#515154",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Terms of Service
            </a>
          </div>
          <p style={{ color: "#86868b", fontSize: "13px", fontWeight: 400 }}>
            &copy; {new Date().getFullYear()} Clariti Health Inc. All rights
            reserved.
          </p>
        </footer>
      </div>
    );
  }

  // Filter Logic
  const allPatientsList = Array.from(
    new Set(healthData.map((r) => r.patient_name || "Unknown Patient")),
  );
  const patientData = healthData.filter(
    (record) => (record.patient_name || "Unknown Patient") === activePatient,
  );

  const latestRecord = patientData[patientData.length - 1];
  const allBiomarkers = latestRecord ? Object.keys(latestRecord.markers) : [];

  const dynamicScore =
    latestRecord && latestRecord.health_score
      ? latestRecord.health_score
      : "N/A";

  const categoriesSet = new Set();
  allBiomarkers.forEach((marker) => {
    const data = latestRecord.markers[marker];
    if (typeof data === "object" && data !== null && data.category) {
      categoriesSet.add(data.category);
    } else {
      categoriesSet.add("Uncategorized");
    }
  });
  const availableCategories = ["All", ...Array.from(categoriesSet).sort()];

  const filteredBiomarkers = allBiomarkers.filter((marker) => {
    const data = latestRecord.markers[marker];
    const markerCategory =
      typeof data === "object" && data !== null && data.category
        ? data.category
        : "Uncategorized";

    const matchesSearch = marker
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || markerCategory === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Chart Logic
  let chartData = [];
  if (selectedMarker) {
    chartData = patientData.map((record) => {
      const dataPoint = record.markers[selectedMarker];
      let val = 0;
      if (dataPoint !== undefined) {
        val =
          typeof dataPoint === "object" && dataPoint !== null
            ? parseFloat(dataPoint.value || 0)
            : parseFloat(dataPoint || 0);
      }
      return { date: record.date, value: val };
    });
  }

  return (
    <div className="dashboard-container">
      <Header
        activePatient={activePatient}
        allPatientsList={allPatientsList}
        showPatientMenu={showPatientMenu}
        setShowPatientMenu={setShowPatientMenu}
        setActivePatient={setActivePatient}
        setActiveCategory={setActiveCategory}
        setAiSummary={setAiSummary}
        handleGenerateSummary={handleGenerateSummary}
        loadingSummary={loadingSummary}
      />

      <MetricsRow
        dynamicScore={dynamicScore}
        totalBiomarkers={allBiomarkers.length}
        lastUploadDate={
          latestRecord
            ? new Date(latestRecord.created_at).toLocaleDateString()
            : "N/A"
        }
      />

      <ExecutiveSummary aiSummary={aiSummary} />

      <BiomarkerGrid
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        availableCategories={availableCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredBiomarkers={filteredBiomarkers}
        latestRecord={latestRecord}
        patientData={patientData}
        setSelectedMarker={setSelectedMarker}
      />

      <TrendModal
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        chartData={chartData}
      />
    </div>
  );
}

export default App;
