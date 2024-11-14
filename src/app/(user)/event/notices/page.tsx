import { Suspense } from "react";
import EventNoticesPage from "./EventNoticesPage";

export default function EventNoticesPageSuspense() {
  return (
    <Suspense>
      <EventNoticesPage />
    </Suspense>
  );
}
