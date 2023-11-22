import React from 'react';
import styles from './calendar.module.css';
import DayBar from './DayBar';

export default function Calendar() {
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'beige',
                border: '10px white solid',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    border: '1px #000123 solid',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                ThisMonth
                <div className={styles.calFrame}>
                    <DayBar />
                    <DayBar />
                    <DayBar />
                </div>
            </div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    border: '1px #123000 solid',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                NextMonth
                <div className={styles.calFrame}>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
