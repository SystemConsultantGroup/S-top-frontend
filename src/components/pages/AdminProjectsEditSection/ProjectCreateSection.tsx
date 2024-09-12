"use client";

import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { TextInput } from "@/components/common/TextInput";
import { Group, Radio, RadioGroup, Stack, Title } from "@mantine/core";
import classes from "./AdminProjectsEditSection.module.css";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { useState } from "react";
import { DangerButton, PrimaryButton } from "@/components/common/Buttons";

export function ProjectCreateSection() {
  const [additionalProfessors, setAdditionalProfessors] = useState<string[]>([]);
  const [option, setOption] = useState<string | null>(null);

  const handleAddProfessor = () => {
    setAdditionalProfessors([...additionalProfessors, ""]);
  };
  const handleDeleteProfessor = (index: number) => {
    setAdditionalProfessors(additionalProfessors.filter((_, i) => i !== index));
  };

  return (
    <Section>
      <Title order={2} fz={24} pl={20} mb={24}>
        개별등록
      </Title>
      <Stack>
        <Row field="프로젝트 종류" fieldSize={130}>
          <RadioGroup>
            <Group gap={20}>
              <Radio value={"1"} label={"산학협력프로젝트"}></Radio>
              <Radio value={"2"} label={"연구실"}></Radio>
              <Radio value={"3"} label={"동아리"}></Radio>
              <Radio value={"4"} label={"창업/SPARK"}></Radio>
            </Group>
          </RadioGroup>
        </Row>
        <Row field="프로젝트 분야" fieldSize={130}>
          <RadioGroup>
            <Group gap={20}>
              <Radio label={"시스템/네트워크"}></Radio>
              <Radio label={"VR/AR"}></Radio>
              <Radio label={"보안"}></Radio>
              <Radio label={"소프트웨어공학"}></Radio>
              <Radio label={"웹"}></Radio>
              <Radio label={"모바일앱"}></Radio>
              <Radio label={"컴퓨터비전"}></Radio>
              <Radio label={"빅데이터 분석"}></Radio>
              <Radio label={"AI/머신러닝"}></Radio>
            </Group>
          </RadioGroup>
        </Row>
        <Row field="프로젝트명" fieldSize={130}>
          <TextInput wrapperClasses={{ root: classes.input }} />
        </Row>
        <Row field="프로젝트 요약" fieldSize={130}>
          <TextInput wrapperClasses={{ root: classes.input }} />
        </Row>
        <Row field="프로젝트 년도" fieldSize={130}>
          <Dropdown
            options={["1", "2", "3"]}
            selectedOption={option}
            onOptionClick={setOption}
            placeholder={""}
          />
        </Row>
        <Row field="이메일" fieldSize={130}>
          <TextInput wrapperClasses={{ root: classes["input-md"] }} />
        </Row>
        <Row field="담당교수" fieldSize={80}>
          <Group>
            <PrimaryButton onClick={handleAddProfessor}>추가</PrimaryButton>
            <TextInput />
          </Group>
        </Row>
        {additionalProfessors.map((professor, index) => (
          <Row key={index} field={""} fieldSize={158}>
            <Group w={"50%"}>
              <TextInput></TextInput>
              <DangerButton onClick={() => handleDeleteProfessor(index)}>삭제</DangerButton>
            </Group>
          </Row>
        ))}
      </Stack>
    </Section>
  );
}
