import http from "@/lib/http";

export const CREATE_COMMENT = "/comment/create";
export const GETALL_COMMENT = "/comment/byArticle";
export const DELETE_COMMENT = "/comment";
export const UPDATE_COMMENT = "/comment";

const commentApi = {
  createComment(slug: string, content: string) {
    return http.post(`${CREATE_COMMENT}/${slug}`, JSON.stringify({ content }));
  },
  getAllComments(slug: string) {
    return http.get(`${GETALL_COMMENT}/${slug}`);
  },
  deleteComment(slug: string, commentId: number) {
    return http.delete(`${DELETE_COMMENT}/${slug}/${commentId}`);
  },
  updateComment(slug: string, commentId: number, content: string) {
    return http.patch(
      `${UPDATE_COMMENT}/${slug}/${commentId}`,
      JSON.stringify({ content })
    );
  },
};

export default commentApi;
