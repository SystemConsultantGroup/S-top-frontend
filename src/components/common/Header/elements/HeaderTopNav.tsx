import { USER_NAVS } from "@/constants/UserNavigations";
import styles from "../Header.module.css";
import Link from "next/link";

export function HeaderTopNav() {
  return (
    <div className={styles.topnav} role="navigation">
      <ul>
        {USER_NAVS.map((topic, idx) => (
          <li key={idx}>
            <div>
              {topic.link ? (
                <Link href={topic.link} style={{ textDecoration: "none", color: "inherit" }}>
                  {topic.title}
                </Link>
              ) : (
                topic.title
              )}
            </div>
            {topic.items && (
              <ul>
                {topic.items.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
