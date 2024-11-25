import { USER_NAVS } from "@/constants/UserNavigations";
import styles from "../Header.module.css";
import Link from "next/link";

export function HandoutOverview() {
  return (
    <div className={styles.overview}>
      {USER_NAVS.map((topic) => (
        <div key={topic.title}>
          <b>
            {topic.link ? (
              <Link href={topic.link} style={{ textDecoration: "none", color: "inherit" }}>
                {topic.title}
              </Link>
            ) : (
              topic.title
            )}
          </b>
          {topic.items && (
            <ul>
              {topic.items.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
