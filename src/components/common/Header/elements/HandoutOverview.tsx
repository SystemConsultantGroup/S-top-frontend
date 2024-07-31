import styles from "../Header.module.css";
import { NavList } from "../NavList";

export function HandoutOverview() {
  return (
    <div className={styles.overview}>
      {NavList.map((topic) => (
        <div key={topic.name}>
          <b>{topic.name}</b>
          <ul>
            {topic.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
