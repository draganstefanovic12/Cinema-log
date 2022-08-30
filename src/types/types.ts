export type Media = {
  vote_average: number;
  original_name: string;
  name?: string;
  popularity: number;
  overview: string;
  title: string;
  poster_path: string;
  poster?: string;
  release_date: string;
  id: string;
  first_air_date: string;
  media_type: string;
  filter: any;
  createdAt?: string;
  character: string;
  job: string;
  profile_path: string;
  type: string;
};

export type MediaStringUndefined = {
  title?: string;
  original_name?: string;
  poster_path?: string;
  type?: string;
  media_type?: string | undefined;
  id: string | undefined;
  createdAt?: string | undefined;
  date?: string;
};

export type Result = {
  data: {
    results: Media;
  };
};

export type Credits = {
  credits: {
    crew: OtherCrew[];
    cast: Actors[];
  };
};

export type Actors = {
  combined_credits: any;
  name: string;
  profile_path: string;
  character: string;
  id: number;
  slice: any;
};

export type CastArr = {
  cast: Actors[];
};

export type CrewArr = {
  crew: OtherCrew[];
};

export type OtherCrew = {
  known_for_department: string;
  name: string;
  profile_path: string;
  id: number;
};

export type GenreMapped = {
  name: string;
  id: number;
};

export type List = {
  name: string;
  content: [];
  createdAt: string;
  description: string;
  username: string;
  _id: number;
  type?: string;
  id?: string;
  poster_path?: string;
};

export type ListToParse = {
  name: string;
  content: string;
  description: string;
  username: string;
  _id: number;
};

export type User = {
  created: string;
  avatar: string[];
  name: any;
  user: {
    feed: [];
  };
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

export type query = {
  query: string | undefined;
};

export type UserMedia = {
  watchlist: Media[];
  watched: Media[];
};

export type UserModel = {
  _id: number;
  username: string;
  notifications: [];
  avatar: string;
  movies: UserMedia;
  shows: UserMedia;
  name: string;
  followers: [];
  following: [];
};

export type UserResponse = {
  user: UserModel;
};

export type Notification = {
  id: number;
  type: string;
  content4: string;
  content: string | undefined;
  createdAt: string | number | Date;
  user: string | undefined;
  read: boolean;
  _id: number;
  content2: string;
  content3: string;
};
