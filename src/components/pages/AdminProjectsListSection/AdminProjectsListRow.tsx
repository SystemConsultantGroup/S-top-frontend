"use client";

import { PrimaryButton } from "@/components/common/Buttons";
import { DataTableData } from "@/components/common/DataTable/elements/DataTableData";
import { DataTableRow } from "@/components/common/DataTable/elements/DataTableRow";
import { ProjectsCategoryLookupTable } from "@/constants/LookupTables";
import { IProjectContent } from "@/types/project";
import { getFileUrlById } from "@/utils/handleDownloadFile";
import { Checkbox } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface AdminProjectListRowProps {
  project: IProjectContent;
  index: number;
  pageNumber: number;
  pageSize: number;
  selectedProjects: number[];
  handleSelect: (id: number) => void;
}

export function AdminProjectListRow({
  project,
  index,
  pageNumber,
  pageSize,
  selectedProjects,
  handleSelect,
}: AdminProjectListRowProps) {
  const { push } = useRouter();
  const thumbnailId = project.thumbnailInfo.id;
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    if (thumbnailId) {
      getFileUrlById(thumbnailId)
        .then((url) => {
          setThumbnail(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [thumbnailId]);

  return (
    <DataTableRow key={index}>
      <DataTableData text={false}>
        <Checkbox
          checked={selectedProjects.includes(project.id)}
          onChange={() => handleSelect(project.id)}
        />
      </DataTableData>
      <DataTableData>{index + 1 + (pageNumber - 1) * Number(pageSize)}</DataTableData>
      <DataTableData>
        <Image src={thumbnail} alt={"Thumbnail"} width={100} height={50} />
      </DataTableData>
      <DataTableData>{project.year}</DataTableData>
      <DataTableData>{ProjectsCategoryLookupTable[project.projectCategory]}</DataTableData>
      <DataTableData>{project.projectName}</DataTableData>
      <DataTableData text={false}>
        <PrimaryButton
          onClick={() => {
            push(`projects/${project.id}`);
          }}
        >
          수정
        </PrimaryButton>
      </DataTableData>
    </DataTableRow>
  );
}
