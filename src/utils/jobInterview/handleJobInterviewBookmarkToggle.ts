import { CommonAxios } from "@/utils/CommonAxios";

interface Props {
  jobInterviewId: number;
  isLoggedIn: boolean;
  isAlreadyBookmarked: boolean;
  onToggleSuccess: () => void;
  onToggleFail: () => void;
  onLoginCheckFail: () => void;
}

export const handleJobInterviewBookmarkToggle = async ({
  jobInterviewId,
  isLoggedIn,
  isAlreadyBookmarked,
  onToggleSuccess,
  onToggleFail,
  onLoginCheckFail,
}: Props) => {
  if (isLoggedIn) {
    try {
      if (isAlreadyBookmarked) {
        // 북마크 취소할 경우
        await CommonAxios.delete(`/jobInterviews/${jobInterviewId}/favorite`);
      } else {
        // 북마크 추가할 경우
        await CommonAxios.post(`/jobInterviews/${jobInterviewId}/favorite`);
      }

      onToggleSuccess();
    } catch (error) {
      onToggleFail();
    }
  } else {
    onLoginCheckFail();
  }
};
