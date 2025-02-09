import { useAuth } from "@/components/common/Auth/AuthProvider";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";
import { CheckBox } from "@/components/common/CheckBox/CheckBox";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { TextInput } from "@/components/common/TextInput/TextInput";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { useRouter } from "next/navigation"; // 추가
import React, { useState } from "react";
import classes from "./registerForm.module.css";

const MEMBER_TYPES = ["학생", "교수/교직원", "기업관계자", "외부인"];
const SIGNUP_SOURCES = ["학과 게시판", "s-top 홍보자료", "학과 카톡방", "지인 소개", "기타"];

export function RegisterForm() {
  const router = useRouter(); // 추가
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    userType: "",
    email: "",
    signUpSource: "",
    studentInfo: { department: "", studentNumber: "" },
    division: null,
    position: null,
  });

  const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const { token } = useAuth();

  const handleTermsChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handlePrivacyChange = () => {
    setAcceptedPrivacy(!acceptedPrivacy);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleMemberTypeChange = (type: string) => {
    setSelectedMemberType(type);
    setFormData((prevState) => ({
      ...prevState,
      userType:
        type === "학생"
          ? "STUDENT"
          : type === "교수/교직원"
            ? "INACTIVE_PROFESSOR"
            : type === "기업관계자"
              ? "INACTIVE_COMPANY"
              : "EXTERNAL",
    }));
    setSelectedDepartment(null);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    setFormData((prevState) => ({
      ...prevState,
      studentInfo: { ...prevState.studentInfo, department },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms || !acceptedPrivacy) {
      alert("서비스 이용약관과 개인정보 처리 방침에 동의해주세요");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      const response = await CommonAxios.post("/auth/register", formData, config);

      console.log("Registration Successful: ", response.data);

      // 회원가입 성공 후 "/"로 이동
      router.push("/");
    } catch (error) {
      console.error("Error registering: ", error);
    }
  };

  return (
    <div className={classes.registerBox}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <img src="/images/S-TopLogo.png" alt="Logo" className={classes.logo} />

        <h1>회원 정보 입력</h1>

        <TextInput
          className={classes.text}
          label="이름"
          placeholder="이름을 입력하세요"
          required
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextInput
          className={classes.text}
          label="휴대전화"
          placeholder="휴대전화 번호를 입력하세요"
          required
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <TextInput
          className={classes.text}
          label="이메일"
          placeholder="이메일 주소를 입력하세요"
          required
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <br />
        <Dropdown
          options={MEMBER_TYPES}
          placeholder="회원 유형을 선택하세요"
          selectedOption={selectedMemberType}
          onOptionClick={handleMemberTypeChange}
        />

        {selectedMemberType === "학생" && (
          <>
            <Dropdown
              options={[
                "컴퓨터공학과",
                "소프트웨어학과",
                "글로벌 융합학부",
                "지능형 소프트웨어학과",
                "기타",
              ]}
              placeholder="학과를 선택하세요"
              selectedOption={selectedDepartment}
              onOptionClick={handleDepartmentChange}
            />
            <br />
            <TextInput
              className={classes.text}
              label="학번"
              placeholder="학번을 입력하세요"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  studentInfo: { ...prevState.studentInfo, studentNumber: e.target.value },
                }))
              }
            />

            <Dropdown
              options={SIGNUP_SOURCES}
              placeholder="가입 경로를 선택하세요"
              selectedOption={formData.signUpSource}
              onOptionClick={(value) => handleChange("signUpSource", value)}
            />
          </>
        )}

        {(selectedMemberType === "교수/교직원" || selectedMemberType === "기업관계자") && (
          <>
            <TextInput
              className={classes.text}
              label="소속"
              placeholder="소속을 입력하세요"
              onChange={(e) => handleChange("division", e.target.value)}
            />
            <TextInput
              className={classes.text}
              label="직책"
              placeholder="직책을 입력하세요"
              onChange={(e) => handleChange("position", e.target.value)}
            />
            <br />
            <Dropdown
              options={SIGNUP_SOURCES}
              placeholder="가입 경로를 선택하세요"
              selectedOption={formData.signUpSource}
              onOptionClick={(value) => handleChange("signUpSource", value)}
            />
          </>
        )}

        {selectedMemberType === "외부인" && (
          <Dropdown
            options={SIGNUP_SOURCES}
            placeholder="가입 경로를 선택하세요"
            selectedOption={formData.signUpSource}
            onOptionClick={(value) => handleChange("signUpSource", value)}
          />
        )}

        <br />
        <div onClick={handleTermsChange}>
          <CheckBox label="서비스이용약관 (필수)" />
        </div>
        <div onClick={handlePrivacyChange}>
          <CheckBox label="개인정보처리방침 (필수)" />
        </div>
        <br />
        <br />
        <PrimaryButton type="submit">회원가입</PrimaryButton>
      </form>
    </div>
  );
}
