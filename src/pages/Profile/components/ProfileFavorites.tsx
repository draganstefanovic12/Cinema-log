import { Media } from "@/pages/MediaPage/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { updateFavorites } from "@/features/api/backendApi";
import { Fragment, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import ProfileFavoriteCard from "./ProfileFavoritesCard";

const ProfileFavorites = () => {
  const { user } = useAuth();
  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>();
  const [favoriteMedia, setFavoriteMedia] = useState<Media[]>([]);
  const queryClient = useQueryClient();
  const params = useParams();

  useEffect(() => {
    user && setFavoriteMedia(user.favorites);
  }, [user]);

  const handleAddFavoriteMedia = (movie: Media) => {
    setFavoriteMedia!((currMovies: Media[]) => [...currMovies, movie]);
  };

  const handleRemoveFavoriteMedia = async (date: string) => {
    setFavoriteMedia(favoriteMedia!.filter((media: Media) => media.createdAt !== date));
  };

  const mutateUserFavorites = useMutation(updateFavorites, {
    onSuccess: () => {
      setEdit(!edit);
      queryClient.invalidateQueries("currentUser");
    },
  });

  const handleFinishEditing = () => {
    mutateUserFavorites.mutate(favoriteMedia);
  };

  const handleEditing = () => {
    setEdit(true);
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleNoHover = () => {
    setHover(false);
  };

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleNoHover}
      className="favorite-container"
    >
      <div className="fav-text-cont">
        <Typography className="favorite-movies" variant="h6">
          Favorites
        </Typography>
        {user?.username && user.username === params.user && hover && (
          <Typography
            variant="subtitle1"
            className="favorite-movies fav-edit"
            onClick={edit ? handleFinishEditing : handleEditing}
          >
            {edit ? "Finish editing" : "Edit"}
          </Typography>
        )}
      </div>
      <div className="favorite-container-card">
        {edit
          ? [...Array(6).keys()].map((i) => (
              <Fragment key={i}>
                <ProfileFavoriteCard
                  edit={edit}
                  handleRemoveFavoriteMedia={handleRemoveFavoriteMedia}
                  handleAddFavoriteMedia={handleAddFavoriteMedia}
                  media={favoriteMedia[i] && favoriteMedia[i]}
                />
              </Fragment>
            ))
          : favoriteMedia &&
            favoriteMedia.map((media: Media) => (
              <Fragment key={media.createdAt!}>
                <ProfileFavoriteCard
                  edit={edit}
                  handleRemoveFavoriteMedia={handleRemoveFavoriteMedia}
                  handleAddFavoriteMedia={handleAddFavoriteMedia}
                  media={media}
                />
              </Fragment>
            ))}
      </div>
    </Container>
  );
};

export default ProfileFavorites;
