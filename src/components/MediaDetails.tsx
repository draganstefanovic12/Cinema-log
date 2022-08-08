import { useFetch } from "../hooks/useFetch";
import { Cast } from "./Cast";
import { Crew } from "./Crew";

interface MovieDetailsProps {
  type: string | undefined;
  id: string | undefined;
}

export const MediaDetails = ({ type, id }: MovieDetailsProps) => {
  const data = useFetch(`http://localhost:5000/imdb/cast/${type}/${id}/`);

  return (
    <div className="cast-crew-cont">
      <Cast data={data} />
      <Crew data={data} />
    </div>
  );
};
