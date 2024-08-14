type QueryKey = [string, ...unknown[]];

const createQueryKey = (key: string, ...params: unknown[]): QueryKey => [
  key,
  ...params,
];

export const queryKeys = {
  getAllArticlesByUserId: (userId: number) =>
    createQueryKey("get-all-articles-by-userId", userId),
  getSlugArticles: (slug: string) => createQueryKey("get-slug-articles", slug),
  getAllFavoriteArticles: () => createQueryKey("get-all-favorite-articles"),
  getAllArticles: () => createQueryKey("get-all-articles"),
  getAllMyArticles: () => createQueryKey("get-all-my-articles"),
  getAllTagArticles: (tag: string) =>
    createQueryKey("get-all-tag-articles", tag),
  getUserByUserId: (userId: number) =>
    createQueryKey("get-user-by-user-id", userId),
  me: () => createQueryKey("me"),
  allComments: () => createQueryKey("all-comments"),
  getFollower: (id: number) => createQueryKey("get-follower", id),
  getFollowing: (id: number) => createQueryKey("get-following", id),
  allTag: () => createQueryKey("all-tag"),
};
