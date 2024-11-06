"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { IUser } from "./_mock/mock-user";
import { useForm } from "@mantine/form";
import { Group, Stack } from "@mantine/core";
import { TextInput } from "@/components/common/TextInput";
import classes from "./MypageForm.module.css";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";

import { MockUserTypes, MockDepartments } from "./_mock/mock-user";
import { useState } from "react";

interface Props {
  initialData: IUser | null;
}
export function MypageForm({ initialData }: Props) {
  const userTypesList: string[] = Object.values(MockUserTypes);
  const [selectedUserType, setSelectedUserType] = useState(
    MockUserTypes[initialData?.userType as keyof typeof MockUserTypes]
  );
  const [selectedDept, setSelectedDept] = useState(
    initialData?.userType === "student" ? initialData?.affiliation : null
  );

  const form = useForm({
    initialValues: {
      name: initialData?.name,
      phone: initialData?.phone,
      email: initialData?.email ?? "",
      userType: MockUserTypes[initialData?.userType as keyof typeof MockUserTypes],
      affiliation: initialData?.affiliation,
      position: initialData?.position,
      studentId: initialData?.studentId ?? "",
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "잘못된 이메일 형식입니다."),
      studentId: (value: string) => (/^\d{10}$/.test(value) ? null : "유효한 학번을 입력해주세요."),
    },
  });

  return (
    <form className={classes.formContainer}>
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
          <div className={classes.inputWrapper}>
            <Dropdown
              options={userTypesList}
              placeholder={"선택"}
              onOptionClick={setSelectedUserType}
              selectedOption={selectedUserType}
              fullWidth
            />
          </div>
        </div>
        {selectedUserType === "학생" && (
          <>
            <div className={classes.row}>
              <div className={classes.firstCol}>학과</div>
              <div className={classes.inputWrapper}>
                <Dropdown
                  options={MockDepartments}
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
                <TextInput {...form.getInputProps("studentId")} className={classes.text} />
              </div>
            </div>
          </>
        )}
        {(selectedUserType === "교수/교직원" || selectedUserType === "기업 관계자") && (
          <>
            <div className={classes.row}>
              <div className={classes.firstCol}>소속</div>
              <div className={classes.inputWrapper}>
                <TextInput {...form.getInputProps("affiliation")} className={classes.text} />
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
