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

export type MediaProps = {
  movies: {
    watchlist: [];
    watched: Media[];
  };
  type: string | undefined;
  user: string | undefined;
};

export type MediaStringUndefined = {
  title?: string;
  media_type: string | undefined;
  id: string | undefined;
  createdAt?: string | undefined;
};

export type AddFavoriteMediaProps = {
  setInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setFavMovies?: React.Dispatch<React.SetStateAction<Media[] | undefined>>;
  setContent?: React.Dispatch<React.SetStateAction<object[]>>;
};

export type ListItemComponentProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  name: string;
  children: string;
};

export type NewListProps = {
  usr: string | undefined;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<any>>;
};

export type RemoveListProps = {
  list: {
    name: keyof List;
    content: object[];
    description: keyof List;
  };
  usr: string | undefined;
};

export type HomepageMovieCardsProps = {
  query: string;
  name: string;
};

export type PaginationProps = {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  data?: {
    data: {
      total_pages: number;
    };
  };
  count?: number;
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

export type FollowProps = {
  usr: string | undefined;
  followedUser: string | undefined;
  followers: [];
  typ?: string;
  getClass?: string;
  //typ serves for profile followers/following, it only works if i reverse the comparison
};

export type GenreMapped = {
  name: string;
  id: number;
};

export type GenreProps = {
  data: {
    genres: GenreMapped[];
  };
  type: string | undefined;
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

export type ListsProps = {
  usr: string | undefined;
};

export type ListToParse = {
  name: string;
  content: string;
  description: string;
  username: string;
  _id: number;
};

export type User = {
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
  avatar: string;
  movies: UserMedia;
  shows: UserMedia;
  name: string;
  followers: [];
  following: [];
};

export type ProfileFeedProps = {
  feed: Feed[];
  name: string;
  favorites?: any;
};

export type NotificationProps = {
  notifications: Notification[];
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

export type NavPopperProps = {
  button: any;
  children: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DialogComponentProps = {
  children: [];
  name: string;
  currUser: string;
  followComparison: [];
  number: number;
};
