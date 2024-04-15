package edu.kh.project.member.model.serviceImpl;

import edu.kh.project.member.model.dto.Member;

public interface MemberService {

	Member login(Member inputMember);

	int checkEmail(String memberEmail);

	int signup(Member inputMember, String[] member);

}
