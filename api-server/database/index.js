const Sequelize = require('sequelize');

// 데이터베이스 연결 정보 설정
const config = {
    host: process.env.CORONABOARD_MYSQL_HOST || '127.0.0.1', // host 주소로 환경 변수에 지정된 값을 불러오거나, 없다면 127.0.0.1을 할당한다.
    port: 3306, // MySQL 서버는 기본값으로 3306번 포트를 사용하며, database, user, password 항목은 설정 값을 그대로 입력한다.
    database: 'coronaboard',
    user: 'sbj_admin',
    password: process.env.CORONABOARD_MYSQL_PASSWORD || 'sbji12#$'
};

// 데이터베이스 연결 정보를 입력해 시퀄라이즈 인스턴스 생성 : 앞에서 준비한 설정값들을 이용해 시퀄라이즈 인스턴스를 생성한다.
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
});

// 외부 모듈에서 사용할 수 있도록 내보내기 : 방금 생성한 인스턴스를 다른 모듈에서 사용할 수 있도록 익스포트합니다.
module.exports = {
    sequelize,
    // 데이터베이스 연결이 완료된 객체 모델 생성
    GlobalStat: require('./global-stat.model')(sequelize),
    // 또 다른 객체 모델이 필요하면 똑같은 방식으로 아래 줄에 추가 : sequelize 인스턴스를 입력으로 건네 global-stat.model.js 파일에서 익스포트한 화살표 함수를 호출하는 코드이다.
    GlobalStat: require('./key-value.model')(sequelize),
}