import React from "react";
import styles from '../styles/Landing.module.css'

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
                            <img src="/assets/images/news.jfif" alt="img" />
                        </div>
                        <div className={styles.news}>
                            <img src="/assets/images/news 2.jfif" alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src="/assets/images/news 3.jfif" alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src="/assets/images/news 4.jpg" alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src="/assets/images/news 5.jpg" alt="" />
                        </div>
                        <div className={styles.news}>
                            <img src="/assets/images/news 6.jfif" alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

};

export default Landing;