import styles from '../styles/References.module.css'

function References(){

    return (

        <>
        
            <div className={styles.main}>
                <div className={styles.dept}>
                    <img src="/assets/images/coa.png" alt="logo" />
                    <h3>COA</h3>
                </div>
                <div className={styles.dept}>
                    <img src="/assets/images/bir.png" alt="logo" />
                    <h3>BIR</h3>
                </div>
                <div className={styles.dept}>
                    <img src="/assets/images/dpwh.png" alt="logo" />
                    <h3>DPWH</h3>
                </div>
                <div className={styles.dept}>
                    <img src="/assets/images/dotr.png" alt="logo" />
                    <h3>DOTr</h3>
                </div>
                <div className={styles.dept}>
                    <img src="/assets/images/philgeps.png" alt="logo" />
                    <h3>PhilGEPS</h3>
                </div>
            </div>

        </>

    )

}

export default References;