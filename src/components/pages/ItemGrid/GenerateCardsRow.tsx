import {
  GalleryPreview,
  Props as GalleryPreviewProps,
} from "@/components/common/GalleryPreview/GalleryPreview";
import { ProjectCard } from "@/components/common/ProjectCard";
import { ProjectCardProps } from "@/components/common/ProjectCard/ProjectCard";
import { VideoCardProps, VideoCard } from "@/components/common/VideoCard_noQuiz/VideoCard";

type PropsType = ProjectCardProps | VideoCardProps | GalleryPreviewProps;

export function GenerateCardsRow({
  type,
  props,
  length,
}: {
  type: string;
  props: PropsType[];
  length: number;
}) {
  const cards = [...Array(length)].map((_, idx) => {
    if (type === "PROJECT") {
      const projectProps = props[idx] as ProjectCardProps;
      return <ProjectCard key={`project-${idx}`} {...projectProps} />;
    } else if (type === "TALK") {
      const talkProps = props[idx] as VideoCardProps;
      return (
        <div key={`talk-${idx}`}>
          <VideoCard {...talkProps} />
        </div>
      );
    } else if (type === "GALLERY") {
      const galleryProps = props[idx] as GalleryPreviewProps;
      return <GalleryPreview key={`gallery-${idx}`} {...galleryProps} />;
    }
  });
  return [...cards];
}
