package edu.kh.project.mypageService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class MypageServiceImpl implements MypageService{

		private final MypageMapper mapper;
		
		private final BCryptPasswordEncoder encoder;

		/**
		 * 회원 정보 수정
		 */
		@Override
		public int updateInfo(Member inputMember, String[] memberAddress) {
			
			
			//입력된 주소가 있을경우
			//
			
			if(!inputMember.getMemberAddress().equals(",,")) {
				
				
				String str = String.join("^^^", memberAddress);
				
				inputMember.setMemberAddress(str);
				
			}else {
				inputMember.setMemberAddress(null);
			}
			
			log.debug("inputMember:" + inputMember);
			int result = mapper.updateInfo(inputMember);
			
			return result;
		}

		/**
		 * 비밀번호 수정
		 */
		@Override
		public int changePw(Map<String, Object> paramMap, int memberNo) {
			
			
			// 현재 로그인한 회원의 암호화된 비밀번호를 DB에서 조회
			String originPw = mapper.selectPw(memberNo);
			
			System.out.println(originPw);
			
			String memberPw = (String)paramMap.get("currentPw");
			
			if(!encoder.matches(memberPw, originPw)) {
				return 0;
			}
			
			// 같을 경우
			
			// 새 비밀번호를 암호화 진행
			
			String encPw = encoder.encode(memberPw);
			
			paramMap.put("encPw", encPw);
			paramMap.put("memberNo", memberNo);
			
			return mapper.changePw(paramMap);
		}

		@Override
		public int deleteConfirm(String memberPw, int memberNo) {
			
			
			System.out.println(memberNo);
			
			String originPw = mapper.selectPw(memberNo);
			
					
		
			
			if(!encoder.matches(memberPw, originPw)) {
				return 0;
			}
			
			System.out.println("아아아아");
			
		
			
			return mapper.deleteConfirm(memberNo);
		}
	
}
