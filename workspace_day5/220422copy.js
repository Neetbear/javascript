/*
    call stack 쌓이는 순서대로 처리 (호출순서)
////////////////////////////////////////////////////////////
    #include <iostream>

    void testFunc1();
    void testFunc2();
    void testFunc3();

    void testFunc1() {
        std::cout << "testFunc1()" << std::endl;
        testFunc2();
    }
    void testFunc2() {
        std::cout << "testFunc2()" << std::endl;
        testFunc3();
    }
    void testFunc3() {
        std::cout << "testFunc3()" << std::endl;
    }

    int main()
    {
        std::cout << "Hello World!\n";
        testFunc1();
    }
///////////////////////////////////////////////////////////////////////
    비동기 처리 
        Promise 객체

    동기 처리 - 순차적인 호출 one by one stack
*/

// 함수 type error 주의 사항
// 자바스크립트는 앞에 내용이 뭐든간에 () 붙이면 함수로 인식하고 함수 호출을 실행함
// let a = 0;
// a(); // runtime error (type error) -> 이걸 엄격하게 만들어서 나온 언어가 타입스크립트

// 동기 처리
function testFunc1() {
    console.log("testFunc1()");

    let startTime = new Date().getTime(); // 현재시간 받기
    // while(new Date().getTime() - startTime < 5000) {
    //     // 5초 delay
    // };
    
    testFunc2();
}

function testFunc2() {
    console.log("testFunc2()");
}

testFunc1(); 

/////////////////////////////////////////////////////
// promise arrow 함수 쓰는게 관습적
// resolve, reject는 인자 같지만 위의 함수 testFunc 적어놓은 느낌으로 함수들
/*
    new Promise 호출과 동시에 비동기 처리 시작 된다
*/
const promise = new Promise((resolve, reject) => { 
// new를 통해서 메모리 할당을 하면 컨파일 중에 메모리 할당이 되는데 runtime 중에 알게 되어서 순서 밀려 버림

    /*
        시간이 오래 걸리는 실행문....
    */
    resolve(); reject(); // 함수라 호출도 가능
});

// resolve -> thens / reject -> catch 호출됨
// resolve 실행 잘됨 / reject 원하는 실행이 안됨 (그냥 error랑은 다름)
promise.then(
        () => {
            console.log("1. promise() then() called");
    }).catch(
        () => {
            console.log("2. promise() catch() called");
            // catch 발동이 안된 이유는 성공으로 resolve then이 실행되면 reject가 실행이 안되어서 
    }); // .finally(); 

// promise
// function asyncCheckAdult(age) {
//     return new Promise((resolve, reject)=>{
//         if (age >= 20) resolve(age);
//         else reject(age);
//     })
// }

// ES6부터는 async/await
async function asyncCheckAdult(age, timeout) {
    // if (age >= 20) return age;
    if (age >= 20) {
        // setTimeout(() => {
        //     return age;
        // }, timeout);
        return age;
    }
    else throw new Error(age); // reject 대신 throw
}

// // await : async함수 내에서 사용가능하다 / 함수가 종료될 때까지 기다린다. (비동기 함수의 동기처리)
// // await 붙이면 promise가 풀려서 then, catch 못쓴다
// async function testAsyncAwaitFunc(){
//     const promiseCheckAdult1 = asyncCheckAdult(10, 2000);
//     await promiseCheckAdult1.then((age) => {
//             console.log(`${age} is adult!!!`);
//         }).catch((age)=>{
//             console.log(`${age} is not adult!!!`);
//         });
//     const promiseCheckAdult2 = asyncCheckAdult(21, 2000);
//     await promiseCheckAdult2.then((age) => {
//             console.log(`${age} is adult!!!`);
//         }).catch((age)=>{
//             console.log(`${age} is not adult!!!`);
//         });
// }
// testAsyncAwaitFunc();

async function asyncTimeoutCheckAdult(age, timeout) {
    // if (age >= 20) return age;
    if (age >= 20) {
        setTimeout(() => {
            console.log(`asyncTimeoutCheckAdult(${age}, ${timeout})`);
            return age;
        }, timeout);
    }
    // else throw new Error(age); // reject 대신 throw
    else throw  new Error(age);
}

// await : async 함수가 종료될 때까지 기다린다. (비동기 함수의 동기처리)
// await 붙이면 promise가 풀려서 then, catch 못쓴다
async function testAsyncAwaitFunc(){
    await asyncTimeoutCheckAdult(100, 2000);

    const promiseCheckAdult1 = asyncCheckAdult(10);
    await promiseCheckAdult1.then((age) => {
            console.log(`${age} is adult!!!`);
        }).catch((age)=>{
            console.log(`${age} is not adult!!!`);
        });
    const promiseCheckAdult2 = asyncCheckAdult(21);
    await promiseCheckAdult2.then((age) => {
            console.log(`${age} is adult!!!`);
        }).catch((age)=>{
            console.log(`${age} is not adult!!!`);
        });
}
testAsyncAwaitFunc();

// const promiseCheckAdult1 = asyncCheckAdult(10, 2000);
// promiseCheckAdult1.then((age) => {
//         console.log(`${age} is adult!!!`);
//     }).catch((age)=>{
//         console.log(`${age} is not adult!!!`);
//     });
// const promiseCheckAdult2 = asyncCheckAdult(21, 2000);
// promiseCheckAdult2.then((age) => {
//         console.log(`${age} is adult!!!`);
//     }).catch((age)=>{
//         console.log(`${age} is not adult!!!`);
//     });
// resolve 먼저 처리 reject 후처리


// 호출은 순서대로 쌓이는것도 호출 순서대로 

///////////////////////////////////////////////////////////////////////////////
// 예제 다시 정리
// async function 안에서 setTimeout() 사용시 return이 -> promise가 아니다
// setTimeout()이 return이 되게 코드 새로 정리

function setTimeoutPromise(timeout) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
           resolve(); 
        }, timeout);
    })
};


async function timeoutCheckAdult(age, timeout) {
    console.log(`${age}. timeoutCheckAdult`);
    await setTimeoutPromise(timeout);
    console.log(`${age}. timeoutCheckAdult`);

    if(age > 20 ) return true;
    else return false;
};

async function asyncSetTimeout(timeout) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
           resolve(); 
        }, timeout);
    })
};

async function testAsyncAwaitFunc() {
    timeoutCheckAdult(10, 8000);
    timeoutCheckAdult(20, 5000);
    timeoutCheckAdult(30, 1000);

    await timeoutCheckAdult(10, 8000);
    await timeoutCheckAdult(20, 5000);
    await timeoutCheckAdult(30, 1000);

    let promises = [];

    promises.push(timeoutCheckAdult(10, 8000));
    promises.push(timeoutCheckAdult(20, 5000));
    promises.push(timeoutCheckAdult(30, 1000));
    
    let results = await Promise.all(promises);
    console.log(results);
};

testAsyncAwaitFunc();