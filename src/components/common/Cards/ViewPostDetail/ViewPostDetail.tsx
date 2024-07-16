import { Button } from "@mantine/core";
import classes from "./ViewPostDetail.module.css";

const data = Array(0);
for (let i = 0; i < 127; i++) {
  data.push(i);
}

export function Paginations({
  title,
  subtitle,
  articles,
}: {
  title: string;
  subtitle: string;
  articles: string[];
}) {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <hr className={classes.hr}></hr>
        <div className={classes.subtitle}>{subtitle}</div>
        <div className={classes.images}></div>
        <div className={classes.article}>
          {articles.map((e) => {
            return (
              <>
                <p className={classes.articletext}>{e}</p>
              </>
            );
          })}
        </div>
        <hr className={classes.hr}></hr>
        <div className={classes.footer}>
          <div>
            <Button>돌아가기</Button>
          </div>
        </div>
      </div>
    </>
  );
}
