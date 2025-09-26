import React, { useState } from "react";
import styles from '../styles/Navbar.module.css';

function Navbar( { onNavigate } ){

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    
    return (

        <>
            <div className={styles.main}>
                <h1 onClick={()=> onNavigate('landing')}>LUMORA</h1>
                <div className={styles.buttons}>
                    <button className={styles.navbtn} onClick={()=> onNavigate('landing')}>Home</button>
                    <button className={styles.navbtn} onClick={()=> onNavigate('projects')}>Projects</button>
                    
                    <div className={styles.dropdown}>
                        <button className={styles.navbtn} onClick={toggleDropdown}>Status ▾</button>
                        {showDropdown && (
                            <div className={styles.dropdownContent}>
                            <button onClick={() => onNavigate("budgetStatus")}>
                                Budget Status
                            </button>
                            <button onClick={() => onNavigate("projectStatus")}>
                                Project Status
                            </button>
                            <button onClick={() => onNavigate("biddingStatus")}>
                                Bidding Status
                            </button>
                            </div>
                        )}
                    </div>

                    <button className={styles.navbtn} onClick={()=> onNavigate('references')}>References</button>
                </div>
            </div>
        </>

    )

};

export default Navbar;