import React from "react";
import { Modal, Text } from "@mantine/core";

interface DetailsModalProps {
  opened: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  subtitle: string;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  opened,
  onClose,
  videoUrl,
  title,
  subtitle,
}) => {
  return (
    <Modal opened={opened} onClose={onClose} size="80%" centered>
      <div style={{ textAlign: "left", marginBottom: "0" }}>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            paddingBottom: "56.25%",
            paddingTop: "0px",
            height: "0",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>

      <div
        style={{
          textAlign: "left",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: 0,
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {title}
        </p>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: 0,
            marginLeft: 0,
            alignSelf: "flex-end",
          }}
        >
          {subtitle}
        </Text>
      </div>
    </Modal>
  );
};
