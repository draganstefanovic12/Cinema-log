import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { useState } from "react";
import { CardMedia } from "@mui/material";
import favBg from "@/assets/fav-movie-bg.png";
import DebouncedSearch from "@/components/DebouncedSearch";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import MediaCard from "@/components/MediaCard/MediaCard";

type FavoriteCardsProps = {
  edit: boolean;
  media: Media;
  handleRemoveFavoriteMedia: (date: string) => void;
  handleAddFavoriteMedia: (media: Media) => void;
};

export const ProfileFavoriteCard = (props: FavoriteCardsProps) => {
  const [input, setInput] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const { media, handleRemoveFavoriteMedia, handleAddFavoriteMedia, edit } = props;

  const handleHover = () => {
    setHover(true);
  };

  const handleNoHover = () => {
    setHover(false);
  };

  const addFavoriteMedia = (media: Media) => {
    //wrapping this function with another one because of set input
    handleAddFavoriteMedia(media);
    setInput(false);
  };

  return (
    <>
      {edit ? (
        <div className="fav-edit-cont" onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
          <>
            {hover && media && (
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleRemoveFavoriteMedia(media!.createdAt!);
                }}
                className="fav-remove-icon"
              />
            )}
            <CardMedia
              src={media ? `https://image.tmdb.org/t/p/w500/${media!.poster_path}` : favBg}
              className="fav-edit-card"
              component="img"
            />
            {!media && hover && (
              <ControlPointOutlinedIcon onClick={() => setInput(!input)} className="fav-add-icon" />
            )}
          </>
          {input && <DebouncedSearch handleClick={addFavoriteMedia} />}
        </div>
      ) : (
        <Link className="profile-fav-link" to={`/${media!.type}/${media!.id}`}>
          <MediaCard src={`/w500/${media.poster_path}`} />
        </Link>
      )}
    </>
  );
};

export default ProfileFavoriteCard;
