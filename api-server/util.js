// 기존 함수들의 내용을 수정하지 않으면서도 예외 처리 코드를 공통으로 한 번만 작성할 수 있도록 일반화하는 방법이 있다.
// 모든 컨트롤러 함수를 공통 예외 처리 핸들러로 감싸주는 방법입니다.

// block() 함수를 인수로 받은 errorHandler() 함수를 만들고, 해당 함수가 try-catch 구문이 포함된 함수르 반환합니다.
// 인수로 받은 block() 함수는 try 구문 내에서 실행됩니다.
// 컨트롤러에 정의된 getAll(), insertOrUpdate(), remove() 같은 함수들이 errorHandler() 함수의 인수인 block() 함수에 대입되어 사용된다고 생각하면 됩니다.
// =>를 연달아 사용했는데, 함수를 수행하고 난 반환값이 함수라고 생각하거나 혹은 원래 실행할 함수를 한 번 감싸서 다른 기능을 추가한 함수를 만든다고 생각하면 이해가 쉽습니다.
const errorHandler = (block) => async (req, res) => {
    try {
        await block(req, res); 
    } catch (e) {
        // 예외가 발생하면 HTTP 상태 코드를 500으로 지정하고 예외에 포함된 오류 메시지를 error 필드에 담아서 응답으로 내려주겠습니다.
        res.status(500).json({ error: e.toString() });
    }
}

// Object.keys() 함수는 해당 객체가 가진 모든 키(key)를 배열로 반환하는 함수입니다.
// forEach() 함수를 이용하여 순회하면서 전달받은 obj 객체에 들어 있는 기존 함수들을 errorHandler로 한 번 감싸주게 됩니다.
const wrapWithErrorHandler = (obj) => {
    Object.keys(obj).forEach((key) => {
        obj[key] = errorHandler(obj[key]);
    });
    return obj;
};

module.exports = {
    wrapWithErrorHandler,
};