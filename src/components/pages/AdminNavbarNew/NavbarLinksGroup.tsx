import { useState } from "react";
import { IAdminNavData } from "./AdminNavbar";
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./AdminNavbar.module.css";
import { useMediaQuery } from "@mantine/hooks";

export function LinksGroup({
  path,
  label,
  subtitle,
  icon: Icon,
  href,
  links,
  initiallyOpened,
}: IAdminNavData & { path: string }) {
  const isLinks = Array.isArray(links);

  const isActiveGroup = isLinks && links.some((link) => link.link === path);
  const isActiveSelf = !isLinks && href === path;
  const isShrinked = !useMediaQuery("(min-width: 1200px)");

  const [opened, setOpened] = useState(initiallyOpened || isActiveGroup || false);

  const items = (isLinks ? links : []).map((link) => (
    <Text
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(e) => e.preventDefault()}
      data-active={link.link === path || undefined}
    >
      {link.label}
    </Text>
  ));

  return (
    <Box
      className={classes.cellBox}
      style={{
        backgroundColor:
          isLinks && isShrinked && opened
            ? isActiveGroup
              ? "var(--mantine-color-blue-light)"
              : "var(--mantine-color-gray-light)"
            : undefined,
      }}
      data-opened={isLinks && isShrinked && opened ? true : undefined}
    >
      <UnstyledButton
        className={classes.control}
        onClick={() => setOpened((o) => !o)}
        component={isLinks ? "a" : undefined}
        href={href}
        data-group-active={isActiveGroup || undefined}
        data-self-active={isActiveSelf || undefined}
      >
        <Group className={classes.linkGroup}>
          <Box className={classes.linkBox}>
            <ThemeIcon variant="transparent" size={30}>
              <Icon className={classes.icon} size={28} stroke={1.6} />
            </ThemeIcon>
            <Box className={classes.linkLabel}>{isShrinked ? subtitle || label : label}</Box>
          </Box>
          {isLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={24}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {isLinks && (
        <Collapse className={classes.collapse} in={opened}>
          {items}
        </Collapse>
      )}
    </Box>
  );
}
