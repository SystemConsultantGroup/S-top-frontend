"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Group, Stack } from "@mantine/core";
import { TextInput } from "@/components/common/TextInput";
import classes from "./MypageForm.module.css";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";

import { IDepartment, IUser } from "@/types/user";
import { USER_TYPE_LOOKUP_TABLE } from "@/constants/LookupTables";
import { fetcher } from "@/utils/fetcher";
import { CommonAxios } from "@/utils/CommonAxios";

interface Props {
  initialData: IUser | null;
  onUserUpdate: () => void;
}
export function MypageForm({ initialData, onUserUpdate }: Props) {
  const [selectedDept, setSelectedDept] = useState(
    initialData?.userType === "STUDENT" ? initialData?.departmentName : null
  );
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const form = useForm({
    initialValues: {
      name: initialData?.name,
      phone: initialData?.phone,
      email: initialData?.email ?? "",
      departmentName: initialData?.departmentName,
      divison: initialData?.division,
      position: initialData?.position,
      studentNumber: initialData?.studentNumber ?? "",
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "잘못된 이메일 형식입니다."),
      studentNumber: (value: string) => {
        // userType이 STUDENT인 경우만 유효성 검사 수행
        if (initialData?.userType === "STUDENT") {
          return /^\d{10}$/.test(value) ? null : "유효한 학번을 입력해주세요.";
        }
        return null;
      },
    },
  });

  /**
   * 학과 리스트 가져오기
   */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await fetcher({ url: "/departments" });
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
      }
    };
    fetchDepartments();
  }, []);

  /**
   * 유저 정보 수정 폼 제출
   */
  const handleSubmit = async (values: typeof form.values) => {
    console.log("handleSubmit 실행");
    try {
      // form에서 받은 값을 서버로 전송
      const updatedUser = {
        name: values.name,
        phoneNumber: values.phone,
        email: values.email,
        divison: values.divison ?? null,
        position: values.position ?? null,
        studentNumber: values.studentNumber ?? null,
        department: selectedDept ?? null,
      };
      // 유저 정보 수정 API 요청
      await CommonAxios.put("/users/me", updatedUser);
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      onUserUpdate();
    }
  };

  return (
    <form className={classes.formContainer} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"lg"} className={classes.rowGroup}>
        <div className={classes.row}>
          <div className={classes.firstCol}>이름</div>
          <div className={classes.inputWrapper}>
            <TextInput {...form.getInputProps("name")} className={classes.text} />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>휴대전화</div>
          <div className={classes.inputWrapper}>
            <TextInput {...form.getInputProps("phone")} className={classes.text} />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>이메일</div>
          <div className={classes.inputWrapper}>
            <TextInput {...form.getInputProps("email")} className={classes.text} />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.firstCol}>회원 유형</div>
          {/* 유저 타입 변경하지 못하도록 수정 */}
          <div className={classes.secondCol}>
            {USER_TYPE_LOOKUP_TABLE[initialData?.userType as keyof typeof USER_TYPE_LOOKUP_TABLE] ??
              "학생"}
          </div>
          {/* <div className={classes.inputWrapper}>
            <Dropdown
              options={userTypesList}
              placeholder={"선택"}
              onOptionClick={setSelectedUserType}
              selectedOption={selectedUserType}
              fullWidth
            />
          </div> */}
        </div>
        {initialData?.userType === "STUDENT" && (
          <>
            <div className={classes.row}>
              <div className={classes.firstCol}>학과</div>
              <div className={classes.inputWrapper}>
                <Dropdown
                  options={departments.map((department) => department.name)}
                  placeholder="학과 선택"
                  onOptionClick={setSelectedDept}
                  selectedOption={selectedDept}
                  fullWidth
                />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>학번</div>
              <div className={classes.inputWrapper}>
                <TextInput {...form.getInputProps("studentNumber")} className={classes.text} />
              </div>
            </div>
          </>
        )}
        {(initialData?.userType === "PROFESSOR" ||
          initialData?.userType === "INACTIVE_PROFESSOR" ||
          initialData?.userType === "COMPANY" ||
          initialData?.userType === "INACTIVE_COMPANY") && (
          <>
            <div className={classes.row}>
              <div className={classes.firstCol}>소속</div>
              <div className={classes.inputWrapper}>
                <TextInput {...form.getInputProps("division")} className={classes.text} />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.firstCol}>직책</div>
              <div className={classes.inputWrapper}>
                <TextInput {...form.getInputProps("position")} className={classes.text} />
              </div>
            </div>
          </>
        )}
      </Stack>

      <Group justify="flex-end" mt="md">
        <PrimaryButton type="submit">수정 완료</PrimaryButton>
      </Group>
    </form>
  );
}
