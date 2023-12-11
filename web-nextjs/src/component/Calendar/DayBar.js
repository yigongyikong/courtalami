import React from 'react';
import styles from './daybar.module.css';
import TimeBar from './TimeBar';

export default function DayBar(d) {
    return (
        <div className={styles.dayFrame}>
            {d.d[1].length !== 0 ?
                <div className={styles.timeGrid}>
                    {d.d[1].map((time, idx) => {
                        return <TimeBar key={idx} t={time} />
                    })}
                </div> :
                <div key={idx} />}
        </div>
    )
}
