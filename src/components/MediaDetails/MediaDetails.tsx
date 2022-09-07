import { Cast } from "../Cast/Cast";
import { Crew } from "../Crew/Crew";
import { Credits } from "../../types/types";

export const MediaDetails = ({ credits }: Credits) => {
  return (
    <div className="cast-crew-cont">
      <Cast cast={credits.cast} />
      <Crew crew={credits.crew} />
    </div>
  );
};