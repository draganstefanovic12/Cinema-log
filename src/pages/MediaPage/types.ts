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

export type GenreMapped = {
  name: string;
  id: number;
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
