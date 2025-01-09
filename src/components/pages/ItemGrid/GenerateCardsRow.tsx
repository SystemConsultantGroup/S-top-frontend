import {
  GalleryPreview,
  Props as GalleryPreviewProps,
} from "@/components/common/GalleryPreview/GalleryPreview";
import { ProjectCard } from "@/components/common/ProjectCard";
import { ProjectCardProps } from "@/components/common/ProjectCard/ProjectCard";
import { VideoCardProps, VideoCard } from "@/components/common/VideoCard/VideoCard";
import { DummyCard } from "./DummyCard";

type PropsType = ProjectCardProps | VideoCardProps | GalleryPreviewProps;

export function GenerateCardsRow({
  type,
  props,
  length,
  rowCount,
  cardWidth,
}: {
  type: string;
  props: PropsType[];
  length: number;
  rowCount: number;
  cardWidth: string;
}) {
  const dummyCount = rowCount - (length % rowCount);

  const cards = [...Array(length)].map((_, idx) => {
    if (type === "PROJECT") {
      const projectProps = props[idx] as ProjectCardProps;
      return <ProjectCard key={`project-${idx}`} width={cardWidth} {...projectProps} />;
    } else if (type === "TALK") {
      const talkProps = props[idx] as VideoCardProps;
      return (
        <div key={`talk-${idx}`} style={{ width: cardWidth }}>
          <VideoCard {...talkProps} />
        </div>
      );
    } else if (type === "GALLERY") {
      const galleryProps = props[idx] as GalleryPreviewProps;
      return <GalleryPreview key={`gallery-${idx}`} {...galleryProps} />;
    }
  });

  const dummyCards = Array.from({ length: dummyCount }, (_, idx) => (
    <DummyCard key={`dummy-${idx}`} width={cardWidth} />
  ));

  return [...cards, ...dummyCards];
}
