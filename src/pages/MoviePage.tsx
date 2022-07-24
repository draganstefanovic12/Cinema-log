import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

interface Result {
  title: string;
  description: string;
  image: string;
}

export const MoviePage = () => {
  const iframe = useParams();
  const data = useFetch(`http://localhost:5000/imdb/${iframe.id}`);
  data && console.log(data);

  return (
    <div className="watch-container">
      <div></div>
      <iframe
        title="movie"
        src={`https://2embed.org/embed/${iframe.id}`}
      ></iframe>
    </div>
  );
};
