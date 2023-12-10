import React from 'react';
import styles from './daybar.module.css';
import TimeBar from './TimeBar';

export default function DayBar(d) {
    // console.log(d.d[0])
    // console.log(d.d[1].length)
    return (
        <div className={styles.dayFrame}>
            {d.d[1].length !== 0 ?
                <div>
                    {/* {d.d[0]} */}
                    {d.d[1].map((time, idx) => {
                        return <TimeBar key={idx} t={time} />
                    })}
                </div> :
                <div key={idx} />}
        </div>
    )
}
