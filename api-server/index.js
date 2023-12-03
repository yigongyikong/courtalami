const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');

const globalStatController = require('./controller/global-stat.controller');
const keyValueController = require('./controller/key-value.controller');

async function lauchServer() {
    const app = express(); // express 인스턴스 생성

    // Content-Type이 application/json인 HTTP 요청의 바디를 파싱할 수 있도록 설정
    app.use(bodyParser.json());
    
    // '/' 경로로 GET 요청이 오면 두번째 인수로 등록된 콜백 함수를 실행하라는 의미입니다.
    // req 객체와 res 객체는 익스프레스 프레임워크가 넣어서 전달해주게 됩니다.
    // req 객체는 수신된 HTTP 요청에 대한 모든 정보를 담고 있으며, res 객체는 클라이언트에 돌려줄 HTTP 응답을 만들 때 사용합니다.
    app.get('/', (req, res) => {
        res.json({ message: 'Hello CourtAlami!' });
    });

    app.get('/global-stats/:cc', (req, res) => {
        const cc = req.params.cc;
        res.json({ message: `Hello ${cc}!` });
    });

    app.get('/global-stats', globalStatController.getAll );
    app.post('/global-stats', globalStatController.insertOrUpdate );
    app.delete('/global-stats', globalStatController.remove );

    // app.get('/key-value/', keyValueController.getAll);
    app.get('/key-value/:key', keyValueController.get);
    app.post('/key-value', keyValueController.insertOrUpdate);
    app.delete('/key-value/:key', keyValueController.remove);

    try {
        await sequelize.sync(); // sequelize에 정의된 객체 모델을 기준으로 실제 데이터베이스와 동기화를 수행해 테이블 스키마를 생성 또는 변경하는 역할을 합니다.
        // sequelize.sync({ force: true }); // 동기화하려는 테이블이 존재하면 삭제해버리고 테이블을 새로 생성합니다. 예를 들어 개발 서버에서 기존에 저장된 데이터가 삭제되거나 테이블 스키마가 완전히 바뀌어도 문제없이 사용할 수 있습니다.
        // sequelize.sync({ alter: true }); // 동기화하려는 테이블의 필드와 자료형을 확인해 객체 모델 정의와 다르다면 닽아지도록 적절히 변경합니다.
        console.log('Database is ready!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }
    
    const port = process.env.PORT || 9090; // port default : 9090
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}

lauchServer(); // 서버를 초기화하고 시작하는 코드를 launchServer()라는 비동기 함수로 감쌓고, 내부에 sequelize.sync()를 실행하는 코드를 추가했다.