import React from "react";
import PhilippinesMap from "./Map";

import styles from '../styles/Projects.module.css'

function Projects(){

    return (

        <>
        
            <div className={styles.main}>
                <div className={styles.map}>
                    <PhilippinesMap></PhilippinesMap>
                </div>
            </div>
        
        </>

    )

};

export default Projects;