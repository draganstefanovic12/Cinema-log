import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Homepage = () => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:5000/imdb", {
        headers: { Authorization: `Bearer ${user!.token}` },
      });
      const json = await response.json();
      console.log(json);

      if (user) {
        fetchMovies();
      }
    };
  }, [user]);

  return (
    <section>
      <h1>EYYY!</h1>
    </section>
  );
};
