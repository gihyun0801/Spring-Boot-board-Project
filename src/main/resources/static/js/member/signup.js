// **** 회원 가입 유효성 검사 *****


// 필수 입력 항목의 유효성 검사 여부를 체크하기 위한 객체




const checkObj = {

         "memberEmail" : false,
         "memberPw" : false,
         "memberPwConfirm" : false,
         "memberNickname" : false,
         "memberTel" : false,
         "authKey" : false


};

// -----------------------------------------------------------------------


/* 이메일 유효성 검사 */


const memberEmail = document.querySelector("#memberEmail");
const emailMessage = document.querySelector("#emailMessage");

// 이메일이 입력 될 때 마다 유효성 검사 수행
memberEmail.addEventListener("keyup", function(e){
     
    // 이메일 인증 후 이메일이 변경된 경우

    checkObj.authKey = false;
    document.querySelector("#authKeyMessage").innerText = "";

    // 나중에 처리

    // 작성된 이메일 값 얻어오기

    const inputEmail = e.target.value;

    console.log(inputEmail); // 지금 입력하고있는값

    // 3) 입력된 이메일이 없을 경우 

    if(inputEmail.trim().length == 0){
       emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요";

       // 메시지에 색상을 추가하는 클래스 모두 제거

       emailMessage.classList.remove("confirm", "error");
       // 두 가지 클래스를 지워라

       // 이메일 유효성 검사 여부를 false 로 변경

       checkObj.memberEmail = false;

       // 잘못 입력한 띄어쓰기가 있을 경우 없앰
       memberEmail.value = "";

       return;
      };


      // 4) 입력된 이메일이 있을 경우 정규식 검사

      const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

       // 입력 받은 이메일이 정규식과 일치하지 않는 경우

       // (알맞은 이메일 형태가 아닌 경우)

       if(!regExp.test(inputEmail)){
            emailMessage.innerText = "알맞은 이메일 형식으로 작성해주세요.";
            emailMessage.classList.add("error");
            emailMessage.classList.remove("confirm");
            checkObj.memberEmail = false;
            return;
       };

       //5) 유효한 이메일 형식일 경우 중복 검사 수행

       // 비동기(ajax)

       fetch("/member/checkEmail?memberEmail=" + inputEmail).then(response => {
                    return response.text();
       }).then(result => {
    

           if(result > 0){
            emailMessage.innerText = "중복된 이메일이 있습니다";
            emailMessage.classList.add("error");
            emailMessage.classList.remove("confirm");
            checkObj.emailMessage = false;
            return;
           }

           // 중복 x

           emailMessage.innerText = "사용 가능한 이메일 입니다";
           emailMessage.classList.add("confirm");
           emailMessage.classList.remove("error");
           checkObj.memberEmail = true;
         
       }).catch(error => {
        // fetch() 수행 중 예외 발생 처리
              console.log(error);
       });

       

       
});

// 이메일 인증


// 인증번호 받기 버튼
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn");

// 인증번호 입력 input
const authKey = document.querySelector("#authKey");

//인증번호 입력 후 확인 버튼
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");

// 인증번호 관련 메시지 출력 span
const authKeyMessage = document.querySelector("#authKeyMessage");


let authTimer; // 타이머 역할을 할 setInterval 함수

const initMin = 4; // 타이머 초기값 (분)
const initSec = 59; // 타이머 초기값 (초)
const initTime = "05:00"; 

//실제 줄어드는 시간을 저장할 변수

let min = initMin;
let sec = initSec;

// 인증번호 받기 버튼 클릭 시 

sendAuthKeyBtn.addEventListener("click", function(e){
    // 인증번호 입력할 input
  
     
    checkObj.authKey = false;
    authKeyMessage.innerText = "";

    if(!checkObj.memberEmail){
        alert("유효한 이메일 작성 후 클릭해 주세요");
        return;
    }

    //클릭 시 타이머 숫자 초기화
    
    min = initMin;
    sec = initSec;

    // 이전 동작중인 인터벌 클리어
    clearInterval(authTimer);
//******************************************* */
// 비동기로 서버에서 메일보내기

fetch("/email/signup", {method : "POST", headers : {"Content-Type" : "application/json"}, body : memberEmail.value    }  ).then(response => {

}).then(result => {

});



//메일은 비동기로 서버에서 보내라고 하고
//화면에서는 타이머 측정하기

authKeyMessage.innerText = initTime;
authKeyMessage.classList.remove("confirm", "error");

alert("인증번호가 발송되었습니다");

// setInterval(함수, 지연시간)
/// - 지연시간 만큼 시간이 지날 때 마다 함수 실행

// clearInterval()
//매개변수로 전달받은 interval 멈춤

authTimer = setInterval(function(){

    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;

    // 0분 0초 인 경우 ("00:00" 출력 후)

    if(min == 0 && sec == 0){
            checkObj.authKey = false; //인증 못했음
            clearInterval(authTimer);
            authKeyMessage.classList.add("error");
            authKeyMessage.classList.remove("confirm");
            return;
    };


    // 초가 0 인 경우

    if(sec == 0){
        sec = 60;
        min--;
    };

    sec--; // 1초 감소

}, 1000);

});

// 전달받은 숫자가 10 미만인 경우(한자리) 앞에 0 붙혀서 반환

function addZero(number){
   
    if(number < 10){
            return "0" + number;    
        }else{
            return number;
        }

};

















































































































