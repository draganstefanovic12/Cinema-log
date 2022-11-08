import { Media } from "../MediaPage/types";

export type Result = {
  data: {
    results: Media;
  };
};

export type query = {
  query: string | undefined;
};

export type SearchSelection = "users" | "actors" | "media";
