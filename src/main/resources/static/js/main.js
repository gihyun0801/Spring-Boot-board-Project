//쿠키에서 key 가 일치하는 value 얻어오기 함수

//쿠키는 "K=V" , K=V; K=V ... 형식

// 배열.map(함수) : 배열의 각 요소를 이용해 함수 수행 후 
//                  결과 값으로 새로운 배열을 만들어서 반환

const getCookie = (key) => {
   const cookies = document.cookie; // "k=v"

   console.log(cookies);


  const cookieList = cookies.split("; ")// ["k=v", "k=v"]
       .map( el => el.split("=") );
    //   console.log(cookieList);
      // 배열 -> 객체로 변환 (그래야 다루기 쉽다)

      console.log(cookieList);

      const obj = {};

      for(let i = 0; i < cookieList.length; i++){
        const k = cookieList[i][0]; //key 값
        const v = cookieList[i][1]; //value값

        obj[k] = v;
      }

      console.log(obj);


  return obj[key]; //매개변수로 전달 받은 key와 
                // obj 객체에 저장된 키가 일치하는 요소의 value 값 반환

};


const loginEmail = document.querySelector("#loginForm input[name='memberEmail']");

// 로그인 안된 상태인 경우에 수행

if(loginEmail != null){ // 로그인창의 이메일 입력부분이 화면에 있을 때
  
  // 쿠키 중 key 값이 "saveId" 인 요소의 value 값 얻어오기
  const saveId = getCookie("saveId"); //undefined 또는 이메일 

  if(saveId != undefined){
        loginEmail.value = saveId; //쿠키에서 얻어온 값을 input에 value로 세팅
 
         //아이디 저장 체크박스에 체크해두기
        document.querySelector("input[name='saveId']").checked = true;
  }

};


// 이메일 , 비밀번호 미작성 시 로그인 막기
const loginForm = document.querySelector("#loginForm");

const loginPw = document.querySelector("#loginForm input[name='memberPw']");

// # loginForm이 화면에 존재할 때 (== 로그인 상태 아닐 때)

if(loginForm != null){

   // 제출 이벤트 발생 시

   loginForm.addEventListener("submit", e => {
        if(loginEmail.value.trim().length == 0){
            alert("이메일을 작성해주세요..!");
            e.preventDefault(); //기본 이벤트 제출 막기
            loginEmail.focus();
            return;
        }

        if(loginPw.value.trim().length == 0){
            alert("비밀번호를 작성해주세요..!");
            e.preventDefault(); //기본 이벤트 제출 막기
            loginPw.focus();
            return;
        }



   })

   

}