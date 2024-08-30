import { Divider, Group } from "@mantine/core";
import styles from "./SubHeadNavbar.module.css";
import { NavList, NavNames } from "./NavList";
import Link from "next/link";

interface ISubHeadNavbar {
  title: NavNames;
}

export function SubHeadNavbar({ title }: ISubHeadNavbar) {
  const NavTitList = NavList.find((item) => item.title === title)!.items;

  return (
    <>
      <div className={styles.navbar}>
        <Group gap={0}>
          <div className={styles.navtit}>
            <h3>{title}</h3>
          </div>
          <Divider className={styles.divider} orientation="vertical" />
          <div className={styles.navlist}>
            <ul>
              {NavTitList.map((item, idx) => (
                <li className={styles.navitem} key={idx}>
                  <div>
                    <Link href={item.link}>{item.name}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Group>
      </div>
    </>
  );
}