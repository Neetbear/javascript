let ranNumCheck = true;
while(ranNumCheck){
    const randomNum = Math.floor(Math.random() * 7 + 3);
    console.log(randomNum);
    const answerNum = prompt("3~10까지 정답을 입력해주세요",3);
    console.log(answerNum);
    if(randomNum == answerNum) {
        console.log("정답입니다");
        ranNumCheck = false;
    } else {
        console.log("오답입니다");
    }
}