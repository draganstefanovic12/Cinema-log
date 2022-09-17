import Cast from "../Cast";
import Crew from "../Crew";
import { Credits } from "../../types/types";

const MediaDetails = ({ credits }: Credits) => {
  return (
    <div className="cast-crew-cont">
      <Cast cast={credits.cast} />
      <Crew crew={credits.crew} />
    </div>
  );
};

export default MediaDetails;
