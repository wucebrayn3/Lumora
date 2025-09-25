import React from "react";
import styles from '../styles/Landing.module.css'
import a from '../assets/data/images/news.jfif'
import b from '../assets/data/images/news 2.jfif'
import c from '../assets/data/images/news 3.jfif'
import d from '../assets/data/images/news 4.jpg'
import e from '../assets/data/images/news 5.jpg'
import f from '../assets/data/images/news 6.jfif'

function Landing(){

    return (

        <>
        
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.motto}>"<span style={{color:"red"}}>Corruption</span> thrives in <span style={{color:"gray"}}>silence</span>. Lumora is the light.</h1>
                    <h1 className={styles.motto}>Join the movement. Demand transparency.</h1>
                    <h1 className={styles.motto}>Rebuild trust. Shine the light of truth now."</h1>
                </div>
                <div className={styles.news_article}>
                    <h1>News and Articles</h1>
                    <div className={styles.news_container}>
                        <div className={styles.news}>
                            <img src={a} alt="img" />
                        </div>
                        <div className={styles.news}>
                            <img src={b} alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src={c} alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src={d} alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src={e} alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src={f} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

};

export default Landing;