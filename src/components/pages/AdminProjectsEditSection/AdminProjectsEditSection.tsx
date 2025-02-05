import { Stack } from "@mantine/core";
import { ProjectCreateSection } from "./ProjectCreateSection";

export function AdminProjectsEditSection() {
  return (
    <>
      <Stack gap={50}>
        {/* <ProjectsExcelCreateSection /> */}
        <ProjectCreateSection />
      </Stack>
    </>
  );
}
