import { Link } from "react-router-dom";
import { Media } from "@/pages/MediaPage/types";
import { useState } from "react";
import MediaCard from "@/components/MediaCard/MediaCard";
import DebouncedSearch from "@/components/DebouncedSearch";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

interface FavoriteCardsProps {
  isEditing: boolean;
  media: Media;
  handleRemoveFavoriteMedia: (date: string) => void;
  handleAddFavoriteMedia: (media: Media) => void;
}

export const ProfileFavoriteCard = (props: FavoriteCardsProps) => {
  const [input, setInput] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const { media, handleRemoveFavoriteMedia, handleAddFavoriteMedia, isEditing } = props;

  const handleHover = () => {
    setHover(true);
  };

  const handleNoHover = () => {
    setHover(false);
  };

  const handleToggleInput = () => {
    setInput(!input);
  };

  const addFavoriteMedia = (media: Media) => {
    //wrapping this function with another one because of set input
    handleAddFavoriteMedia(media);
    setInput(false);
  };

  const removeFavoriteMedia = () => {
    handleRemoveFavoriteMedia(media!.createdAt!);
  };

  return isEditing ? (
    <div className="fav-edit-cont" onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
      {hover && media && (
        <HighlightOffOutlinedIcon onClick={removeFavoriteMedia} className="fav-remove-icon" />
      )}
      <MediaCard src={media ? `/w500/${media!.poster_path}` : undefined} style={{ height: "12.4rem" }} />
      {!media && hover && <ControlPointOutlinedIcon onClick={handleToggleInput} className="fav-add-icon" />}
      {input && <DebouncedSearch handleClick={addFavoriteMedia} />}
    </div>
  ) : (
    <Link className="profile-fav-link" to={`/${media!.type}/${media!.id}`}>
      <MediaCard src={`/w500/${media.poster_path}`} />
    </Link>
  );
};

export default ProfileFavoriteCard;
