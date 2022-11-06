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
  const response = await backendApi.post(`/lists/new`, list);
  return response.data;
};

export default backendApi;
