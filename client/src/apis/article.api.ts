import http from "@/lib/http";
import {
  CreateArticleBodyType,
  UpdateArticleBodyType,
} from "@/schemaValidations/article.schema";

export const ARTICLE_CREATE = "/article/create";
export const ARTICLE_GETALL = "/article/all";
export const ARTICLE_FAVORITE = "/article/favorite";
export const ARTICLE_OWN = "/article/myArticles";
export const ARTICLE_TAG = "/article/byTag";
export const ARTICLE_USERID = "/article/user";
export const ARTICLE_TOGGLE_FAVORITE = "/article/toggleFavorite";
export const ARTICLE_SLUG = "/article";
export const ARTICLE_DELETE = "/article";
export const ARTICLE_UPDATE = "/article";
export const ALL_TAG = "/tag/allTag";

const articleApi = {
  create(body: CreateArticleBodyType) {
    return http.post(ARTICLE_CREATE, body);
  },
  remove(slug: string) {
    return http.delete(`${ARTICLE_DELETE}/${slug}`);
  },
  update(slug: string, body: UpdateArticleBodyType) {
    return http.patch(`${ARTICLE_UPDATE}/${slug}`, body);
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
  getArticlesByUserId(id: number) {
    return http.get(`${ARTICLE_USERID}/${id}`);
  },
  getTagArticles(tagName: string) {
    return http.get(ARTICLE_TAG, { params: { tagName } });
  },
  getArticleSlug(slug: string) {
    return http.get(`${ARTICLE_SLUG}/${slug}`);
  },
  postToggleFavorite(id: number) {
    return http.post(`${ARTICLE_TOGGLE_FAVORITE}/${id}`);
  },
};

export default articleApi;
