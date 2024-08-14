import { Suspense } from "react";
import NoticesPage from "./NoticesPage";

export default function Page() {
  return (
    <Suspense fallback={<span>Wait...</span>}>
      <NoticesPage />
    </Suspense>
  );
}
