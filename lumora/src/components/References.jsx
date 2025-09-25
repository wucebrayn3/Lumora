import styles from '../styles/References.module.css'

import a from '../assets/data/images/coa.png'
import b from '../assets/data/images/bir.png'
import c from '../assets/data/images/dotr.png'
import d from '../assets/data/images/philgeps.png'
function References(){

    return (

        <>
        
            <div className={styles.main}>
                <div className={styles.dept}>
                    <img src={a} alt="logo" />
                    <h3>COA</h3>
                </div>
                <div className={styles.dept}>
                    <img src={b} alt="logo" />
                    <h3>BIR</h3>
                </div>
                <div className={styles.dept}>
                    <img src={c} alt="logo" />
                    <h3>DPWH</h3>
                </div>
                <div className={styles.dept}>
                    <img src={d} alt="logo" />
                    <h3>DOTr</h3>
                </div>
            </div>

        </>

    )

}

export default References;