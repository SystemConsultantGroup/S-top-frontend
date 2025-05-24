import {
  GalleryPreview,
  Props as GalleryPreviewProps,
} from "@/components/common/GalleryPreview/GalleryPreview";
import { ProjectCard } from "@/components/common/ProjectCard";
import { ProjectCardProps } from "@/components/common/ProjectCard/ProjectCard";
import { VideoCardProps, VideoCard } from "@/components/common/VideoCard/VideoCard";

type PropsType = ProjectCardProps | VideoCardProps | GalleryPreviewProps;
type CardType = "PROJECT" | "TALK" | "GALLERY";

export function GenerateCardsRow({
  type,
  props,
  length,
}: {
  type: CardType;
  props: PropsType[];
  length: number;
}) {
  const cards = [...Array(length)].map((_, idx) => {
    switch (type) {
      case "PROJECT": {
        const projectProps = props[idx] as ProjectCardProps;
        return <ProjectCard key={`project-${idx}`} {...projectProps} />;
      }

      case "TALK": {
        const talkProps = props[idx] as VideoCardProps;
        return (
          <div key={`talk-${idx}`}>
            <VideoCard {...talkProps} />
          </div>
        );
      }

      case "GALLERY": {
        const galleryProps = props[idx] as GalleryPreviewProps;
        return <GalleryPreview key={`gallery-${idx}`} {...galleryProps} />;
      }

      default:
        return null;
    }
  });

  return [...cards];
}
