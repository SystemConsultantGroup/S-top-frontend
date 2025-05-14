import { Button } from "@mantine/core";
import classes from "./Aihub.module.css";

function Bookmark({ className }: { className: string }): JSX.Element {
  return (
    <>
      <Button
        className={className}
        variant="transparent"
        leftSection={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
          >
            <path
              d="M1 7.2666C1 4.43817 1 3.02396 1.87868 2.14528C2.75736 1.2666 4.17157 1.2666 7 1.2666H11C13.8284 1.2666 15.2426 1.2666 16.1213 2.14528C17 3.02396 17 4.43817 17 7.2666V14.0942C17 16.7775 17 18.1191 16.1557 18.5295C15.3114 18.9399 14.2565 18.111 12.1465 16.4532L11.4713 15.9226C10.2849 14.9905 9.69173 14.5244 9 14.5244C8.30827 14.5244 7.71509 14.9905 6.52871 15.9226L5.85346 16.4532C3.74355 18.111 2.68859 18.9399 1.84429 18.5295C1 18.1191 1 16.7775 1 14.0942V7.2666Z"
              fill="#37618E"
              stroke="#37618E"
              stroke-width="2"
            />
          </svg>
        }
      ></Button>
    </>
  );
}

export function AihubCard({
  title,
  people,
  company,
  model,
}: {
  title: string | null;
  people: string | null;
  company: string | null;
  model: string;
}) {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.people}>{people}</div>
        <div className={classes.company}>{company}</div>
        <div className={classes.modeltext}>{model}</div>
        <div className={classes.side}>
          <Bookmark className={classes.Bookmark} />
        </div>
      </div>
    </>
  );
}
