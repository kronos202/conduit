export const queryKeys = {
  users: () => ["users"],
  user: (userId: number) => ["user", userId],
  posts: () => ["posts"],
  post: (postId: number) => ["post", postId],
  comments: (postId: number) => ["comments", postId],
  comment: (commentId: number) => ["comment", commentId],
};
