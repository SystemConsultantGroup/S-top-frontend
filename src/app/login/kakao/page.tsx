import { KakaoAuth } from "@/components/pages/KakaoAuth";
import { Suspense } from "react";

export default function KakaoAuthPage() {
  return (
    <Suspense>
      <KakaoAuth />
    </Suspense>
  );
}
