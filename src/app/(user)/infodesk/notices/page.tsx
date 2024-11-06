import { Suspense } from "react";
import NoticesPage from "./NoticesPage";

export default function NoticesPageSuspense() {
  return (
    <Suspense>
      <NoticesPage />
    </Suspense>
  );
}
