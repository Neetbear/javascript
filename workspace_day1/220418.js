alert("start javaSCript!!!");

// 변수명 이름 규칙
/*
    1. 알파벳, _, -, 숫자 (한글, 특수문자, 일본어 등등은 써도 문제는 없으나 비권장)
      1_1. 숫자가 제일 앞에 올 수 없다.
    2. camel 표기법 
      let myVeryLongLongName; -> 변수명 단어들을 대문자로 구분 / 구글 권장
      let MyVeryLongLongName; -> 파스칼 표기법 (시작부터 대문자)
    3. 대소문자를 구분한다 (대소문자가 다르면 다른 변수다)
      let myVeryLongLongName;
      let MyVeryLongLongName; 
*/

console.log(varName); // 호이스팅으로 선언된걸 찾아서 땡겨옴 할당(초기화)까지 땡겨오지는 못한다 
var varName = "test";    // 가장 오래된 버전에서 사용하는 변수 타입
console.log(varName); 

if (true) {
    var varName = "test2"; // var의 문제점 재선언 가능 (변수 중복사용)
}
console.log(varName); // 문제2 스코프 안에서 재선언해도 전역변수가 되어 버림 -> 메모리 낭비도 심함

let letName = 'lettest';
console.log(letName);

if(true){
    let letName = "lettest2"; // 문제 수정 이 letName 지역변수로 사용됨 if안에서만 유효
    console.log(letName);
}

// let letName = "lettest2"; 재사용 불가 컴파일 에러 (문법적 오류)
console.log(letName);

const constName = "consttest"; // (const 상수)에서 따옴 값이 수정될 일이 없는 변수
// 상수이기에 선언과 동시에 초기화 필요

// 게임에서 1스테이지 맵의 크기 
// 1스테이지 보스
// 같은 변경될 일 없는 경우에 사용
// 또는 document 를 변수로 선언할 때 (이미 만들어진 객체들을 변수에 할당할 때는 const 사용)
// constName = "consttest2"; // 재정의시 TypeError -> runtime 에러
console.log(constName);

// 컴파일 런타임 차이 
// 실행 주체 컴퓨터 
// 컴퓨터언어로 번역이 컴파일
// 런타임은 번역 후 실행

/* 주석 처리 */ // alt + shift + a

// 숫자형
/*
    10진수
    2진수 0b 0000 0000 로 표현 0은 숫자표현이라고 형식적인 느낌 b는 binary
    8진수 0o000
    16진수 0x00
    (255)
        2진수  (0b 1111 1111) 
            128 64 32 16  8 4 2 1
        8진수  (0o377) 
            64 8 1
        16진수 (0xff)
            16 1
    (179)
        2진수  (0b 1011 0011)
        8진수  (0o263) 
        16진수 (0xb3)
*/

let num = 255;
// toString() => 진수 변환해서 보여줌
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(16));

let randomNum = Math.random() * 10;  // 0.0 ~ 1.0 사이의 랜덤한 값 (난수) 반환
console.log(randomNum);

console.log(Math.floor(randomNum));  // 버림 
console.log(Math.ceil(randomNum));  // 올림
console.log(Math.round(randomNum));  // 반올림

/*
    실습,
    프로그램이 3 ~ 10 사이의 랜덤한 값을 지정한다.
    값을 하나 입력 받아서 정답인지 아닌지 출력해준다.
*/
// prompt("정답을 입력하세요", 10); 사용할것

let inputNum = prompt("정답을 입력하세요", "3~10");
let correctNum = Math.floor(Math.random() * 10) % 8 + 3; // 3 ~ 10

if(inputNum == correctNum) {
    alert("정답입니다");
} else {
    alert("오답입니다");
}