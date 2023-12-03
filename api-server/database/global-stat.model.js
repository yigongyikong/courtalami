// public define(modelName: string, attributes: object, options: object) : Model
// moduleName : 객체 모델 이름
// attributes : 객체 모델의 속성 목록(속성 하나가 데이터베이스 테이블의 컬럼 하나에 대응)
// options : (선택 사항) 인덱스 등 추가 옵션

const { DataTypes } = require('sequelize'); // 시퀄라이즈 모듈 불러오기 : package.json의 의존성 목록에 추가되어 [node_modules] 디렉터리에 설치된 패키지들은 경로 지정 없이 패키지 디렉터리의 이름을 적어주면 됩니다.

module.exports = (sequelize) => { // 객체 모델 내보내기 : module.exports 구문을 활용해 화살표 함수를 외부로 노출시키는 코드입니다.
    // (param1, param2, ... , paramN) => {statements} | 입력 매개변수 목록는 sequelize => 함수 바디는 return sequelize.define(...);
    return sequelize.define( // 객체 모델 정의 : sequelize.define() 메서드로 객체 모델을 정의합니다.
        'GlobalStat', // 매개변수 1: 모델 이름, 참고로 시퀄라이즈에 정의된 객체 모델들은 sequelize.models.GlobalStat처럼 모델 이름을 이용해 언제든지 가져올 수 있습니다.
        {   // 매개변수 2: 속성 목록, 데이터베이스 테이블의 컬럼에 매핑됩니다.
            id: { // (3) ID
                autoIncrement: true, // 값 자동 증가
                type: DataTypes.INTEGER.UNSIGNED, // 부호 없는 정수(양의 정수)
                allowNull: false,   // 빈 값 허용 X
                primaryKey: true,   // 기본키로 지정
            },
            cc: { // 국가 코드(cc는 country code의 약자)
                type: DataTypes.CHAR(2),
                allowNull: false,
            },
            date: { // 날짜
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            confirmed: { // 확진자 수
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            death: { // 사망자 수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            released: { // 완치자 수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            tested: { // 총 검사자 수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            testing: { // 검사중 수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            negative: { // 결과 음성 수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {   // 매개변수 3: 추가 옵션
            sequelize, // 시퀄라이즈 인스턴스
            tableName: 'GlobalStat', // 데이터베이스에서 테이블 이름
            timestamps: false, // 타임스탬프 속성 자동 생성 X
            indexes: [ // 테이블 인덱스
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'ccWithDate',
                    unique: true,
                    fields: [{ name: 'cc' }, { name: 'date' }],
                },
            ],
        },
    );
};