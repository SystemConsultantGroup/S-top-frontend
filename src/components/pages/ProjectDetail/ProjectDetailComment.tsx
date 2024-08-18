interface Props {
  projectId: string;
}

export function ProjectDetailComment({ projectId }: Props) {
  return <h3>comment box: {projectId}</h3>;
}
