export default function times() {
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