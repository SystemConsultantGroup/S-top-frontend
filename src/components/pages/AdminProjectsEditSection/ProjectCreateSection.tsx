"use client";

import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@/components/common/TextInput";
import { FileInput, Group, Radio, RadioGroup, Stack, Title } from "@mantine/core";
import classes from "./AdminProjectsEditSection.module.css";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/common/Buttons";
import { isNotEmpty, useForm } from "@mantine/form";
import { getYears } from "@/utils/getYears";
import { AwardStatus, ProjectCategory, ProjectType } from "@/types/project";
import { ProjectsCategoryLookupTable, ProjectsTypeLookupTable } from "@/constants/LookupTables";
import { useRouter } from "next/navigation";
import { useFiles } from "@/hooks/useFiles/useFiles";
import { CommonAxios } from "@/utils/CommonAxios";

type Role = "PROFESSOR" | "STUDENT";

interface Member {
  name: string;
  role: Role;
}

export interface ProjectEditFormInputs {
  thumbnailId: number;
  posterId: number;
  projectName: string;
  projectType?: ProjectType;
  projectCategory?: ProjectCategory;
  teamName: string;
  youtubeId: string;
  year: number;
  awardStatus: AwardStatus;
  members: Member[];
  url: string;
  description: string;
}

export function ProjectCreateSection({ projectId }: { projectId?: number }) {
  /* next 라우터, 페이지 이동에 이용 */
  const { push } = useRouter();

  const { uploadFiles } = useFiles();

  const { onSubmit, getInputProps, values, setValues } = useForm<ProjectEditFormInputs>({
    initialValues: {
      thumbnailId: 0,
      posterId: 0,
      projectName: "",
      teamName: "",
      youtubeId: "",
      year: 0,
      awardStatus: "NONE",
      members: [],
      url: "",
      description: "",
    },
    validate: {
      projectCategory: isNotEmpty("프로젝트 분야를 선택해주세요."),
      projectType: isNotEmpty("프로젝트 종류를 선택해주세요."),
      description: isNotEmpty("프로젝트 요약을 입력해주세요."),
      projectName: isNotEmpty("프로젝트명을 입력해주세요."),
      teamName: isNotEmpty("팀 이름을 입력해주세요."),
      youtubeId: isNotEmpty("유튜브 ID를 입력해주세요."),
    },
  });

  const [option, setOption] = useState<string | null>(null);
  const [professors, setProfessors] = useState<string>();
  const [students, setStudents] = useState<string>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);

  const years = getYears();

  const handleSubmit = async (values: ProjectEditFormInputs) => {
    try {
      const fileIds = await uploadFiles([
        { id: "0", file: thumbnail },
        { id: "1", file: poster },
      ]);
      const professorsArr = professors?.split(",").map((professor) => ({
        name: professor,
        role: "PROFESSOR",
      }));
      const studentsArr = students?.split(",").map((student) => ({
        name: student,
        role: "STUDENT",
      }));
      const members = [...(professorsArr || []), ...(studentsArr || [])];

      const project = {
        thumbnailId: fileIds[0],
        posterId: fileIds[1],
        projectName: values.projectName,
        projectType: values.projectType,
        projectCategory: values.projectCategory,
        teamName: values.teamName,
        youtubeId: values.youtubeId,
        year: Number(option),
        awardStatus: values.awardStatus,
        members: members,
        url: values.url,
        description: values.description,
      };

      if (projectId) {
        await CommonAxios.put(`/projects/${projectId}`, project);
      } else {
        await CommonAxios.post("/projects", project);
      }

      push("../projects");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPrevProject = async () => {
      const response = await CommonAxios.get(`/projects/${projectId}`);
      const prevProject = response.data;
      console.log(prevProject);
      const prevMembers = prevProject.professorNames.map((professor: string) => ({
        name: professor,
        role: "PROFESSOR",
      }));
      prevMembers.push(
        ...prevProject.studentNames.map((student: string) => ({
          name: student,
          role: "STUDENT",
        }))
      );

      setValues({
        thumbnailId: prevProject.thumbnailInfo.id,
        posterId: prevProject.posterInfo.id,
        projectName: prevProject.projectName,
        projectType: prevProject.projectType,
        projectCategory: prevProject.projectCategory,
        teamName: prevProject.teamName,
        youtubeId: prevProject.youtubeId,
        year: prevProject.year,
        awardStatus: prevProject.awardStatus,
        members: prevMembers,
        url: prevProject.url,
        description: prevProject.description,
      });

      if (prevProject.thumbnailInfo.id) {
        setThumbnail(
          new File([], prevProject.thumbnailInfo.name, { type: prevProject.thumbnailInfo.mimeType })
        );
      }
      if (prevProject.posterInfo.id) {
        setPoster(
          new File([], prevProject.posterInfo.name, { type: prevProject.posterInfo.mimeType })
        );
      }
      const professors = prevMembers.filter((member: Member) => member.role === "PROFESSOR");
      setProfessors(professors.map((professor: Member) => professor.name).join(", "));
      const students = prevMembers.filter((member: Member) => member.role === "STUDENT");
      setStudents(students.map((student: Member) => student.name).join(", "));
      setOption(String(prevProject.year));
    };
    if (projectId) fetchPrevProject();
  }, [projectId, setValues]);

  return (
    <Section>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Title order={2} fz={24} pl={20} mb={24}>
          {projectId ? "프로젝트 수정" : "개별등록"}
        </Title>
        <Stack>
          <Row field="프로젝트 종류" fieldSize={130}>
            <RadioGroup {...getInputProps("projectType")}>
              <Group gap={20}>
                <Radio
                  value={ProjectsTypeLookupTable["산학협력프로젝트"]}
                  label={"산학협력프로젝트"}
                ></Radio>
                <Radio value={ProjectsTypeLookupTable["연구실"]} label={"연구실"}></Radio>
                <Radio value={ProjectsTypeLookupTable["동아리"]} label={"동아리"}></Radio>
                <Radio value={ProjectsTypeLookupTable["창업/SPARK"]} label={"창업/SPARK"}></Radio>
              </Group>
            </RadioGroup>
          </Row>
          <Row field="프로젝트 분야" fieldSize={130} mt={20} mb={20}>
            <RadioGroup {...getInputProps("projectCategory")}>
              <Group gap={20}>
                <Radio
                  value={ProjectsCategoryLookupTable["시스템/네트워크"]}
                  label={"시스템/네트워크"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["웹/애플리케이션"]}
                  label={"웹/애플리케이션"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["보안/소프트웨어공학"]}
                  label={"보안/소프트웨어공학"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["자연어처리"]}
                  label={"자연어처리"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["컴퓨터비전"]}
                  label={"컴퓨터비전"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["빅데이터분석"]}
                  label={"빅데이터분석"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["인터랙션/증강현실"]}
                  label={"인터랙션/증강현실"}
                ></Radio>
                <Radio
                  value={ProjectsCategoryLookupTable["AI/머신러닝"]}
                  label={"AI/머신러닝"}
                ></Radio>
              </Group>
            </RadioGroup>
          </Row>
          <Row field="프로젝트명" fieldSize={130}>
            <TextInput
              placeholder="프로젝트명"
              wrapperClasses={{ root: classes.input }}
              initialValue={values.projectName}
              {...getInputProps("projectName")}
            />
          </Row>
          <Row field="프로젝트 요약" fieldSize={130}>
            <TextInput
              placeholder="프로젝트 요약"
              wrapperClasses={{ root: classes.input }}
              initialValue={values.description}
              {...getInputProps("description")}
            />
          </Row>
          <Row field="팀 이름" fieldSize={130}>
            <TextInput
              placeholder="팀 이름"
              wrapperClasses={{ root: classes.input }}
              initialValue={values.teamName}
              {...getInputProps("teamName")}
            />
          </Row>
          <Row field="프로젝트 년도" fieldSize={130}>
            <Dropdown
              options={years}
              selectedOption={option}
              onOptionClick={setOption}
              placeholder={""}
            />
          </Row>
          <Row field="담당교수" fieldSize={130}>
            <TextInput
              placeholder=", 로 구분하여 입력해주세요."
              wrapperClasses={{ root: classes["input-md"] }}
              initialValue={professors}
              onChange={(e) => setProfessors(e.currentTarget.value)}
            />
          </Row>
          <Row field="참여 학생" fieldSize={130}>
            <TextInput
              placeholder=", 로 구분하여 입력해주세요."
              wrapperClasses={{ root: classes["input-md"] }}
              initialValue={students}
              onChange={(e) => setStudents(e.currentTarget.value)}
            />
          </Row>
          <Row field="유튜브 ID" fieldSize={130}>
            <TextInput
              placeholder="유튜브 ID"
              wrapperClasses={{ root: classes["input-md"] }}
              initialValue={values.youtubeId}
              {...getInputProps("youtubeId")}
            />
          </Row>
          <Row field="프로젝트 링크" fieldSize={130}>
            <TextInput
              placeholder="프로젝트 링크"
              wrapperClasses={{ root: classes["input-md"] }}
              initialValue={values.url}
              {...getInputProps("url")}
            />
          </Row>
          <Row field="썸네일" fieldSize={130}>
            <FileInput
              id="thumbnail"
              value={thumbnail}
              onChange={(file) => setThumbnail(file)}
              placeholder={thumbnail ? thumbnail.name : "썸네일을 선택해주세요."}
              w={"50%"}
            />
          </Row>
          <Row field="포스터" fieldSize={130}>
            <FileInput
              id="poster"
              value={poster}
              onChange={(file) => setPoster(file)}
              placeholder={poster ? poster.name : "포스터를 선택해주세요."}
              w={"50%"}
            />
          </Row>
          <Group justify="center" mt={30}>
            {projectId && (
              <PrimaryButton
                onClick={() => {
                  push("../projects");
                }}
              >
                목록으로
              </PrimaryButton>
            )}
            <PrimaryButton key="register" type="submit">
              {projectId ? "수정하기" : "등록하기"}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Section>
  );
}
