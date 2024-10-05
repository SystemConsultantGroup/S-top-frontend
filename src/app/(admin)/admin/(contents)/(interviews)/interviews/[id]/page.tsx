import { PageHeader } from "@/components/common/PageHeader";
import { InterviewEditFrom } from "@/components/pages/InterviewForm";

export default function AdminTalkEdit({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="대담 영상 수정" />
      <InterviewEditFrom interviewID={parseInt(params.id)}></InterviewEditFrom>
    </>
  );
}
