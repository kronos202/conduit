import http from "@/lib/http";

export const FOLLOW_USER = "/followers";
export const UNFOLLOW_USER = "/followers";
export const GET_FOLLOWER = "/followers/follower";
export const GET_FOLLOWING = "/followers/following";

const followApi = {
  followUser(id: number) {
    return http.post(`${FOLLOW_USER}/${id}`);
  },
  unfollowUser(id: number) {
    return http.delete(`${UNFOLLOW_USER}/${id}`);
  },
  getFollower(id: number) {
    return http.get(`${GET_FOLLOWER}/${id}`);
  },
  getFollowing(id: number) {
    return http.get(`${GET_FOLLOWING}/${id}`);
  },
};

export default followApi;
