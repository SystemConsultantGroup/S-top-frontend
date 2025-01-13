"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { Section } from "@/components/common/Section";
import { FileInput, Group, Stack, Title } from "@mantine/core";

export function ProjectsExcelCreateSection() {
  return (
    <Section>
      <Title order={2} fz={24} pl={20} mb={24}>
        일괄 등록
      </Title>
      <Stack>
        <Row field="일괄등록 양식" fieldSize={130}>
          <PrimaryButton>다운로드</PrimaryButton>
        </Row>
        <Row field="일괄등록" fieldSize={130}>
          <Group w={"50%"}>
            <FileInput placeholder={"파일 선택"} w={"50%"} />
            <PrimaryButton>등록하기</PrimaryButton>
          </Group>
        </Row>
      </Stack>
    </Section>
  );
}
