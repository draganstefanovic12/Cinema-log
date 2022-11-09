import { Media } from "@/pages/MediaPage/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { updateFavorites } from "@/features/api/backendApi";
import { useQueryClient, useMutation } from "react-query";
import ProfileFavoriteCard from "./ProfileFavoritesCard";

interface FavoriteProps {
  favorites: Media[] | undefined;
}

const ProfileFavorites = ({ favorites }: FavoriteProps) => {
  const { user } = useAuth();
  const [hover, setHover] = useState<boolean>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [favoriteMedia, setFavoriteMedia] = useState<Media[]>(favorites! || []);
  const queryClient = useQueryClient();
  const params = useParams();

  useEffect(() => {
    setFavoriteMedia(favorites!);
  }, [favorites]);

  const handleAddFavoriteMedia = (movie: Media) => {
    setFavoriteMedia!((currMovies: Media[]) => [...currMovies, movie]);
  };

  const handleRemoveFavoriteMedia = async (date: string) => {
    setFavoriteMedia(favoriteMedia!.filter((media: Media) => media.createdAt !== date));
  };

  const mutateUserFavorites = useMutation(updateFavorites, {
    onSuccess: () => {
      setIsEditing(!isEditing);
      queryClient.invalidateQueries("currentUser");
    },
  });

  const handleFinishEditing = () => {
    mutateUserFavorites.mutate(favoriteMedia);
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleNoHover = () => {
    setHover(false);
  };

  return (
    <Container onMouseEnter={handleHover} onMouseLeave={handleNoHover} className="favorite-container">
      <div className="fav-text-cont">
        <Typography className="favorite-movies" variant="h6">
          Favorites
        </Typography>
        {user?.username && user.username === params.user && hover && (
          <Typography
            variant="subtitle1"
            className="favorite-movies fav-edit"
            onClick={isEditing ? handleFinishEditing : handleEditing}
          >
            {isEditing ? "Finish editing" : "Edit"}
          </Typography>
        )}
      </div>
      <div className="favorite-container-card">
        {isEditing
          ? [...Array(6).keys()].map((i) => (
              <ProfileFavoriteCard
                key={i}
                isEditing={isEditing}
                handleRemoveFavoriteMedia={handleRemoveFavoriteMedia}
                handleAddFavoriteMedia={handleAddFavoriteMedia}
                media={favoriteMedia[i] && favoriteMedia[i]}
              />
            ))
          : favoriteMedia &&
            favoriteMedia.map((media: Media) => (
              <ProfileFavoriteCard
                key={media.id}
                isEditing={isEditing}
                handleRemoveFavoriteMedia={handleRemoveFavoriteMedia}
                handleAddFavoriteMedia={handleAddFavoriteMedia}
                media={media}
              />
            ))}
      </div>
    </Container>
  );
};

export default ProfileFavorites;
