import { MypageInterest } from "./MypageInterest";
import { MypageUserInfo } from "./MypageUserInfo";
import { MypageTable } from "./MypageTable";
import classes from "./MypageView.module.css";

export function MypageView() {
  return (
    <div className={classes.container}>
      <MypageUserInfo />
      <MypageInterest />
      <MypageTable />
    </div>
  );
}
