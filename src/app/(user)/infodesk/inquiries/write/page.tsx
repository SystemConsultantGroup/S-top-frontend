"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import { Banner } from "@/components/common/Banner/Banner";
import { TextInput } from "@/components/common/TextInput";
import { CommonAxios } from "@/utils/CommonAxios/CommonAxios";
import { PrimaryButton } from "@/components/common/Buttons/PrimaryButton/PrimaryButton";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import classes from "./writeQA.module.css";

import { Textarea, Modal } from "@mantine/core";

interface FormData {
  title: string;
  content: string;
}

export default function InquiryWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [project, setProject] = useState<any>(null);
  //const projectId = searchParams.get("id");
  const projectId = typeof window !== "undefined" ? searchParams.get("id") : null;

  const { token } = useAuth();

  const [modalOpened, setModalOpened] = useState(false); // Modal state

  const handleGoToProjectDetails = () => {
    router.push(`/projects/${projectId}`);
  };
  useEffect(() => {
    if (projectId) {
      // 여기는 또 is loading 쓰면 작동이 안되네요??
      console.log("Project ID:", projectId);
      //console.log('Token:', token);
      const fetchProject = async () => {
        try {
          const response = await CommonAxios.get(`/projects/${projectId}`);
          console.log("Fetched project:", response.data);
          setProject(response.data);
        } catch (error) {
          console.error("Error fetching project data:", error);
        }
      };
      fetchProject();
    }
  }, [projectId, token]);

  const handleBackToList = () => {
    router.push("/infodesk/inquiries");
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      title: formData.title,
      content: formData.content,
    };
    /*
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    };*/

    try {
      const response = await CommonAxios.post(`/projects/${projectId}/inquiry`, dataToSend);

      console.log("Inquiry submitted: ", response.data);
      setModalOpened(true);
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
    }
  };

  return (
    <>
      <div className={classes.subHeadNavbar}>
        <SubHeadNavbar title="Info Desk" />
      </div>

      <div className={classes.banner}>
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
          width="100%"
        />
      </div>

      <h1 className={classes.heading}>프로젝트 문의</h1>
      <div className={classes.mainContent}>
        <h3 className={classes.projName}>{project ? project.projectName : "Loading..."}</h3>
        <form onSubmit={handleSubmit}>
          <div className={classes.formRow}>
            <TextInput
              label="문의 제목"
              placeholder="제목을 입력하세요"
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className={classes.formRow}>
            <Textarea
              label="문의 내용"
              placeholder="문의 내용을 입력하세요"
              minRows={15}
              autosize
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>
          <br />
          <div className={classes.formActions}>
            <PrimaryButton type="submit" style={{ marginRight: "10px" }}>
              작성하기
            </PrimaryButton>
            <PrimaryButton onClick={handleBackToList}>문의 목록으로</PrimaryButton>
          </div>
        </form>
      </div>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="문의 작성이 완료되었습니다."
        centered
      >
        <div className={classes.modalActions}>
          <PrimaryButton onClick={handleGoToProjectDetails}>프로젝트 상세 보기</PrimaryButton>
          <PrimaryButton style={{ marginLeft: "10px" }} onClick={handleBackToList}>
            문의 목록 보기
          </PrimaryButton>
        </div>
      </Modal>
    </>
  );
}
