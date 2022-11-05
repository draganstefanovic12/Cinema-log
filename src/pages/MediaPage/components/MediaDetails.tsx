import Cast from "./MediaPageCast";
import Crew from "./MediaPageCrew";
import { Credits } from "@/types/types";

const MediaDetails = ({ credits }: Credits) => {
  return (
    <div className="cast-crew-cont">
      <Cast cast={credits.cast} />
      <Crew crew={credits.crew} />
    </div>
  );
};

export default MediaDetails;
