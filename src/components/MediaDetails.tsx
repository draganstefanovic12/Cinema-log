import { useFetch } from "../hooks/useFetch";
import { Cast } from "./Cast";
import { Crew } from "./Crew";
import { MediaStringUndefined } from "../types/types";

export const MediaDetails = ({ media_type, id }: MediaStringUndefined) => {
  const data = useFetch(`http://localhost:5000/imdb/cast/${media_type}/${id}/`);

  return (
    <div className="cast-crew-cont">
      <Cast data={data} />
      <Crew data={data} />
    </div>
  );
};
