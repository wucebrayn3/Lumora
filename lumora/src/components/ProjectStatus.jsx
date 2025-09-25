import { useState, useEffect } from "react";
import styles from '../styles/ProjectStatus.module.css';

function ProjectStatus() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [projectStat, setProjectStat] = useState("");
  const [proj, setProj] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    fetch("/assets/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProj(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.subnav}>
          <div className={styles.dropdown}>
            <button onClick={toggleDropdown}>Project Type ▾</button>
            {showDropdown && (
              <div className={styles.dropdownContent}>
                <button onClick={() => { setProjectType("Flood control"); setProjectStat("Flood_control"); }}>
                  Flood control
                </button>
                <button onClick={() => { setProjectType("School"); setProjectStat("Schools"); }}>
                  School
                </button>
                <button onClick={() => { setProjectType("Road"); setProjectStat("Roads"); }}>
                  Road
                </button>
                <button onClick={() => { setProjectType("Bridge"); setProjectStat("Bridges"); }}>
                  Bridge
                </button>
              </div>
            )}
          </div>
          <h1>{projectType}</h1>
        </div>

        <div className={styles.content}>

          {/* Column 1: Region */}
          <div className={styles.region}>
            <h3>Region</h3>
            {proj && projectStat && proj[projectStat]?.map((item) => (
              <div className={styles.data} key={`region-${item.id}`}>{item.region}</div>
            ))}
          </div>

          {/* Column 2: City */}
          <div className={styles.city}>
            <h3>City</h3>
            {proj && projectStat && proj[projectStat]?.map((item) => (
              <div className={styles.data} key={`city-${item.id}`}>{item.city}</div>
            ))}
          </div>

          {/* Column 3: Percentage */}
          <div className={styles.percentage}>
            <h3>Percentage</h3>
            {proj && projectStat && proj[projectStat]?.map((item) => (
              <div className={styles.data} key={`pct-${item.id}`}>{item.statPct}%</div>
            ))}
          </div>

          {/* Column 4: Real Progress Bar */}
          <div className={styles.progressbar}>
            <h3>Progress</h3>
            {proj && projectStat && proj[projectStat]?.map((item) => (
              <div>
                <progress
                key={`progress-${item.id}`}
                value={item.statPct}
                max="100"
                className={styles.progress}
              />
              </div>
            ))}
          </div>

          {/* Column 5: Deadline */}
          <div className={styles.deadline}>
            <h3>Deadline</h3>
            {proj && projectStat && proj[projectStat]?.map((item) => (
              <div key={`deadline-${item.id}`}>{item.deadline}</div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ProjectStatus;
