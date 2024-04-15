package edu.kh.project.mypageService;

import java.util.Map;

import edu.kh.project.member.model.dto.Member;

public interface MypageService {

	int updateInfo(Member inputMember, String[] memberAddress);

	int changePw(Map<String, Object> paramMap, int memberNo);

	int deleteConfirm(String memberPw,int memberNo);
	
}
