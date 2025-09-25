import React, { useState } from "react";
import styles from '../styles/Body.module.css'

import Landing from "./Landing";
import Projects from "./Projects";
import DataVisualization from "./DataVisualization";
import ProjectStatus from "./ProjectStatus";
import Bidding from "./Bidding";
import References from "./References";

function Body( { page } ){

    const pages = {
        landing: <Landing />,
        projects: <Projects />,
        budgetStatus: <DataVisualization />,
        projectStatus: <ProjectStatus />,
        biddingStatus: <Bidding />,
        references: <References />
    }

    return (

        <>
            <div className={styles.main}>
                {pages[page]}
            </div>
        </>

    )

};

export default Body;