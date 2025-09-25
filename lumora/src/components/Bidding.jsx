import React, { useState, useEffect, useRef } from "react";

import styles from '../styles/Bidding.module.css'

import regionsData from "../assets/data/Regions.json";
import provincesData from "../assets/data/Provinces.json";
import municitiesData from "../assets/data/MuniCities.json";
import projectsData from "../assets/data/projects.json";

const normalize = (s) =>
  (s || "").toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

export default function RegionProjectDropdown() {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [municities, setMunicities] = useState([]);
  const [projects, setProjects] = useState([]);

  const [open, setOpen] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  const [cityProjects, setCityProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const dropdownRef = useRef(null);

  // Load projects
  useEffect(() => {
    const combined = [
        ...(projectsData.Schools || []),
        ...(projectsData.Flood_control || []),
        ...(projectsData.Roads || []),
        ...(projectsData.Bridges || []),
    ];
    setProjects(combined);
    }, []);

    // Load region/province/city data directly
    useEffect(() => {
    setRegions(regionsData.features || []);
    setProvinces(provincesData.features || []);
    setMunicities(municitiesData.features || []);
    }, []);

  // Load region/province/city data
  useEffect(() => {
    Promise.all([
      fetch("/assets/data/Regions.json").then((r) => r.json()),
      fetch("/assets/data/Provinces.json").then((r) => r.json()),
      fetch("/assets/data/MuniCities.json").then((r) => r.json()),
    ]).then(([r, p, m]) => {
      setRegions(r.features || []);
      setProvinces(p.features || []);
      setMunicities(m.features || []);
    });
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setHoveredRegion(null);
        setHoveredProvince(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProvincesForRegion = (region) =>
    provinces.filter((p) => normalize(p.properties.REGION) === normalize(region));

  const getCitiesForProvince = (province) =>
    municities.filter((c) => normalize(c.properties.PROVINCE) === normalize(province));

  const handleCityClick = (cityNameRaw) => {
    const cityName = cityNameRaw.trim();
    const filtered = projects.filter((p) => normalize(p.city) === normalize(cityName));
    console.log("Clicked city:", cityName);
    console.log("Projects found:", filtered);

    setCityProjects(filtered.length > 0 ? filtered : []);
    setSelectedProject(null);

    // Close all dropdowns
    setOpen(false);
    setHoveredRegion(null);
    setHoveredProvince(null);
  };

  return (
    <div style={{ padding: "20px" }} className={styles.main}>
      {/* Dropdown */}
      <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            padding: "8px 12px",
            background: "#133B48",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {open ? "Close" : "Select Region"}
        </button>

        {open && (
          <>
            {/* Regions */}
            <div
              style={{
                position: "absolute",
                background: "#f9f9f9",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                minWidth: "220px",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {regions.map((r) => {
                const regionName = r.properties.REGION;
                return (
                  <div
                    key={regionName}
                    onMouseEnter={() => {
                      setHoveredRegion(regionName);
                      setHoveredProvince(null);
                    }}
                    style={{
                      padding: "6px 10px",
                      cursor: "pointer",
                      background: hoveredRegion === regionName ? "#eee" : "transparent",
                    }}
                  >
                    {regionName}
                  </div>
                );
              })}
            </div>

            {/* Provinces */}
            {hoveredRegion && (
              <div
                style={{
                  position: "absolute",
                  left: "220px",
                  top: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  minWidth: "200px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  zIndex: 11,
                }}
              >
                {getProvincesForRegion(hoveredRegion).map((p) => {
                  const provName = p.properties.PROVINCE || p.properties.NAME_1;
                  return (
                    <div
                      key={provName}
                      onMouseEnter={() => setHoveredProvince(provName)}
                      style={{
                        padding: "6px 10px",
                        cursor: "pointer",
                        background: hoveredProvince === provName ? "#eee" : "transparent",
                      }}
                    >
                      {provName}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Cities */}
            {hoveredProvince && (
              <div
                style={{
                  position: "absolute",
                  left: "420px",
                  top: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  minWidth: "200px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  zIndex: 12,
                }}
              >
                {getCitiesForProvince(hoveredProvince).map((c) => (
                  <div
                    key={c.properties.NAME_2}
                    style={{ padding: "6px 10px", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCityClick(c.properties.NAME_2);
                    }}
                  >
                    {c.properties.NAME_2}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Projects List */}
      {cityProjects.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Projects in selected city:</h3>
          <ul>
            {cityProjects.map((p) => (
              <li
                key={p.id}
                style={{ cursor: "pointer", marginBottom: "6px" }}
                onClick={() => setSelectedProject(p)}
              >
                {p.name} ({p.category})
              </li>
            ))}
          </ul>
        </div>
      ) : cityProjects.length === 0 && selectedProject === null ? (
        <p style={{ marginTop: "20px" }}>No projects found in this city.</p>
      ) : null}

      {/* Selected Project Details */}
      {selectedProject && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{selectedProject.name}</h3>
          <p><strong>Category:</strong> {selectedProject.category || "N/A"}</p>
          <p><strong>Region:</strong> {selectedProject.region}</p>
          <p><strong>Province:</strong> {selectedProject.province}</p>
          <p><strong>City:</strong> {selectedProject.city}</p>
          <p><strong>Barangay:</strong> {selectedProject.barangay}</p>
          <p><strong>Status:</strong> {selectedProject.status}</p>
          <p><strong>Completion %:</strong> {selectedProject.statPct}%</p>
          <p><strong>Budget:</strong> ₱{selectedProject.budget.toLocaleString()}</p>
          <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
          <p><strong>Timeline:</strong> {selectedProject.timeline}</p>
          <p><strong>Deadline:</strong> {selectedProject.deadline}</p>

          {/* Bidding Info */}
          {selectedProject.bidding_info && selectedProject.bidding_info.length > 0 && (
            <div style={{ marginTop: "10px" }}>
                <h4>Bidding Information:</h4>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>Bidder</th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>Bid Price</th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>Allocation</th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProject.bidding_info
                    .slice() // copy to avoid mutating state
                    .sort((a, b) => a.bid_price - b.bid_price)
                    .map((b, index) => (
                        <tr key={index}>
                        <td style={{ border: "1px solid #ccc", padding: "4px" }}>{b.bidder}</td>
                        <td style={{ border: "1px solid #ccc", padding: "4px" }}>₱{b.bid_price.toLocaleString()}</td>
                        <td style={{ border: "1px solid #ccc", padding: "4px" }}>₱{b.allocation.toLocaleString()}</td>
                        <td style={{ border: "1px solid #ccc", padding: "4px" }}>₱{b.Earnings.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
      )}
    </div>
  );
}
