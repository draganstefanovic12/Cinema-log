import { Media } from "@/pages/MediaPage/types";
import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:5001",
});

//handles preflight error
axios.interceptors.response.use(null!, (error) => {
  if (error && error.message === "Network Error") {
    throw new Error(`Potential network CORS preflight error at ${error.config.url}`);
  }
  throw error;
});

backendApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  config.headers!["Authorization"] = `${user.username} ${user.token}`;
  return config;
});

//sets notifications to read when a user opens notification dropdown
export const updateNotificationsToRead = async () => {
  const response = await backendApi.post("/user/notifications/");
  return response.data;
};

//debounced search
export const debouncedSearch = async (query: string | undefined) => {
  const response = await backendApi.get(`/imdb/multi/${query}`);
  return response.data;
};

//adds favorites
export const updateFavorites = async (media: Media[]) => {
  const response = await backendApi.post("/user/addfavorite", media);
  return response.data;
};

//gets current user information for context
export const getCurrentUser = async () => {
  const response = await backendApi.get("/user/current/user");
  return response.data;
};

//gets user information on profiles
export const getUser = async (username: string | undefined) => {
  const response = await backendApi.get(`/user/${username}`);
  return response.data;
};

//follows/unfollows users
export const handleFollowOrUnfollow = async (username: string | undefined) => {
  await backendApi.post(`/user/follow/${username}`);
};

//selects 1 random watched movie and gets similar movies to recommend
export const getRecommendations = async (movie: string) => {
  const response = await backendApi.get(`/imdb/recommendations/${movie}`);
  return response.data;
};

//adds a new list
export const addNewList = async (list: any) => {
  const response = await backendApi.post("/lists/new", list);
  return response.data;
};

//gets new lists to showcase on homepage
export const getHomepageLists = async () => {
  const response = await backendApi.get("/lists/homepage");
  return response.data;
};

//fetches movies to show on homepage
export const getTopRatedOrTrending = async (query: string) => {
  const response = await backendApi.get(`/imdb/${query}`);
  return response.data;
};

//fetches 1 tv show/movie
export const getMedia = async (type: string | undefined, id: string | undefined) => {
  const response = await backendApi.get(`/imdb/${type}/${id}`);
  return response.data;
};

interface UpdateType {
  update_type: "tv watchlist" | "movie watchlist" | "tv watched" | "movie watched";
}

export const updateUserList = async (media: UpdateType & any) => {
  const poster = `https://image.tmdb.org/t/p/w500${media.poster}`;
  const options = { name: media.name, id: media.id, type: media.update_type, poster: poster };

  const response = await backendApi.post(`/user/updatelist`, options);
  return response.data;
};

export const getList = async (name: string | undefined) => {
  const response = await backendApi.get(`/lists/list/${name}`);
  return response.data;
};

export const likeList = async (username: string) => {
  const response = await backendApi.post(`/user/likelist/${username}`);
  return response.data;
};

export const removeList = async (name: string) => {
  const response = await backendApi.delete(`/lists/delete/${name}`);
  return response.data;
};

export const recommendMedia = async (movie: string, username: string) => {
  const response = await backendApi.post(`/user/recommendation/${username}`, { movie: movie });
  return response.data;
};

export const checkPasswordChange = async (oldPw: string, newPw: string) => {
  const response = await backendApi.post(`/user/checkpassword/${oldPw}/${newPw}`);
  return response.data;
};

export const fetchMediaPerson = async (id: string | undefined) => {
  const response = await backendApi.get(`/imdb/person/${id}`);
  return response.data;
};

export const search = async (query: string) => {
  const response = await backendApi.get(`/imdb/${query}`);
  return response.data;
};

export const searchUsers = async (query: string) => {
  const response = await backendApi.get(`/user/${query}`);
  return response.data;
};

export const handleAllLists = async () => {
  const response = await backendApi.get("/lists/all");
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("fileupload", file);

  const response = await backendApi.post("/image/upload", formData);
  return response.data;
};

export default backendApi;
