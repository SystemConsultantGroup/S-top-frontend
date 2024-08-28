import { MypageInterest } from "./MypageInterest";
import { MypageUserInfo } from "./MypageUserInfo";
import classes from "./MypageView.module.css";

export function MypageView() {
  return (
    <div className={classes.container}>
      <MypageUserInfo />
      <MypageInterest />
    </div>
  );
}
