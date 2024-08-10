import { Group } from "@mantine/core";
import classes from "./VRLink.module.css";
import Link from "next/link";
import Image from "next/image";
import { IconChevronsRight } from "@tabler/icons-react";

export interface VRLinkProps {
  width?: string;
  height?: string;
}

export function VRLink({ width, height }: VRLinkProps) {
  return (
    <div className={classes.container} style={{ width: width, height: height }}>
      {/* TODO: 경로 수정하기 */}
      <Link href={"/vr"}>
        <Image
          src={"/images/vrlink.png"}
          alt={"VR Link"}
          className={classes.img}
          objectFit="contain"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Group className={classes.group} pl={120} pr={120} justify="space-between">
          <div className={classes.title}>킹고버스 KINGOVERSE</div>
          <Group gap={4} align="center" justify="center">
            <div className={classes.text}>바로가기</div>
            <IconChevronsRight />
          </Group>
        </Group>
      </Link>
    </div>
  );
}
