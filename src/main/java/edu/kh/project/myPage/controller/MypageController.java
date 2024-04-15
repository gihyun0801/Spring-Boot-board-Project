package edu.kh.project.myPage.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ch.qos.logback.core.net.SyslogOutputStream;
import edu.kh.project.member.model.dto.Member;
import edu.kh.project.mypageService.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
@SessionAttributes({"loginMember"})
@Controller
@Slf4j
@RequestMapping("myPage")
@RequiredArgsConstructor
public class MypageController {
		private final MypageService service;
		
		/** 내 정보 조회 및 수정
		 * @param loginMember
		 * @return
		 */
		@GetMapping("info")
		public String myPageInfo(
				@SessionAttribute("loginMember") Member loginMember,
				Model model
			
				) {
		//주소	
		String memberAddress = loginMember.getMemberAddress();
		
		//주소가 있을 경우에만 동작
		
		if(memberAddress != null) {
			// 구분자 "^^^" 을 기준으로
			//memberAddress 값을 쪼개어 String[]로 반환
			// --> ["04540", "중구 남대문로120", "3층 E 강의장"]
			
			String [] arr = memberAddress.split("\\^\\^\\^");
			
			model.addAttribute("postcode", arr[0]);
			model.addAttribute("address", arr[1]);
			model.addAttribute("detailAddress", arr[2]);
		}
		
		
		
		log.debug("memberAddress :" + memberAddress);
			
			return "mypage/myPage-info";
		}
		
		
		/** 프로필 이미지 변경 화면 이동
		 * @return
		 */
		@GetMapping("profile")
		public String profile() {
			return "myPage/myPage-profile";
		}
		
		/** 비밀번호 변경 화면 이동
		 * @return
		 */
		@GetMapping("changePw")
		public String changePw() {
			return "myPage/myPage-changePw";
		}
		
		/** 회원탈퇴이동
		 * @return
		 */
		@GetMapping("secession")
		public String secession() {
			return "myPage/myPage-secession";
		}
		
		/** 제출된 회원 닉네임, 전화번호 주소(,,)
		 * @param inputMember 로그인한 회원정보(회원 번호 사용할 예정)
		 * @param loginMember
		 * @param memberAddress
		 * @param ra
		 * @return
		 */
		@PostMapping("info")
		public String updateInfo(
				Member inputMember, 
				@SessionAttribute("loginMember") Member loginMember,
				@RequestParam("memberAddress") String[] memberAddress,
				RedirectAttributes ra
				) {
			
			log.debug("loginMember: "+ loginMember);
			
			int memberNo = loginMember.getMemberNo();
			
			inputMember.setMemberNo(memberNo);
			
			log.debug("inputMember: "+ inputMember);
			
			int result = service.updateInfo(inputMember, memberAddress);
			
			String message = null;
			
			if(result > 0) {
				message = "수정 완료";
				ra.addFlashAttribute("message",message);
				
				//loginMember 는
				// 세션에 저장된 로그인한 회원 정보가 저장된 객체를 참조하고 있다
				
				// -> loginMember를 수정하면
				// 세션에 저장된 로그인한 회원 정보가 수정된다!
				
				// == 세션 데이터와 DB 데이터를 맞춤
				
				loginMember.setMemberNickname(inputMember.getMemberNickname());
				loginMember.setMemberTel(inputMember.getMemberTel());
				loginMember.setMemberAddress(inputMember.getMemberAddress());
			}else {
				message = "수정 실패";
				ra.addFlashAttribute("message",message);
			}
			
			
			
			
			
			return "redirect:info";
		}
		
		/** 비밀번호 변경
		 * @return
		 */
		@PostMapping("changePw")
		public String changePw(
				@RequestParam Map<String, Object> paramMap,
				@SessionAttribute("loginMember") Member loginMember,
				RedirectAttributes ra
				) {
			
			int memberNo = loginMember.getMemberNo();
			
			//현재 + 새 + 회원번호를 서비스로 전달
			
			int result = service.changePw(paramMap, memberNo);
			
			String message = null;
			String path = null;
			
			System.out.println(result);
			if(result > 0) {
				message = "비밀번호 변경 완료";
				ra.addFlashAttribute("message", message);
				
				path = "/myPage/info";
				
				loginMember.setMemberPw(message);
				
			}else {
				path = "/myPage/changePw";
				
				message = "비밀번호 변경 실패";
				
				ra.addFlashAttribute("message", message);
			}
			
			
			return "redirect:" + path;
		}
		
		
		/** 회원탈퇴
		 * @param memberPw
		 * @param loginMember
		 * @param status
		 * @param ra
		 * @return
		 */
		@PostMapping("secession")
		public String deleteConfirm(
				@RequestParam("memberPw") String memberPw,
				@SessionAttribute("loginMember") Member loginMember,
				SessionStatus status,
				RedirectAttributes ra
				) {
			
			int memberNo = loginMember.getMemberNo();
			int result = service.deleteConfirm(memberPw,memberNo);
			
			String message = null;
			String path = null;
			
			if(result > 0) {
				status.setComplete();
				message = "탈퇴 완료";
				path = "/";
				ra.addFlashAttribute("message", message);
			}else {
				message ="탈퇴 실패";
				ra.addFlashAttribute("message", message);
				path = "/myPage/secession";
			}
			
			System.out.println(result);
			
			return "redirect:" + path;
		}
		
}
