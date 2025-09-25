import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

import styles from "../styles/Map.module.css";

export default function PhilippinesMap() {
  const [level, setLevel] = useState("regions");

  const [regions, setRegions] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [municities, setMunicities] = useState(null);
  const [barangays, setBarangays] = useState(null);
  const [projects, setProjects] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMuniCity, setSelectedMuniCity] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  const [center, setCenter] = useState([122, 13]);
  const [zoom, setZoom] = useState(1);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ local toggle

  // ✅ Normalize helper
  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    Promise.all([
      fetch("/assets/data/Regions.json").then((r) => r.json()),
      fetch("/assets/data/Provinces.json").then((r) => r.json()),
      fetch("/assets/data/MuniCities.json").then((r) => r.json()),
      fetch("/assets/data/Barangays.json").then((r) => r.json()),
      fetch("/assets/data/projects.json").then((r) => r.json()),
    ]).then(([r, p, m, b, pr]) => {
      setRegions(r);
      setProvinces(p);
      setMunicities(m);
      setBarangays(b);

      // ✅ Flatten projects.json (object-of-arrays) into one array
      let allProjects = [];
      Object.entries(pr).forEach(([category, arr]) => {
        if (Array.isArray(arr)) {
          arr.forEach((proj) => {
            allProjects.push({ ...proj, category });
          });
        }
      });

      setProjects(allProjects);
      console.log("✅ Loaded all data files");
    });
  }, []);

  const handleClick = (geo) => {
    const centroid = geoCentroid(geo);

    if (level === "regions") {
      setSelectedRegion(geo.properties.REGION);
      setLevel("provinces");
      setCenter(centroid);
      setZoom(4);
    } else if (level === "provinces") {
      setSelectedProvince(geo.properties.PROVINCE || geo.properties.NAME_1);
      setLevel("municities");
      setCenter(centroid);
      setZoom(6);
    } else if (level === "municities") {
      setSelectedMuniCity(geo.properties.NAME_2);
      setLevel("barangays");
      setCenter(centroid);
      setZoom((prevZoom) => (prevZoom < 8 ? 8 : prevZoom));
    } else if (level === "barangays") {
      setSelectedBarangay(geo.properties.BARANGAY || geo.properties.NAME_3);
      setCenter(centroid);
    }
  };

  const goBack = () => {
    if (level === "barangays") {
      setLevel("municities");
      setSelectedMuniCity(null);
      setSelectedBarangay(null);
      setZoom(6);
    } else if (level === "municities") {
      setLevel("provinces");
      setSelectedProvince(null);
      setZoom(4);
    } else if (level === "provinces") {
      setLevel("regions");
      setSelectedRegion(null);
      setZoom(1);
      setCenter([122, 13]);
    }
  };

  // Filter map features
  let features = [];
  if (level === "regions" && regions) {
    features = regions.features;
  } else if (level === "provinces" && provinces) {
    features = provinces.features.filter(
      (f) => normalize(f.properties.REGION) === normalize(selectedRegion)
    );
  } else if (level === "municities" && municities) {
    features = municities.features.filter(
      (f) => normalize(f.properties.PROVINCE) === normalize(selectedProvince)
    );
  } else if (level === "barangays" && barangays) {
    features = barangays.features.filter(
      (f) => normalize(f.properties.NAME_2) === normalize(selectedMuniCity)
    );
  }

  const getStatusColor = (status) => {
    if (!status) return "lightgray";
    const s = status.toLowerCase();
    if (s.includes("completed")) return "green";
    if (s.includes("in_progress") || s.includes("progress")) return "yellow";
    if (s.includes("delayed")) return "red";
    return "lightgray";
  };

  const getProjectCoords = (project) => {
    let match = null;

    if (level === "barangays" && barangays) {
      match = barangays.features.find(
        (f) => normalize(f.properties.NAME_3) === normalize(project.barangay)
      );
      if (!match && municities) {
        match = municities.features.find(
          (f) => normalize(f.properties.NAME_2) === normalize(project.city)
        );
      }
    }

    if (!match && level === "municities" && municities) {
      match = municities.features.find(
        (f) => normalize(f.properties.NAME_2) === normalize(project.city)
      );
      if (!match && provinces) {
        match = provinces.features.find(
          (f) => normalize(f.properties.PROVINCE) === normalize(project.province)
        );
      }
    }

    if (!match && level === "provinces" && provinces) {
      match = provinces.features.find(
        (f) => normalize(f.properties.PROVINCE) === normalize(project.province)
      );
      if (!match && regions) {
        match = regions.features.find(
          (f) => normalize(f.properties.REGION) === normalize(project.region)
        );
      }
    }

    if (!match && level === "regions" && regions) {
      match = regions.features.find(
        (f) => normalize(f.properties.REGION) === normalize(project.region)
      );
    }

    return match ? geoCentroid(match) : null;
  };

  // ✅ Filter projects by category + current selection
  const visibleProjects = projects.filter((proj) => {
    if (selectedCategory && proj.category !== selectedCategory) return false;

    if (level === "regions") return true;
    if (level === "provinces")
      return normalize(proj.region) === normalize(selectedRegion);
    if (level === "municities")
      return normalize(proj.province) === normalize(selectedProvince);
    if (level === "barangays")
      return normalize(proj.city) === normalize(selectedMuniCity);
    return false;
  });

  return (
    <div className={styles.main}>

      <div className={styles.map} style={{ position: "relative" }}>
        <h2>{level.toUpperCase()}</h2>
        {level !== "regions" && (
          <button onClick={goBack} style={{ marginBottom: "10px" }}>
            ⬅ Back
          </button>
        )}

        {/* ✅ Category toggle buttons */}
        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => setSelectedCategory("Schools")}>Schools</button>
          <button onClick={() => setSelectedCategory("Roads")}>Roads</button>
          <button onClick={() => setSelectedCategory("Bridges")}>Bridges</button>
          <button onClick={() => setSelectedCategory("Flood_control")}>
            Flood Control
          </button>
          <button onClick={() => setSelectedCategory(null)}>Show All</button>
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: level === "barangays" ? 8000 : 2000,
            center: [122, 13],
          }}
          width={800}
          height={600}
        >
          <ZoomableGroup
            center={center}
            zoom={zoom}
            minZoom={1}
            maxZoom={level === "barangays" ? 100 : 10}
          >
            {features.length > 0 && (
              <Geographies geography={{ type: "FeatureCollection", features }}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(geo);
                      }}
                      tabIndex={-1}
                      style={{
                        default: {
                          fill: "#133B48",
                          stroke: "white",
                          strokeWidth: level === "barangays" ? 0.05 : 0.1,
                        },
                        hover: {
                          fill: level === "barangays" ? "orange" : "#205e72ff",
                        },
                        pressed: {
                          fill: level === "barangays" ? "orange" : "#133B48",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            )}

            {/* ✅ Category-filtered markers */}
            {visibleProjects.map((proj) => {
              const coords = getProjectCoords(proj);
              if (!coords) return null;
              return (
                <Marker
                  key={proj.id}
                  coordinates={coords}
                  onClick={() => setSelectedProject(proj)}
                >
                  <circle
                    r={4 / zoom}
                    fill={getStatusColor(proj.status)}
                    stroke="#fff"
                    strokeWidth={0.7}
                    style={{ cursor: "pointer" }}
                  />
                  <title>
                    {proj.name} ({proj.status})
                  </title>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* ✅ Project details popup */}
        {selectedProject && (
          <div
            style={{
              position: "absolute",
              right: 12,
              top: 60,
              width: 320,
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: 12,
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
              zIndex: 40,
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{ float: "right" }}
            >
              ✖
            </button>
            <h3>{selectedProject.name}</h3>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Barangay:</strong> {selectedProject.barangay}</p>
            <p><strong>City:</strong> {selectedProject.city}</p>
            <p><strong>Province:</strong> {selectedProject.province}</p>
            <p><strong>Region:</strong> {selectedProject.region}</p>
            <p><strong>Budget:</strong> ₱{selectedProject.budget.toLocaleString()}</p>
            <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
            <p><strong>Timeline:</strong> {selectedProject.timeline}</p>
          </div>
        )}
      </div>
     {selectedProject && (
  <div className={styles.details}>
    <h3>{selectedProject.name}</h3>
    <p><strong>Status:</strong> {selectedProject.status}</p>
    <p><strong>Barangay:</strong> {selectedProject.barangay}</p>
    <p><strong>City:</strong> {selectedProject.city}</p>
    <p><strong>Province:</strong> {selectedProject.province}</p>
    <p><strong>Region:</strong> {selectedProject.region}</p>
    <p><strong>Budget:</strong> ₱{selectedProject.budget.toLocaleString()}</p>
    <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
    <p><strong>Timeline:</strong> {selectedProject.timeline}</p>
  </div>
)}
    </div>
  );
}
