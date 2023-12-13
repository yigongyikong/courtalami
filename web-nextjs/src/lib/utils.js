const axios = require('axios');
const cheerio = require('cheerio');

async function AucCourtCrawler(month, court) {
    let resultJson = {};

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const sysNow = new Date();
    // console.log(`sysNow : ${sysNow}`);
    const nowUtc = sysNow.getTime() + (sysNow.getTimezoneOffset() * 60 * 1000);
    // console.log(`nowUtc : ${nowUtc}`);

    const nowKst = new Date(nowUtc + (KR_TIME_DIFF));
    // console.log(`nowKst : ${nowKst}`);

    const nowYear = nowKst.getFullYear();
    // console.log(`nowYear : ${nowYear}`);
    resultJson.nowYear = nowYear;
    // console.log(`resultJson : ${resultJson}`);



    const nowMonth = nowKst.getMonth() + 1; // Get the month, from 0 to 11.
    // console.log(`nowMonth : ${nowMonth}`);
    resultJson.nowMonth = nowMonth;

    const nowDay = nowKst.getDate();
    // console.log(`nowDay : ${nowDay}`);

    const nowHour = nowKst.getHours();
    // console.log(`nowHour : ${nowHour}`);

    const nowMinutes = nowKst.getMinutes();
    // console.log(`nowMinutes : ${nowMinutes}`);

    const nowSeconds = nowKst.getSeconds();
    // console.log(`nowSeconds : ${nowSeconds}`);

    const courtPageCode = {
        /*
        "soccer": [
            {
                "reservation": true,
                "flag": "01"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=01
        "futsal1": [
            {
                "reservation": true,
                "flag": "02"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=02
        "futsal2": [
            {
                "reservation": true,
                "flag": "03"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=03
        "footVolley1": [
            {
                "reservation": true,
                "flag": "04"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=04
        "footVolley2": [
            {
                "reservation": false,
                "flag": "05"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=05
        "baseketball": [
            {
                "reservation": false,
                "flag": "06"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=06
        */
        "tennis1": [
            {
                "reservation": true,
                "flag": "07"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=07
        "tennis2": [
            {
                "reservation": true,
                "flag": "08"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=08
        "tennis3": [
            {
                "reservation": true,
                "flag": "09"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=09
        "tennis4": [
            {
                "reservation": true,
                "flag": "10"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=10
        "tennis5": [
            {
                "reservation": true,
                "flag": "11"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=11
        "tennis6": [
            {
                "reservation": true,
                "flag": "12"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=12
        "tennis7": [
            {
                "reservation": true,
                "flag": "13"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=13
        "tennis8": [
            {
                "reservation": true,
                "flag": "14"
            },
        ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=14
        
        /*
        "claiming": [
            {
                "reservation": false,
                "flag": "15"
            },
        ] // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=15
        */
    }

    const aucComnLink = 'https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&';

    // console.log(`url to parse : ${aucComnLink+'year='+nowYear+'&month='+nowMonth+'&types=8&flag=07'}`);
    // console.log(`url to parse : ${aucComnLink + 'year=' + nowYear + '&month=' + month + '&types=8&flag=' + courtPageCode[court][0].flag}`);
    const resp = await axios.get(
        `${aucComnLink + 'year=' + nowYear + '&month=' + month + '&types=8&flag=' + courtPageCode[court][0].flag}`
        // `${aucComnLink+'year='+nowYear+'&month='+nowMonth+'&types=8&flag=07'}`
        // 'https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=9&types=8&flag=07'
    );
    // console.log(resp.data);

    const $ = cheerio.load(resp.data);

    // const weekEls = $('thead > tr > th '); // 요일
    // let weekList = [];
    // weekEls.each((idx, el) => {
    //     weekList.push($(el).text());
    // })
    // console.log(weekList);
    /*[
        '일', '월',
        '화', '수',
        '목', '금',
        '토'
    ]*/

    // const dateEls = $('.day'); // 날짜
    // const dateList = dateEls.map((idx, el) => {
    //     let str = $(el).text();
    //     return dataFiltering(str);
    // })
    // .toArray();
    // console.log(dateList); // \n\t\t\t\t\t\t\t\t\t#(number)
    /*[
        '1',  '2',  '3',  '4',  '5',  '6',
        '7',  '8',  '9',  '10', '11', '12',
        '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24',
        '25', '26', '27', '28', '29', '30'
    ]*/

    const dateCalenderBd = $('tbody');
    let tmpList = [];
    dateCalenderBd.find('tr > td').each((idx, el) => {
        tmpList.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
    }).toArray();

    let tmpList2 = [];
    tmpList.map((el) => {
        if (!(el.length === 0)) tmpList2.push(el);
    });
    // console.log(tmpList2);

    let tmpList3 = [];
    resultJson.date = [];
    let i = 0;

    // console.log(tmpList2[26]);

    // console.log(`\n ===== start ===== \n`);
    tmpList2.map((el) => {
        tmpList3.push(el.substring(0, 2).trim()); // date
        // console.log(tmpList3);
        // console.log(`\n el : ${el} \n`);
        // resultJson.date[i] = [ el.substring(0,2).trim(), el.substring(2) ];
        // console.log(`\n ${el} \n\n\n ${el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))} \n\n`);
        // console.log(`\n ===== next ===== \n`);
        resultJson.date[i] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
        i++;
    });
    // console.log(`\n ===== end ===== \n`);
    // console.log(resultJson);
    // console.log(resultJson.date[27]);
    // console.log(resultJson.date[26]);
    // console.log(`\n ===== next ===== \n`);
    // console.log(resultJson.date[29]);
    // console.log(`\n ===== next ===== \n`);
    // console.log(resultJson.date[30]);
    return resultJson;
}

// AucCourtCrawler(9, 'tennis2');

const dataFiltering = (str) => {
    const filter1 = '\n';
    const filter2 = '\t';

    let finalData = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] == filter1
            || str[i] == filter2
        ) {
            continue;
        } else {
            finalData += str[i];
        }
    }

    return finalData;
}

const parseToTimeStateArray = (tmpStr) => {

    const str = tmpStr.replace(/ /g, ''); // .replace(/ /g, '') : 정규식을 통해 string 내부에 있는 빈칸을 제거한다.

    let timeStateTotArray = [];
    let timeStateArray = [];

    const startState = '[';
    const endState = ']';

    let idx = 0;

    // console.log(`\n[TP0]\n\n${str}\n`);

    for (let i = 0; i < str.length; i++) {
        if (str[i] == startState) {
            if (idx != 0) {
                timeStateTotArray.push(timeStateArray);
                timeStateArray = [];
            }
            timeStateArray.push(str.substring(idx, i));
            // console.log(`[TP1-0][idx:${idx}][i:${i}][timeStateArray:${timeStateArray}]\n`);
            // console.log(`[TP1-1][idx:${idx}][i:${i}][pushStr:${str.substring(idx,i)}]`);
            idx = i + 1;
            // console.log(`[TP1-2][idx:${idx}]`);
        } else if (str[i] == endState) {
            timeStateArray.push(str.substring(idx, i));
            // console.log(`[TP2-0][idx:${idx}][i:${i}][timeStateArray:${timeStateArray}]\n`);
            // console.log(`[TP2-1][idx:${idx}][i:${i}][pushStr:${str.substring(idx,i)}]`);
            idx = i + 1;
            if (idx == str.length) {
                timeStateTotArray.push(timeStateArray);
                timeStateArray = [];
            }
        }

        // console.log(`[TP3-0][idx:${idx}][i:${i}][timeStateTotArray:${timeStateTotArray}]\n`);
    }

    // console.log(timeStateTotArray);
    return timeStateTotArray;
}


async function UpdatedTime() {
    // let resultJson = {};

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const sysNow = new Date();
    // console.log(`sysNow : ${sysNow}`);
    const nowUtc = sysNow.getTime() + (sysNow.getTimezoneOffset() * 60 * 1000);
    // console.log(`nowUtc : ${nowUtc}`);

    const nowKst = new Date(nowUtc + (KR_TIME_DIFF));
    // console.log(`nowKst : ${nowKst}`);

    const nowYear = nowKst.getFullYear();
    // console.log(`nowYear : ${nowYear}`);
    // resultJson.nowYear = nowYear;
    // console.log(`resultJson : ${resultJson}`);



    const nowMonth = nowKst.getMonth() + 1; // Get the month, from 0 to 11.
    // console.log(`nowMonth : ${nowMonth}`);
    // resultJson.nowMonth = nowMonth;

    const nowDay = nowKst.getDate();
    // console.log(`nowDay : ${nowDay}`);

    const nowHour = nowKst.getHours();
    // console.log(`nowHour : ${nowHour}`);

    const nowMinutes = nowKst.getMinutes();
    // console.log(`nowMinutes : ${nowMinutes}`);

    const nowSeconds = nowKst.getSeconds();
    // console.log(`nowSeconds : ${nowSeconds}`);

    const timeResult = `최종 업데이트 시점 : ${nowYear}년 ${nowMonth}월 ${nowDay}일, ${nowHour}시 ${nowMinutes}분 ${nowSeconds}초`;

    return timeResult;
}

// UpdatedTime();

// AucCourtCrawler(11, 'tennis1')

module.exports = { AucCourtCrawler, UpdatedTime }