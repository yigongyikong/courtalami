const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const aucSaemulCourts = ["tennis1", "tennis2", "tennis3", "tennis4", "tennis5", "tennis6", "tennis7", "tennis8"];

const aucSaemulCourtPageCode = {
    "tennis1": [
        {
            "reservation": true,
            "flag": "07",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=07
    "tennis2": [
        {
            "reservation": true,
            "flag": "08",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=08
    "tennis3": [
        {
            "reservation": true,
            "flag": "09",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=09
    "tennis4": [
        {
            "reservation": true,
            "flag": "10",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=10
    "tennis5": [
        {
            "reservation": true,
            "flag": "11",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=11
    "tennis6": [
        {
            "reservation": true,
            "flag": "12",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=12
    "tennis7": [
        {
            "reservation": true,
            "flag": "13",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=13
    "tennis8": [
        {
            "reservation": true,
            "flag": "14",
            "types": "8"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=8&types=8&flag=14
}

const aucSeozoCourts = ["tennis1", "tennis2", "tennis3", "tennis4"];

const aucSeozoCourtPageCode = {
    "tennis1": [
        {
            "reservation": true,
            "flag": "04",
            "types": "9"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=12&types=9&flag=04
    "tennis2": [
        {
            "reservation": true,
            "flag": "05",
            "types": "9"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=12&types=9&flag=05
    "tennis3": [
        {
            "reservation": true,
            "flag": "06",
            "types": "9"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=12&types=9&flag=06
    "tennis4": [
        {
            "reservation": true,
            "flag": "07",
            "types": "9"
        },
    ], // https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&year=2023&month=12&types=9&flag=07
}

// const aucComnLink = 'https://www.auc.or.kr/reservation/program/rental/calendar?menuLevel=2&menuNo=371&';
const aucComnLink = 'https://www.auc.or.kr/reservation/program/rental/calendarView?menuLevel=2&menuNo=371&';
// https://www.auc.or.kr/reservation/program/rental/calendar?types=9&flag=04&year=2024&month=2&menuLevel=2&menuNo=351
/**
 * 함수 정의 : Court 정보를 제공하는 API 서버
 */
async function CourtServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.json({ message: 'Hello Courts!' });
    });


    app.get('/SaemulCourtList', async (req, res) => {
        res.status(200).json(aucSaemulCourts);
    });

    app.post('/SaemulOneCourtInfo', async (req, res) => {
        let thisYear = req.body.thisYear; // 조회 년
        let thisMonth = req.body.thisMonth; // 조회 월
        let court = req.body.court; // 조회 새물 코트

        let resultJson = await crawlingAucCourtOneInfo(thisYear, thisMonth, court, aucSaemulCourtPageCode);

        resultJson.thisYear = thisYear;
        resultJson.thisMonth = thisMonth;
        resultJson.courtName = "Saemul";
        resultJson.courtNum = court;

        res.status(200).json(resultJson);
    });

    app.post('/SaemulAllCourtInfo', async (req, res) => {
        let thisYear = req.body.thisYear; // 조회 년
        let thisMonth = req.body.thisMonth; // 조회 월

        let resultJson = await crawlingAucCourtAllInfo(thisYear, thisMonth, aucSaemulCourts, aucSaemulCourtPageCode);
        // let resultJson = await crawlingAucCourtTmpAllInfo(thisYear, thisMonth, aucSaemulCourts, aucSaemulCourtPageCode);
        // crawlingAucCourtTmpAllInfo

        resultJson.thisYear = thisYear;
        resultJson.thisMonth = thisMonth;
        resultJson.courtName = "Saemul";

        res.status(200).json(resultJson);
    });

    app.get('/SeozoCourtList', async (req, res) => {
        res.status(200).json(aucSeozoCourts);
    });

    app.post('/SeozoOneCourtInfo', async (req, res) => {
        let thisYear = req.body.thisYear; // 조회 년
        let thisMonth = req.body.thisMonth; // 조회 월
        let court = req.body.court; // 조회 새물 코트

        let resultJson = await crawlingAucCourtOneInfo(thisYear, thisMonth, court, aucSeozoCourtPageCode);

        resultJson.thisYear = thisYear;
        resultJson.thisMonth = thisMonth;
        resultJson.courtName = "Seozo";
        resultJson.courtNum = court;

        res.status(200).json(resultJson);
    });

    app.post('/SeozoAllCourtInfo', async (req, res) => {
        let thisYear = req.body.thisYear; // 조회 년
        let thisMonth = req.body.thisMonth; // 조회 월

        let resultJson = await crawlingAucCourtAllInfo(thisYear, thisMonth, aucSeozoCourts, aucSeozoCourtPageCode);

        resultJson.thisYear = thisYear;
        resultJson.thisMonth = thisMonth;
        resultJson.courtName = "Seozo";

        res.status(200).json(resultJson);
    });

    const port = process.env.PORT || 38080;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

CourtServer();


const crawlingAucCourtOneInfo = async (thisYear, thisMonth, court, aucCourtPageCode) => {

    let resultJson = {}; // 결과 값을 저장할 객체

    const resp = await axios.get(
        // `${aucComnLink + 'year=' + timeRlt.nowYear + '&month=' + timeRlt.nowMonth + '&types=' + aucSaemulCourtPageCode['tennis1'][0].types + '&flag=' + aucSaemulCourtPageCode['tennis1'][0].flag}`
        // `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucSaemulCourtPageCode[court][0].types + '&flag=' + aucSaemulCourtPageCode[court][0].flag}`
        `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucCourtPageCode[court][0].types + '&flag=' + aucCourtPageCode[court][0].flag}`
    ); // thisYear년 thisMonth월에 court page의 raw data

    const $ = cheerio.load(resp.data); // 

    const dateCalenderBd = $('tbody');
    let tbodyDataFromDateCalenderBd = [];
    dateCalenderBd.find('tr > td').each((idx, el) => {
        tbodyDataFromDateCalenderBd.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
    }).toArray();

    let dateNschedule = [];
    tbodyDataFromDateCalenderBd.map((el) => {
        if (!(el.length === 0)) dateNschedule.push(el);
    });

    // console.log(dateNschedule);
    /* dateNschedule
    [
        '1 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*]18:00~19:00 [신청] 19:00~20:00[개*]',
        '208:00~09:00 [신청]09:00~10:00 [신청] 10:00~11:00[개*] 11:00~12:00[개*]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청] 19:00~20:00[개*]',
        '308:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '408:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*]19:00~20:00 [신청]',
        '508:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '6 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*]19:00~20:00 [신청]',
        '7 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[a**e] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*] 19:00~20:00[개*]',
        '808:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '908:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '1008:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '1108:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '1208:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '13 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*] 19:00~20:00[개*]',
        '14 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*] 19:00~20:00[개*]',
        '1508:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '1608:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청] 19:00~20:00[개*]',
        '1708:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '1808:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청] 19:00~20:00[개*]',
        '1908:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청] 19:00~20:00[개*]',
        '20 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*] 19:00~20:00[개*]',
        '21 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*]19:00~20:00 [신청]',
        '2208:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '2308:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '2408:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '2508:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '2608:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청] 18:00~19:00[개*] 19:00~20:00[개*]',
        '27 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*]18:00~19:00 [신청]19:00~20:00 [신청]',
        '28 08:00~09:00[개*] 09:00~10:00[개*] 10:00~11:00[개*] 11:00~12:00[개*] 12:00~13:00[개*] 13:00~14:00[개*] 14:00~15:00[개*] 15:00~16:00[개*] 16:00~17:00[개*] 17:00~18:00[개*] 18:00~19:00[개*] 19:00~20:00[개*]',
        '2908:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '3008:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]',
        '3108:00~09:00 [신청]09:00~10:00 [신청]10:00~11:00 [신청]11:00~12:00 [신청]12:00~13:00 [신청]13:00~14:00 [신청]14:00~15:00 [신청]15:00~16:00 [신청]16:00~17:00 [신청]17:00~18:00 [신청]18:00~19:00 [신청]19:00~20:00 [신청]'
    ]*/

    resultJson.date = [];

    dateNschedule.map((el, idx) => {

        if (idx < 9) {
            resultJson.date[idx] = [el.substring(0, 1).trim(), parseToTimeStateArray(el.substring(1))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
        } else {
            resultJson.date[idx] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
        }
    });

    return resultJson;
}


const crawlingAucCourtAllInfo = async (thisYear, thisMonth, aucCourtList, aucCourtPageCode) => {
    let resultTotArray = []; // resultJson 값 전체를 저장할 배열
    let resultJson = {}; // 결과 값을 저장할 객체

    // console.log(`thisYear:${thisYear} || thisMonth:${thisMonth}`);
    // console.log(aucCourtList);
    // console.log(aucCourtPageCode);

    /*
    return aucCourtList.map( async (court, idx) => {

        // console.log(court);

        const resp = await axios.get(
            // `${aucComnLink + 'year=' + timeRlt.nowYear + '&month=' + timeRlt.nowMonth + '&types=' + aucSaemulCourtPageCode['tennis1'][0].types + '&flag=' + aucSaemulCourtPageCode['tennis1'][0].flag}`
            // `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucSaemulCourtPageCode[court][0].types + '&flag=' + aucSaemulCourtPageCode[court][0].flag}`
            `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucCourtPageCode[court][0].types + '&flag=' + aucCourtPageCode[court][0].flag}`
        ); // thisYear년 thisMonth월에 court page의 raw data
    
        const $ = cheerio.load(resp.data);
    
        const dateCalenderBd = $('tbody');
        let tbodyDataFromDateCalenderBd = [];
        dateCalenderBd.find('tr > td').each((idx, el) => {
            tbodyDataFromDateCalenderBd.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
        }).toArray();
    
        let dateNschedule = [];
        tbodyDataFromDateCalenderBd.map((el) => {
            if (!(el.length === 0)) dateNschedule.push(el);
        });
    
        resultJson.date = [];
    
        dateNschedule.map((el, idx) => {
    
            if (idx < 9) {
                resultJson.date[idx] = [el.substring(0, 1).trim(), parseToTimeStateArray(el.substring(1))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            } else {
                resultJson.date[idx] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            }
        });

        console.log(resultJson);
        resultTotArray[court] = resultJson;
        console.log(resultJson);
        return resultTotArray;    
    });
    */
    for (let i = 0; i < aucCourtList.length; i++) {

        let court = aucCourtList[i];
        console.log(court);

        const resp = await axios.get(
            // `${aucComnLink + 'year=' + timeRlt.nowYear + '&month=' + timeRlt.nowMonth + '&types=' + aucSaemulCourtPageCode['tennis1'][0].types + '&flag=' + aucSaemulCourtPageCode['tennis1'][0].flag}`
            // `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucSaemulCourtPageCode[court][0].types + '&flag=' + aucSaemulCourtPageCode[court][0].flag}`
            `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucCourtPageCode[court][0].types + '&flag=' + aucCourtPageCode[court][0].flag}`
        ); // thisYear년 thisMonth월에 court page의 raw data

        const $ = cheerio.load(resp.data);

        const dateCalenderBd = $('tbody');
        let tbodyDataFromDateCalenderBd = [];
        dateCalenderBd.find('tr > td').each((idx, el) => {
            tbodyDataFromDateCalenderBd.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
        }).toArray();

        let dateNschedule = [];
        tbodyDataFromDateCalenderBd.map((el) => {
            if (!(el.length === 0)) dateNschedule.push(el);
        });

        resultJson.date = [];

        dateNschedule.map((el, idx) => {

            if (idx < 9) {
                resultJson.date[idx] = [el.substring(0, 1).trim(), parseToTimeStateArray(el.substring(1))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            } else {
                resultJson.date[idx] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            }
        });

        // console.log(resultJson);
        // resultTotArray[court] = resultJson;
        resultTotArray.push(resultJson);
    }

    console.log(resultTotArray);
    return resultTotArray;
}

/*
const crawlingAucCourtTmpAllInfo = async (thisYear, thisMonth, aucCourtList, aucCourtPageCode) => {
    let resultTotArray = []; // resultJson 값 전체를 저장할 배열
    let resultJson = {}; // 결과 값을 저장할 객체

    const requests = aucCourtList.map( async (court, idx) => {

        // console.log(court);

        const resp = await axios.get(
            // `${aucComnLink + 'year=' + timeRlt.nowYear + '&month=' + timeRlt.nowMonth + '&types=' + aucSaemulCourtPageCode['tennis1'][0].types + '&flag=' + aucSaemulCourtPageCode['tennis1'][0].flag}`
            // `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucSaemulCourtPageCode[court][0].types + '&flag=' + aucSaemulCourtPageCode[court][0].flag}`
            `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucCourtPageCode[court][0].types + '&flag=' + aucCourtPageCode[court][0].flag}`
        ); // thisYear년 thisMonth월에 court page의 raw data
    
        const $ = cheerio.load(resp.data);
    
        const dateCalenderBd = $('tbody');
        let tbodyDataFromDateCalenderBd = [];
        dateCalenderBd.find('tr > td').each((idx, el) => {
            tbodyDataFromDateCalenderBd.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
        }).toArray();
    
        let dateNschedule = [];
        tbodyDataFromDateCalenderBd.map((el) => {
            if (!(el.length === 0)) dateNschedule.push(el);
        });
    
        resultJson.date = [];
    
        dateNschedule.map((el, idx) => {
    
            if (idx < 9) {
                resultJson.date[idx] = [el.substring(0, 1).trim(), parseToTimeStateArray(el.substring(1))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            } else {
                resultJson.date[idx] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
            }
        });

        // console.log(resultJson);
        resultTotArray[court] = resultJson;
        // console.log(resultJson);
        return resultTotArray;    
    });
    
    // for (let i = 0; i < aucCourtList.length; i++) {

    //     let court = aucCourtList[i];
    //     console.log(court);

    //     const resp = await axios.get(
    //         // `${aucComnLink + 'year=' + timeRlt.nowYear + '&month=' + timeRlt.nowMonth + '&types=' + aucSaemulCourtPageCode['tennis1'][0].types + '&flag=' + aucSaemulCourtPageCode['tennis1'][0].flag}`
    //         // `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucSaemulCourtPageCode[court][0].types + '&flag=' + aucSaemulCourtPageCode[court][0].flag}`
    //         `${aucComnLink + 'year=' + thisYear + '&month=' + thisMonth + '&types=' + aucCourtPageCode[court][0].types + '&flag=' + aucCourtPageCode[court][0].flag}`
    //     ); // thisYear년 thisMonth월에 court page의 raw data

    //     const $ = cheerio.load(resp.data);

    //     const dateCalenderBd = $('tbody');
    //     let tbodyDataFromDateCalenderBd = [];
    //     dateCalenderBd.find('tr > td').each((idx, el) => {
    //         tbodyDataFromDateCalenderBd.push(dataFiltering($(el).text().trim())); // .trim() : string의 맨 좌우 빈칸(공백)을 제거한다.
    //     }).toArray();

    //     let dateNschedule = [];
    //     tbodyDataFromDateCalenderBd.map((el) => {
    //         if (!(el.length === 0)) dateNschedule.push(el);
    //     });

    //     resultJson.date = [];

    //     dateNschedule.map((el, idx) => {

    //         if (idx < 9) {
    //             resultJson.date[idx] = [el.substring(0, 1).trim(), parseToTimeStateArray(el.substring(1))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
    //         } else {
    //             resultJson.date[idx] = [el.substring(0, 2).trim(), parseToTimeStateArray(el.substring(2))]; // .substring(#1, #2) : #1~#2번째 인덱스의 string만 추출
    //         }
    //     });

    //     // console.log(resultJson);
    //     // resultTotArray[court] = resultJson;
    //     resultTotArray.push(resultJson);
    // }



    console.log(resultTotArray);
    // return resultTotArray;
    return await Promise.all(requests);
}
*/



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

function times() {
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
    // console.log(resultJson);

    const nowMonth = nowKst.getMonth() + 1; // Get the month, from 0 to 11.
    // console.log(`nowMonth : ${nowMonth}`);
    resultJson.nowMonth = nowMonth;
    // console.log(resultJson);

    const nowDay = nowKst.getDate();
    // console.log(`nowDay : ${nowDay}`);
    resultJson.nowDay = nowDay;
    // console.log(resultJson);

    const nowHour = nowKst.getHours();
    // console.log(`nowHour : ${nowHour}`);
    resultJson.nowHour = nowHour;
    // console.log(resultJson);

    const nowMinutes = nowKst.getMinutes();
    // console.log(`nowMinutes : ${nowMinutes}`);
    resultJson.nowMinutes = nowMinutes;
    // console.log(resultJson);

    const nowSeconds = nowKst.getSeconds();
    // console.log(`nowSeconds : ${nowSeconds}`);
    resultJson.nowSeconds = nowSeconds;
    // console.log(resultJson);

    return resultJson;
}


// https://www.auc.or.kr/reservation/program/rental/calendar?menuLevel=2&menuNo=351&year=&month=&types=8&flag=07

// https://www.auc.or.kr/reservation/program/rental/create?types=8&flag=07&year=2024&month=1&schDate=20240104&startTime=0900&endTime=1000&menuLevel=2&menuNo=351
// 대관신청 페이지 - 새물코트1

// https://www.auc.or.kr/reservation/program/rental/create?types=8&flag=08&year=2024&month=1&schDate=20240104&startTime=0900&endTime=1000&menuLevel=2&menuNo=351
// 대관신청 페이지 - 새물코트2