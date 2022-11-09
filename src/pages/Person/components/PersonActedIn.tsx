import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/system";
import { Actors, Media, OtherCrew } from "@/pages/MediaPage/types";
import MediaCard from "@/components/MediaCard/MediaCard";

interface PersonActedInProps {
  props: Actors & OtherCrew;
}

const PersonActedIn = ({ props }: PersonActedInProps) => {
  const {
    known_for_department,
    combined_credits: { crew, cast },
  } = props;

  const [actorOrDirector, setActorOrDirector] = useState<Media[]>(
    known_for_department === "Acting" ? cast : crew
  );

  const handleActor = () => {
    setActorOrDirector(cast);
  };

  const handleCrew = () => {
    setActorOrDirector(crew);
  };

  //filters persons autobiography and shows only movies/shows
  const filterConditions = ["Self", "Himself", "archive"];

  return (
    <>
      {cast.length > 5 && (
        <ListItem
          className="person-profession-selection"
          onClick={handleActor}
          button
          sx={{
            backgroundColor: actorOrDirector === cast ? "#161b22" : "#181e26",
          }}
        >
          Actor
        </ListItem>
      )}
      {crew.length > 5 && (
        <ListItem
          className="person-profession-selection"
          sx={{
            backgroundColor: actorOrDirector === crew ? "#161b22" : "#181e26",
          }}
          onClick={handleCrew}
          button
        >
          Director
        </ListItem>
      )}
      <Container className="person-cards">
        {actorOrDirector
          .filter(({ character, popularity, job }: Media) =>
            character
              ? filterConditions.some((el) => !character.includes(el)) && popularity > 10 && character !== ""
              : job === "Director"
          )
          .sort((a: Media, b: Media) => b.popularity - a.popularity)
          .slice(0, 20)
          .map(({ id, media_type, poster_path, name, title, character }: Media, i) => (
            <Link className="person-media-link" key={i} to={`/${media_type}/${id}`}>
              <MediaCard src={`/w500/${poster_path}`} style={{ height: "12.5rem" }} />
              <p>
                {name} {title}
              </p>
              <p>{character}</p>
            </Link>
          ))}
      </Container>
    </>
  );
};

export default PersonActedIn;
