export interface CommentDto {
  id: number;
  projectId: number;
  userName: string;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}
