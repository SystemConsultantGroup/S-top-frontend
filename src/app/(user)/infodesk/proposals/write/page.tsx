"use client";

import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./write.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { Checkbox, TextInput, Switch, Textarea } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DangerButton, PrimaryButton } from "@/components/common/Buttons";
import { CommonAxios } from "@/utils/CommonAxios";
import { useFiles } from "@/hooks/useFiles/useFiles";
import { isNotEmpty, useForm } from "@mantine/form";
import { FileInput, Group } from "@mantine/core";
import { Row } from "@/components/common/Row";

interface FormData {
  title: string;
  content: string;
  webSite: string;
  projectTypes: string[];
  email: string;
  isVisible: boolean;
  isAnonymous: boolean;
  fileIds: number[];
}

const ProposalWritePage = () => {
  const url = "proposals";
  const { push } = useRouter();

  const { files, handleAddFile, handleRemoveFile, handleFileChange, uploadFiles } = useFiles();

  const { onSubmit, values, setValues, getInputProps } = useForm<FormData>({
    initialValues: {
      title: "",
      content: "",
      webSite: "",
      projectTypes: [],
      email: "",
      isVisible: true,
      isAnonymous: false,
      fileIds: [],
    },
    validate: {
      title: isNotEmpty(""),
      content: isNotEmpty(""),
      email: (value) => {
        if (!value) {
          return "  "; // 비어 있을 때 메시지 반환
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return " 올바른 이메일을 입력해주세요."; // 형식이 잘못되었을 때 메시지 반환
        }
        return null;
      },
      projectTypes: (value) => {
        if (value.length === 0) {
          return "프로젝트 타입을 선택해주세요."; // 선택하지 않았을 때 에러 메시지 반환
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: FormData) => {
    try {
      const fileIds = await uploadFiles(files);
      const submitData = {
        title: values.title,
        content: values.content,
        webSite: values.webSite,
        projectTypes: values.projectTypes,
        email: values.email,
        isVisible: true,
        isAnonymous: false,
        fileIds: fileIds,
      };

      console.log("submitData:", submitData);
      console.log("Updated projectTypes:", values.projectTypes);
      console.log("Updated fildIds:", fileIds);
      await CommonAxios.post(`${url}`, submitData);

      // TODO: 등록/수정 성공 시 알림
      push("/infodesk/proposals");
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  const router = useRouter();
  const handleBackToList = () => {
    router.push("/infodesk/proposals");
  };

  const handleChange = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setValues((prevState) => {
      const currentFields = [...(prevState[field] as string[])]; // 현재 배열 복사
      if (currentFields.includes(value)) {
        // 이미 선택된 값이면 제거
        return { ...prevState, [field]: currentFields.filter((item) => item !== value) };
      } else {
        // 선택되지 않은 값이면 추가
        return { ...prevState, [field]: [...currentFields, value] };
      }
    });
  };

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: boolean }>({});

  const projectTypeOptions = [
    { label: "산학협력단 조직", value: "RESEARCH_AND_BUSINESS_FOUNDATION" },
    { label: "연구실", value: "LAB" },
    { label: "스타트업", value: "STARTUP" },
    { label: "동아리", value: "CLUB" },
  ];

  return (
    <div className={styles.backColor}>
      <SubHeadNavbar title="Info Desk" />
      <Banner
        type="IND_UNIV_PROJECT"
        title="산학협력 프로젝트"
        subtitle="Industry-Academia Collaboration Project"
        text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
      />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>산학협력 과제 제안</h1>
        <div className={styles.formContainer}>
          <form onSubmit={onSubmit(handleSubmit)}>
            <div className={styles.formRow}>
              <TextInput
                label="제목 *"
                placeholder="제목을 입력하세요"
                {...getInputProps("title")} // 에러 메시지 자동 연결
              />
            </div>

            <div className={styles.formRow}>
              <Textarea
                label="내용 *"
                placeholder="내용을 입력하세요"
                minRows={6}
                autosize
                {...getInputProps("content")}
              />
            </div>

            <div className={styles.formRow}>
              <TextInput
                label="이메일 *"
                placeholder="이메일을 입력하세요"
                {...getInputProps("email")}
              />
            </div>

            <div className={styles.formRow}>
              <TextInput
                label="웹사이트"
                placeholder="웹사이트를 입력하세요"
                onChange={(e) => handleChange("webSite", e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <label>프로젝트 타입 *</label>
              <div className={styles.checkboxGroup}>
                {projectTypeOptions.map(({ label, value }) => (
                  <Checkbox
                    key={value}
                    classNames={{
                      label: styles.label,
                    }}
                    label={label} // 화면에 표시될 한글 이름
                    checked={values.projectTypes.includes(value)} // 선택 상태 확인
                    onChange={() => handleCheckboxChange("projectTypes", value)} // 값 업데이트
                  />
                ))}
              </div>
              {getInputProps("projectTypes").error && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {getInputProps("projectTypes").error}
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <Switch
                label="공개 여부"
                checked={values.isVisible}
                onChange={(e) => handleChange("isVisible", e.currentTarget.checked)}
              />
            </div>

            <div className={styles.formRow}>
              <Switch
                label="익명 여부"
                checked={values.isAnonymous}
                onChange={(e) => handleChange("isAnonymous", e.currentTarget.checked)}
              />
            </div>

            <div className={styles.formRowbtn}>
              <PrimaryButton onClick={handleAddFile}>첨부파일 추가</PrimaryButton>
            </div>
            {files.map((file, index) => (
              <Row key={file.id} field={`파일 ${index + 1}`} fieldSize={150}>
                <Group w={"50%"}>
                  <FileInput
                    id={file.id}
                    onChange={(newFile) => handleFileChange(file.id)(newFile)}
                    value={file.file}
                    placeholder={file.file ? file.file.name : "파일을 선택해주세요."}
                    w={"50%"}
                    {...{ accept: "image/*" }}
                  />
                  {files.length > 0 ? (
                    <DangerButton onClick={() => handleRemoveFile(file.id)}>삭제</DangerButton>
                  ) : (
                    <></>
                  )}
                </Group>
              </Row>
            ))}

            <div className={styles.formActions}>
              <PrimaryButton type="submit" style={{ marginRight: "10px" }}>
                제출하기
              </PrimaryButton>
              <PrimaryButton onClick={handleBackToList}>목록으로</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalWritePage;
