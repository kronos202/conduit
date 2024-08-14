import { User } from "./user.type";

export interface Follow {
  following: User;
  follower: User;
  id: number;
  followingId: number;
  followerId: number;
}
