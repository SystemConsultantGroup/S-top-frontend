"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { Row } from "@/components/common/Row";
import { DetailedApplication, PagedApplicationsResponse } from "@/types/application";
import { CommonAxios } from "@/utils/CommonAxios";
import { Modal, ModalProps, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";

interface ApplicationConfirmModalProps extends ModalProps {
  applicationId: number;
  mutate: KeyedMutator<PagedApplicationsResponse>;
}

export function ApplicationConfirmModal({
  applicationId,
  mutate,
  ...props
}: ApplicationConfirmModalProps) {
  const [application, setApplication] = useState<DetailedApplication | null>(null);

  // 가입 승인
  const handleConfirm = async () => {
    try {
      await CommonAxios.patch(`/applications/${applicationId}`);
      mutate();
      close();
    } catch (error) {
      // TODO: 에러 처리
      console.error(error);
    }
  };

  // 가입 신청 정보 가져오기
  useEffect(() => {
    const fetchApplication = async () => {
      const { data } = await CommonAxios.get<DetailedApplication>(`/applications/${applicationId}`);
      setApplication(data);
    };

    fetchApplication();
  }, [applicationId]);

  return (
    <Modal radius={"md"} {...props}>
      <Stack gap={"xl"} align="center">
        <Text fz={20} fw={600}>
          가입 승인
        </Text>
        <Stack gap={"xl"} align="flex-start" justify="center" mb={20}>
          <Row field="이름" fieldWeight={600} pl={10}>
            {application?.name}
          </Row>
          <Row field="전화번호" fieldWeight={600} pl={10}>
            {application?.phone}
          </Row>
          <Row field="이메일" fieldWeight={600} pl={10}>
            {application?.email}
          </Row>
          <Row field="소속" fieldWeight={600} pl={10}>
            {application?.division}
          </Row>
          <Row field="직책" fieldWeight={600} pl={10}>
            {application?.position}
          </Row>
        </Stack>
        <PrimaryButton w={"100%"} onClick={handleConfirm}>
          승인
        </PrimaryButton>
      </Stack>
    </Modal>
  );
}
