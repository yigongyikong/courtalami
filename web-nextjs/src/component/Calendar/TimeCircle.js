import React from 'react';
import styles from './timecircle.module.css';

function TimeCircle() {
    return (
        <div className={styles.circle}>
            <div className={styles.inner}>내부 컨텐츠</div>
        </div>
    )
}

export default TimeCircle;