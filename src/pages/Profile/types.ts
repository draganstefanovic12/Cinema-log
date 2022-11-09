import { List } from "../List/types";
import { Media } from "../MediaPage/types";

export type User = {
  created: string;
  avatar: string[];
  name: any;
  user: {
    feed: [];
  };
};

export type UserMedia = {
  watchlist: Media[];
  watched: Media[];
};

export type UserModel = {
  _id: number;
  username: string;
  notifications: [];
  lists: List[];
  avatar: string;
  movies: UserMedia;
  shows: UserMedia;
  name: string;
  favorites: Media[];
  followers: [];
  following: [];
  followedUsersFeed: Feed[];
};

export type UserResponse = {
  user: UserModel;
};

export type Feed = {
  user: string;
  content: string;
  content2: string;
  content3: string;
  created: string;
  name: string;
  sort: any;
  id: string;
  type: string;
};
