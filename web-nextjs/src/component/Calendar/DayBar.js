import React from 'react';
import styles from './daybar.module.css';
import TimeBar from './TimeBar';

export default function DayBar(d) {
    // console.log(d.d[0])
    // console.log(d.d[1])
    return (
        <div className={styles.dayFrame}>
            {d.d[0]}
            {d.d[1].map( (time) => {
                return <TimeBar t={time} />
            })}
            {/* <TimeBar /> */}
        </div>
    )
}
