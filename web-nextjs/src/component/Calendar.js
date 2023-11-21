import React from 'react';
import styles from './calendar.module.css';

export default function Calendar() {
  return (
    <div>
        <div
            style={{
                backgroundColor: 'aqua'
            }}
        >
            ThisMonth
            <div className={styles.calFrame}>
                <div></div>
            </div>
        </div>
        <div
            style={{
                backgroundColor: '#086542'
            }}
        >
            NextMonth
        </div>
    </div>
  )
}
