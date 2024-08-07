import http from "@/lib/http";
import { CreateArticleBodyType } from "@/schemaValidations/article.schema";

export const ARTICLE_CREATE = "/article/create";
export const ARTICLE_GETALL = "/article/all";
export const ARTICLE_FAVORITE = "/article/favorite";
export const ARTICLE_OWN = "/article/myArticles";
export const ARTICLE_TAG = "/article/byTag";
export const ALL_TAG = "/tag/allTag";

const articleApi = {
  create(body: CreateArticleBodyType) {
    return http.post(ARTICLE_CREATE, body);
  },

  getAll() {
    return http.get(ARTICLE_GETALL);
  },
  getAllTags() {
    return http.get(ALL_TAG);
  },
  getFavoriteArticles() {
    return http.get(ARTICLE_FAVORITE);
  },
  getMyArticles() {
    return http.get(ARTICLE_OWN);
  },
  getTagArticles(tagName: string) {
    return http.get(ARTICLE_TAG, { params: { tagName } });
  },
};

export default articleApi;
