
function setTimeoutPromise(timeout) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("setTimeoutPromise");
            resolve(); 
        }, timeout);
    })
};

async function asyncSetTimeout(timeout) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("asyncSetTimeout");
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

function testPromise(timeout) {
    return new Promise((resolve, reject)=>{
        console.log(`setTimeoutPromise ${timeout}`);
        resolve(); 
    })
};

async function testAsyncAwaitFunc() {
    // timeoutCheckAdult(10, 8000);
    // timeoutCheckAdult(20, 5000);
    // timeoutCheckAdult(30, 1000);


    // await timeoutCheckAdult(10, 8000);
    // await timeoutCheckAdult(20, 5000);
    // await timeoutCheckAdult(30, 1000);

    // let promises = [];

    // promises.push(timeoutCheckAdult(10, 8000));
    // promises.push(timeoutCheckAdult(20, 5000));
    // promises.push(timeoutCheckAdult(30, 1000));
    
    // let results = await Promise.all(promises);
    // console.log(results);

    // asyncSetTimeout(2000);
    // await setTimeoutPromise(1000);
    
    await setTimeout(() => {testPromise(2)}, 1000)
    testPromise(1);
};

testAsyncAwaitFunc();