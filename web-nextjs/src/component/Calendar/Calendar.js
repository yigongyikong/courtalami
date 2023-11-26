import React from 'react';
import styles from './calendar.module.css';
import DayBar from './DayBar';
import CircleTable from './CircleTable';
import { AucCourtCrawler } from '@/lib/utils';

export default async function Calendar() {

    const courtInfo = {
        "anyang_saemul": [
            "tennis1",
            "tennis2",
            "tennis3",
            "tennis4",
            "tennis5",
            "tennis6",
            "tennis7",
            "tennis8"
        ]
    }

    let thisMonthTotCourts = [];

    // courtInfo.anyang_saemul.map( async (idx) => {

    //     // console.log(`\n idx : ${idx} \n`);

    //     let thisMonthCourt = await AucCourtCrawler(11, idx);

    //     thisMonthTotCourts.push(thisMonthCourt.date);
    // } );

    // console.log(`\n thisMonthTotCourts : ${thisMonthTotCourts} \n`);


    const resp = await AucCourtCrawler(11, 'tennis1');

    // const resp = null;
    // console.log(`\n date : ${resp} \n`);
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
                    {resp.date.map((day, idx) => { // idx : Warning: Each child in a list should have a unique "key" prop.
                        // console.log(`\n day : ${day} \n`)
                        return <DayBar key={idx} d={day} />
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
                {resp.nowYear} 년 {resp.nowMonth + 1} 월
                <div className={styles.calFrame}>
                    <div>
                        <div style={{
                            backgroundColor: 'green',
                            margin: '5px',
                            height: '100px',
                            width: '80%',
                        }}>
                            <CircleTable />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
