"use client";

import {
  Box,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconBell, IconChevronRight, IconLogout2, IconMenu2 } from "@tabler/icons-react";
import { ComponentPropsWithoutRef, forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import classes from "./AdminTopbar.module.css";
import { useAuth } from "@/components/common/Auth";
import { fetcher } from "@/utils/fetcher";

interface IUserButton extends ComponentPropsWithoutRef<"button"> {
  name: string;
  role: string;
}

const UserButton = forwardRef<HTMLButtonElement, IUserButton>(({ name, role, ...others }, ref) => (
  <UnstyledButton classNames={{ root: classes.userButton }} p="sm" ref={ref} {...others}>
    <Group gap="xs">
      <Box flex={1}>
        <Text size="md" fw={500} lineClamp={1}>
          {name}
        </Text>
        <Text c="dimmed" size="xs" lineClamp={1}>
          {role}
        </Text>
      </Box>
      <IconChevronRight
        className={classes.chevron}
        stroke={1.5}
        size={24}
        style={{ transform: "rotate(90deg)" }}
      />
    </Group>
  </UnstyledButton>
));
UserButton.displayName = "UserButton";

export function AdminTopbar() {
  const [userData, setUserData] = useState<{ name: string; userType: string } | null>(null);

  const { logout, token, isLoading, isLoggedIn } = useAuth();

  const fetchUser = async () => {
    try {
      const data = await fetcher({ url: "/users/me" });
      setUserData(data);
    } catch (e) {
      console.error("Error occured on fetching user data: ", e);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isLoading && !userData && token) {
      fetchUser();
    }
  }, [token, isLoading, isLoggedIn, userData]);

  return (
    <Box className={classes.topbar}>
      <Group gap="md">
        <UnstyledButton>
          <IconBell />
        </UnstyledButton>
        <UnstyledButton className={classes.hamburger}>
          <IconMenu2 />
        </UnstyledButton>
      </Group>
      <Box className={classes.logoBox}>
        <Image alt="logo" src="/images/logo.png" width={100} height={70} className={classes.logo} />
      </Box>
      <Box className={classes.userBox}>
        {userData ? (
          <Menu shadow="md" withArrow>
            <MenuTarget>
              <UserButton name={userData.name} role={userData.userType} />
            </MenuTarget>
            <MenuDropdown>
              <MenuLabel>사용자</MenuLabel>
              <MenuItem leftSection={<IconLogout2 />} color="red" onClick={logout}>
                로그아웃
              </MenuItem>
            </MenuDropdown>
          </Menu>
        ) : (
          <UserButton name="Loading..." role="" />
        )}
      </Box>
    </Box>
  );
}

export function MockAdminTopbar() {
  const userData = {
    name: "SCG",
    userType: "ADMIN",
  };
  const logout = () => {};

  return (
    <Box className={classes.topbar}>
      <Group gap="md">
        <UnstyledButton>
          <IconBell />
        </UnstyledButton>
        <UnstyledButton className={classes.hamburger}>
          <IconMenu2 />
        </UnstyledButton>
      </Group>
      <Box className={classes.logoBox}>
        <Image alt="logo" src="/images/logo.png" width={100} height={70} className={classes.logo} />
      </Box>
      <Box className={classes.userBox}>
        <Menu shadow="md" withArrow>
          <MenuTarget>
            <UserButton name={userData.name} role={userData.userType} />
          </MenuTarget>
          <MenuDropdown>
            <MenuLabel>사용자</MenuLabel>
            <MenuItem leftSection={<IconLogout2 />} color="red" onClick={logout}>
              로그아웃
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </Box>
    </Box>
  );
}
