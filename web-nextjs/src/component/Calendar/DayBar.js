import React from 'react';
import styles from './daybar.module.css';
import TimeBar from './TimeBar';

export default function DayBar() {
    return (
        <div className={styles.dayFrame}>
            DayBar
            <TimeBar />
        </div>
    )
}
