import React from "react";
import styles from '../styles/Footer.module.css'

import a from "../assets/data/images/icons/facebook.png"
import b from "../assets/data/images/icons/instagram.png"
import c from "../assets/data/images/icons/linkedin-logo.png"
import d from "../assets/data/images/icons/envelope.png"

function Footer(){

    return (

        <>
            <div className={styles.main}>
                <div className={styles.name}>
                    <h1>Lumora</h1>
                    <p>Corruption thrives in silence.</p>
                    <p>Lumora is the light. Join the movement.</p>
                    <p>Demand transparency. Rebuild trust. Shine the light of truth now.</p>
                </div>
                <div className={styles.contactcont}>
                    <h3>Contact us:</h3>
                    <div className={styles.contact}>
                        <div>
                            <img src={a} alt="" />
                            <p>Facebook</p>
                        </div>
                        <div>
                            <img src={b} alt="" />
                            <p>Instagram</p>
                        </div>
                        <div>
                            <img src={c} alt="" />
                            <p>LinkedIn</p>
                        </div>
                        <div>
                            <img src={d} alt="" />
                            <p>Gmail</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

};

export default Footer;