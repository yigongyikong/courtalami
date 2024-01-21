const SheetApiClientFactory = require('./sheet_api_client_factory');
const SheetDownloader = require('./sheet_downloader');

async function main() {
    try {
        const sheetApiClient = await SheetApiClientFactory.create();
        const downloader = new SheetDownloader(sheetApiClient);

        // 코로나보드 데이터 예제
        const spreadsheetId = '1aIuTkscSBgJcWByFrqS6HmRD5NA1_wqM2D5wyHEcEbo';

        const notice = await downloader.downloadToJson(
            spreadsheetId,
            'Notice',
            'downloaded/notice.json',
        );
        console.log(notice);
        // // 국가 정보 내려받기
        // const countryInfo = await downloader.downloadToJson(
        //     spreadsheetId,
        //     'countryInfo',
        //     'downloaded/countryInfo.json',
        // );
        // console.log(countryInfo);
        // const getClassData = await downloader.downloadToJson(
        //     spreadsheetId,
        //     'ClassData',
        //     'downloaded/ClassData.json',
        // );
        // console.log(getClassData);


        // 국가 정보 내려받기
        // const ClassData = await downloader.updateValues(spreadsheetId);
        // console.log(ClassData);



    } catch (e) {
        console.error(e);
    }
}

main();