import { USER_NAV_NAMES, USER_NAVS } from "@/constants/UserNavigations";
import { Group } from "@mantine/core";
import Link from "next/link";
import styles from "./SubHeadNavbar.module.css";

interface ISubHeadNavbar {
  title: USER_NAV_NAMES;
}

export function SubHeadNavbar({ title }: ISubHeadNavbar) {
  const NavTitList = USER_NAVS.find((item) => item.title === title)!.items;

  return (
    <>
      <div className={styles.navbar}>
        <Group gap={0}>
          <div className={styles.navtit}>
            <h3>{title}</h3>
          </div>
          <div className={styles.navlist}>
            <ul>
              {NavTitList &&
                NavTitList.map((item, idx) => (
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
