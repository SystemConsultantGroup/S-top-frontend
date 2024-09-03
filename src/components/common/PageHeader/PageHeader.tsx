import { Group, Stack, Text, Title } from "@mantine/core";

interface Props {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: Props) {
  return (
    <Group justify="space-between" align="flex-start" style={{ marginBottom: 30 }}>
      <Stack gap={16}>
        <Title order={2} fz={32} fw="bold">
          {title}
        </Title>
        {description && <Text fz={16}>{description ?? ""}</Text>}
      </Stack>
    </Group>
  );
}
