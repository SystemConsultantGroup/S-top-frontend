import { NavList } from "../NavList";
import styles from "../Header.module.css";

export function HeaderTopNav() {
  return (
    <div className={styles.topnav} role="navigation">
      <ul>
        {NavList.map((topic) => (
          <li key={topic.name}>
            <div>{topic.name}</div>
            <ul>
              {topic.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
