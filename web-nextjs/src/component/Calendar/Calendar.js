import React from 'react';
import styles from './calendar.module.css';
import DayBar from './DayBar';
import { AucCourtCrawler } from '@/lib/utils';

export default async function Calendar() {

    const resp = await AucCourtCrawler(11, 'tennis1');

    console.log(`\n date : ${resp.date} \n`);
    // console.log(`\n date[0] : ${resp.date[0]} \n`);
    // console.log(`\n date[29] : ${resp.date[29]} \n`);
    // console.log(`\n date.len : ${resp.date.length} \n`);

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
                {resp.nowYear} 년 {resp.nowMonth} 월
                <div className={styles.calFrame}>
                    {resp.date.map( (day) => {
                        // console.log(`\n day : ${day} \n`)
                        return <DayBar d={day}  />
                    })}
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
                {resp.nowYear} 년 {resp.nowMonth+1} 월
                <div className={styles.calFrame}>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
