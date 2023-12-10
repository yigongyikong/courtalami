import React from 'react';
import styles from './calendar.module.css';
import DayBar from './DayBar';
import CircleTable from './CircleTable';
import { AucCourtCrawler } from '@/lib/utils';
import DatesBar from './DatesBar';

export default async function Calendar() {

    const courtsInfo = {
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

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const sysNow = new Date();
    const nowUtc = sysNow.getTime() + (sysNow.getTimezoneOffset() * 60 * 1000);
    const nowKst = new Date(nowUtc + (KR_TIME_DIFF));
    const nowMonth = nowKst.getMonth() + 1; // Get the month, from 0 to 11.

    const resp = await AucCourtCrawler(nowMonth, courtsInfo.anyang_saemul[0]);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
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
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        flex: 1,
                        border: '1px #000123 solid',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 5,
                            border: '1px #000123 solid',
                        }}
                    >
                        day
                    </div>
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 95,
                            border: '1px #000123 solid',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        {courtsInfo.anyang_saemul.map((crt, idx) => {
                            return (
                                <div
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        border: '1px #000123 solid',
                                    }} key={idx}
                                >
                                    {crt}
                                </div>
                            )
                        })}
                        {/* Error: Hydration failed because the initial UI does not match what was rendered on the server.  */}
                    </div>
                </div>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        flex: 1,
                        border: '1px #000123 solid',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 5,
                            border: '1px #000123 solid',
                        }}
                    >
                        {resp.date.map((day, idx) => {
                            return (
                                day[1].length !== 0 ?
                                    <div key={idx}
                                        style={{
                                            border: '1px #000123 solid',
                                        }}
                                    >
                                        {day[0]}
                                    </div> :
                                    <div key={idx} />
                            )
                        })}
                        {/* Error: Hydration failed because the initial UI does not match what was rendered on the server.  */}
                    </div>

                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 95,
                            border: '1px #000123 solid',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        {courtsInfo.anyang_saemul.map(async (crt, idx) => {

                            const resp1 = await AucCourtCrawler(12, crt);

                            return (
                                <div
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        border: '1px #000123 solid',
                                    }} key={idx}
                                >
                                    <DatesBar d={resp1} />
                                </div>
                            )
                        })}
                    </div>
                    {/* {courtsInfo.anyang_saemul.map(async (crt) => {

                        const resp = await AucCourtCrawler(12, crt);
                        console.log(resp);
                        console.log(resp.date);
                        console.log(resp.date[0][1].length);

                        return (
                            resp.date[0][1].length !== 0 ?
                                <div>{resp.date[0]}</div> :
                                <div> - 2 - </div>
                            // <div> {crt} </div>
                        )
                    })} */}
                </div>






                {/* <div className={styles.calFrame}>
                    {resp.date.map((day, idx) => { // idx : Warning: Each child in a list should have a unique "key" prop.
                        // console.log(`\n day : ${day} \n`)
                        return <DayBar key={idx} d={day} />
                    })}
                </div> */}
            </div>
        </div>
    )
}
