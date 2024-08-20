import React, { useState } from "react";
import { TextInput } from "@/components/common/TextInput/TextInput";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { CheckBox } from "@/components/common/CheckBox/CheckBox";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";
import classes from "./registerForm.module.css";

const MEMBER_TYPES = ["학생", "교수/교직원", "기업관계자", "외부인"];

export function RegisterForm() {
  const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleMemberTypeChange = (type: string) => {
    setSelectedMemberType(type);
    setSelectedDepartment(null); // Reset department when member type changes
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <div className={classes.registerBox}>
      <img src="/images/S-TopLogo.png" alt="Logo" className={classes.logo} />

      <h1>회원 정보 입력</h1>

      <TextInput className={classes.text} label="이름" placeholder="이름을 입력하세요" required />
      <TextInput
        className={classes.text}
        label="휴대전화"
        placeholder="휴대전화 번호를 입력하세요"
        required
      />

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
          <TextInput className={classes.text} label="학번" placeholder="학번을 입력하세요" />
          <TextInput
            className={classes.text}
            label="가입경로"
            placeholder="가입경로를 입력하세요"
          />
        </>
      )}

      {(selectedMemberType === "교수/교직원" || selectedMemberType === "기업관계자") && (
        <>
          <TextInput className={classes.text} label="소속" placeholder="소속을 입력하세요" />
          <TextInput className={classes.text} label="직책" placeholder="직책을 입력하세요" />
          <TextInput
            className={classes.text}
            label="가입경로"
            placeholder="가입경로를 입력하세요"
          />
        </>
      )}

      {selectedMemberType === "외부인" && (
        <TextInput className={classes.text} label="가입경로" placeholder="가입경로를 입력하세요" />
      )}

      <CheckBox label="서비스이용약관 (필수)" />
      <CheckBox label="개인정보처리방침 (필수)" />
      <PrimaryButton label="회원가입" />
    </div>
  );
}
