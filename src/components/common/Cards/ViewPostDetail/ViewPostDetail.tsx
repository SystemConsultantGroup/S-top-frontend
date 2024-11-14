import { Button } from "@mantine/core";
import classes from "./ViewPostDetail.module.css";
import Image from "next/image";

export function ViewPostDetail({
  title,
  subtitle,
  articles,
  img,
}: {
  title: string;
  subtitle: string;
  img: string;
  articles: string[];
}) {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <hr className={classes.hr}></hr>
        <div className={classes.subtitle}>{subtitle}</div>
        <div className={classes.images}>
          <Image src={img} alt="" />
        </div>
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
