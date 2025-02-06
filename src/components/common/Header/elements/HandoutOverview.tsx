import { USER_NAVS } from "@/constants/UserNavigations";
import styles from "../Header.module.css";
import Link from "next/link";
import { HandoutShortcut } from ".//HandoutShortcut";

interface HandoutOverviewProps {
  setIsOpen: (value: boolean) => void;
}

export function HandoutOverview({ setIsOpen }: HandoutOverviewProps) {
  const handleLinkClick = () => {
    setIsOpen(false); // Handout 창 닫기
  };

  return (
    <div className={styles.overview}>
      {USER_NAVS.map((topic) => (
        <div key={topic.title}>
          <b>
            {topic.link ? (
              <Link
                href={topic.link}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleLinkClick}
              >
                {topic.title}
              </Link>
            ) : (
              topic.title
            )}
          </b>
          <br />
          {topic.items && (
            <ul>
              {topic.items.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} onClick={handleLinkClick}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <br />
      <div>
        <HandoutShortcut />
      </div>
    </div>
  );
}
