import { Text } from "@mantine/core";
import { EventAwardView } from "@/components/pages/EventAwardView/EventAwardView";
import classes from "./page.module.css";

export default function EventAwardPage() {
  return (
    <div className={classes.container}>
      <Text className={classes.title}>작품 수상 결과</Text>
      <EventAwardView />
    </div>
  );
}
