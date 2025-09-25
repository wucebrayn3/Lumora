import React, { useState } from "react";
import Body from "./Body";
import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from '../styles/Main.module.css'

function Main(){

    const [page, setPage] = useState("landing");

    return (

        <>
            <div className={styles.main}>
                <Navbar onNavigate={setPage} />
                <Body page={page}/>
            </div>
            <Footer />
        </>

    )

};

export default Main;