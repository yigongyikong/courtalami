const { GlobalStat } = require('../database'); // GlobalStat 객체 가져오기
const { wrapWithErrorHandler } = require('../util');

// 데이터 조회
async function getAll(req, res) {
    const result = await GlobalStat.findAll(); // 아무런 필터링 조건없이 모든 데이터를 가져옵니다.
    res.status(200).json({ result });
}

// 데이터 삽입 또는 업데이트
async function insertOrUpdate(req, res) {
    try {
        const { cc, date } = req.body;
        if (!cc || !date) {
            res.status(400).json({ error: 'cc and date are required' });
            return;
        }

        // 조건(국가 코드와 날짜)에 맞는 데이터 갯수 확인
        const count = await GlobalStat.count({ where: { cc, date } }); // 조건에 맞는 데이터가 있는지 확인합니다.

        if (count === 0) {
            await GlobalStat.create(req.body); // INSERT 구문에 해당
        } else {
            await GlobalStat.update(req.body, { where: { cc, date } }); // UPDATE 구문에 해당
        }

        res.status(200).json({ result: 'success' });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

// 데이터 삭제
async function remove(req, res) {
    const { cc, date } = req.body;
    if (!cc || !date) {
        res.status(400).json({ error: 'cc and date are required' });
        return;
    }

    await GlobalStat.destroy({ // DELETE 구문에 해당, 조건을 명시하지 않으면 모든 데이터가 삭제되니 주의
        where: {
            cc,
            date,
        },
    });

    res.status(200).json({ result: 'success' });
}

// 외부로 전달되던 컨트롤러의 각 함수들이 앞서 만들어둔 errorHandler로 한 번 감싸져 외부로 전달됩니다.
module.exports = wrapWithErrorHandler({
    getAll,
    insertOrUpdate,
    remove,
});