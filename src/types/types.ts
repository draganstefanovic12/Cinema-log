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
  setFavMovies?: React.Dispatch<React.SetStateAction<object[]>>;
  setContent?: React.Dispatch<React.SetStateAction<object[]>>;
};

export type ListItemComponentProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  name: string;
  children: string;
};

export type NewListProps = {
  user: string | undefined;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<any>>;
};

export type RemoveListProps = {
  list: {
    name: keyof List;
    content: object[];
    description: keyof List;
  };
  user: string | undefined;
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

export type Data = {
  data: {
    data: {
      crew?: [];
      cast?: [];
    };
  };
};

export type Actors = {
  name: string;
  profile_path: string;
  character: string;
};

export type OtherCrew = {
  known_for_department: string;
  name: string;
  profile_path: string;
};

export type FollowProps = {
  user: string | undefined;
  followedUser: string | undefined;
  followers: [];
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
  user: string | undefined;
};

export type ListToParse = {
  name: string;
  content: string;
  description: string;
  username: string;
  _id: number;
};

export type User = {
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

export type ProfileFeedProps = {
  feed: Feed[];
  name: string;
};

export type NotificationProps = {
  notifications: Notification[];
};

export type Notification = {
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
