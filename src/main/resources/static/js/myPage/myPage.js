const updateInfo = document.querySelector("#updateInfo"); // form 태그

//#updateInfo 요소가 존재 할 때만 수행




if(updateInfo != null){
    updateInfo.addEventListener("submit", function(e){

            const memberNickname = document.querySelector("#memberNickname");
            const memberTel = document.querySelector("#memberTel");
            const memberAddress = document.querySelectorAll("[name='memberAddress']");


            // 닉네임 유효성 검사
            if(memberNickname.value.trim().length == 0){
                alert("닉네임을 입력해주세요");
                e.preventDefault();
                return;
            };

            let regExp = /^[가-힣\w\d]{2,10}$/;

            if(!regExp.test(memberNickname.value)){
                    alert("닉네임이 유효하지 않습니다");
                    return;
            }


            // 닉네임 중복검사는 개별적으로
            //테스트 시 닉네임 중복 안되게 조심하세요\
            //*************
            
            // 전화번호 유효성 검사

            if(memberTel.value.trim().length == 0){
                alert("전화번호를 입력해주세요");
                e.preventDefault();
                return;
            }
     

        regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

        if(!regExp.test(memberTel.value)){
            alert("전화번호가 유효하지 않습니다");
            e.preventDefault();
            return;
        }

        fetch("/json/membmerdsadsad?" + membeNo, {method : "POST", headers : {"Content-type" : "application/json",}, body : JSON(sasafsafsaf)} )


        //주소 유효성 검사
        // 입력을 안하면 전부 안해야되고
        // 입력하면 전부 해야된다

        const addr0 = memberAddress[0].value.trim().length == 0;
        const addr1 = memberAddress[1].value.trim().length == 0;
        const addr2 = memberAddress[2].value.trim().length == 0;

        //모두 true 인 경우만 true 지정
        const result1 = addr0 && addr1 && addr2; // 아무것도 입력 x

        //모두 false 인 경우만 true 지정
        const result2 = !(addr0 || addr1 || addr2);

        // 모두 입력 또는 모두 미입력이 아니면 
        if(!(result1 || result2)){
            alert("주소를 모두 작성 또는 미작성 해주세요");
            e.preventDefault();
            return;
        }


    })
}

// -------------------------------------------------------

/* 비밀번호 수정*/

// 비밀번호 변경 form 태그

const changePw = document.querySelector("#changePw");

if(changePw != null){
    changePw.addEventListener("submit", function(e){

        const currentPw = document.querySelector("#currentPw");
        const newPw = document.querySelector("#newPw");
        const newPwConfirm = document.querySelector("#newPwConfirm");

        // - 값을 모두 입력했는가 ;

        let str; // undefined 상태

        if(currentPw.value.trim().length == 0) str = "현재 비밀번호를 입력해주세요";
        else if(newPw.value.trim().length == 0) str ="새 비밀번호를 입력해주세요";
        else if(newPwConfirm.value.trim().length == 0) str = "새 비밀번호 확인을 입력해주세요";

        if(str != undefined){
            alert(str);
            e.preventDefault();
            return;
        }

        const regExp = /^[a-zA-Z0-9!@#_-]{6,20}$/;

        if(!regExp.test(newPw.value)){
                alert("새 비밀번호가 유효하지 않습니다");
                e.preventDefault();
                return;
        }

        // 새 비밀번호 == 새 비밀번호 확인

        if(newPw.value != newPwConfirm.value){
            alert("새 비밀번호가 일치하지 않습니다");
            e.preventDefault();
                return;
        }

    })
}


/* 탈퇴 유효성 검사 */

// 탈퇴 form 태그 -----------------------------------------------------------------------



const secession = document.querySelector("#secession");

if(secession != null){

        secession.addEventListener("submit", function(e){

                const memberPw = document.querySelector("#memberPw");

                const agree = document.querySelector("#agree");

                // - 비밀번호 입력 되었는지 확인ㄴ

                if(memberPw.value.trim().length == 0){
                    alert("비밀번호를 입력해주세요");
                    e.preventDefault();
                    return;
                }


                //약관 동의 체크 확인

                if(!agree.checked){
                    alert("체크박스를 체크 해주세요");
                    e.preventDefault();
                    return;
                }

                if(!confirm("정말 삭제하겠습니까?")){
                    alert("취소 되었습니다");
                    e.preventDefault();
                    return;
                }

        });


}



