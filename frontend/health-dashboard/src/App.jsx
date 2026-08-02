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
 
  if (error === "empty") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="bg-blob" style={{ left: "30%", top: "-200px" }}></div>

        {/* Navigation Bar */}
        <nav
          className="nav-bar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid #f2f2f7",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/favicon.png"
              alt="Clariti Logo"
              style={{ width: "28px", height: "28px" }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: "20px",
                color: "#1c1c1e",
                letterSpacing: "-0.5px",
              }}
            >
              Clariti
            </span>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a
              href="https://wa.me/15552020389"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#f2f2f7",
                color: "#1c1c1e",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#e5e5ea")}
              onMouseOut={(e) => (e.target.style.background = "#f2f2f7")}
            >
              Try for Free
            </a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <div
          className="hero-split"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "80px 40px 40px 40px",
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column */}
          <div
            className="hero-left"
            style={{
              flex: "1",
              minWidth: "400px",
              maxWidth: "600px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(0, 122, 255, 0.05)",
                color: "#007aff",
                padding: "8px 16px",
                borderRadius: "30px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                marginBottom: "24px",
                border: "1px solid rgba(0, 122, 255, 0.1)",
              }}
            >
              THE NEW STANDARD IN BLOOD WORK
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#1c1c1e",
                lineHeight: "1.05",
                letterSpacing: "-2.5px",
                marginBottom: "24px",
              }}
            >
              Understand your blood tests.
              <br />
              <span className="gradient-text">In seconds.</span>
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#8e8e93",
                lineHeight: "1.6",
                marginBottom: "48px",
                fontWeight: 400,
              }}
            >
              Forward your lab results to our secure AI on WhatsApp, and receive
              a beautiful, personalized health dashboard instantly. No apps to
              download.
            </p>

            <a
              href="https://wa.me/15552020389"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1c1c1e",
                color: "#ffffff",
                padding: "18px 48px",
                borderRadius: "40px",
                fontSize: "18px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              Start for Free on WhatsApp
            </a>
          </div>

          {/* Right Column */}
          <div
            className="hero-right"
            style={{
              flex: "1.2",
              position: "relative",
              perspective: "1200px",
              minWidth: "500px",
              marginTop: "20px",
            }}
          >
            <div
              className="dashboard-mockup-container"
              style={{ transform: "translateX(20px)" }}
            >
              <div className="browser-top-bar">
                <div className="browser-dot dot-red"></div>
                <div className="browser-dot dot-yellow"></div>
                <div className="browser-dot dot-green"></div>
                <div
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      padding: "4px 80px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#8e8e93",
                      fontWeight: 500,
                      border: "1px solid #e5e5ea",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    }}
                  >
                    clariti.health/dashboard
                  </div>
                </div>
              </div>

              <img
                src="/mockup.png"
                alt="Clariti Dashboard Mockup"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div
                style={{
                  display: "none",
                  padding: "100px 20px",
                  color: "#8e8e93",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                [ Make sure you saved mockup.png in the public folder to see the
                image here! ]
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: -50,
                width: "100px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))",
                pointerEvents: "none",
              }}
            ></div>
          </div>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "40px 40px 80px 40px",
          }}
        >
          <div
            className="apple-card"
            style={{
              padding: "32px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#f0f8ff",
                color: "#007aff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              1
            </div>
            <h3
              style={{
                color: "#1c1c1e",
                marginBottom: "12px",
                fontSize: "20px",
              }}
            >
              Upload PDF
            </h3>
            <p
              style={{ color: "#8e8e93", fontSize: "16px", lineHeight: "1.6" }}
            >
              Just drop your raw lab report directly into our secure WhatsApp
              chat.
            </p>
          </div>
          <div
            className="apple-card"
            style={{
              padding: "32px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#f0f8ff",
                color: "#007aff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              2
            </div>
            <h3
              style={{
                color: "#1c1c1e",
                marginBottom: "12px",
                fontSize: "20px",
              }}
            >
              AI Processing
            </h3>
            <p
              style={{ color: "#8e8e93", fontSize: "16px", lineHeight: "1.6" }}
            >
              Our clinical AI standardizes and graphs every single biomarker
              instantly.
            </p>
          </div>
          <div
            className="apple-card"
            style={{
              padding: "32px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#f0f8ff",
                color: "#007aff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              3
            </div>
            <h3
              style={{
                color: "#1c1c1e",
                marginBottom: "12px",
                fontSize: "20px",
              }}
            >
              Get Insights
            </h3>
            <p
              style={{ color: "#8e8e93", fontSize: "16px", lineHeight: "1.6" }}
            >
              Receive humanized, highly actionable health summaries to improve
              your life.
            </p>
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer
          style={{
            borderTop: "1px solid #f2f2f7",
            padding: "60px 20px 40px 20px",
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <img
              src="/favicon.png"
              alt="Clariti Logo"
              style={{ width: "20px", height: "20px", opacity: 0.6 }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "16px",
                color: "#8e8e93",
                letterSpacing: "-0.5px",
              }}
            >
              Clariti Health
            </span>
          </div>
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
                color: "#8e8e93",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1c1c1e")}
              onMouseOut={(e) => (e.target.style.color = "#8e8e93")}
            >
              Support
            </a>
            <a
              href="#"
              style={{
                color: "#8e8e93",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1c1c1e")}
              onMouseOut={(e) => (e.target.style.color = "#8e8e93")}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: "#8e8e93",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1c1c1e")}
              onMouseOut={(e) => (e.target.style.color = "#8e8e93")}
            >
              Terms of Service
            </a>
          </div>
          <p style={{ color: "#c7c7cc", fontSize: "13px", fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} Clariti Health. All rights
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
