import http from "@/lib/http";

export const ARTICLE_CREATE = "/article/create";
export const ARTICLE_GETALL = "/article/all";
export const ARTICLE_FAVORITE = "/article/favorite";
export const ARTICLE_OWN = "/article/myArticles";

const articleApi = {
  create(body: {
    title: string;
    description: string;
    content: string;
    tags: string[];
  }) {
    return http.post(ARTICLE_CREATE, body);
  },

  getAll() {
    return http.get(ARTICLE_GETALL);
  },
  getFavoriteArticles() {
    return http.get(ARTICLE_FAVORITE);
  },
  getMyArticles() {
    return http.get(ARTICLE_OWN);
  },
};

export default articleApi;
