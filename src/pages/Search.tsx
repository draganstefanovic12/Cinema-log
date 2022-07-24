import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";

interface Result {
  id: string;
  image: string;
  title: string;
}

export const Search = () => {
  const query = useParams();

  const data = useFetch(`http://localhost:5000/imdb/${query.query}`);
  data && console.log(data);

  return (
    <div className="main-container">
      {data &&
        data.data.results.map((result: Result) => (
          <Link to={`/movie/${result.id}`}>
            <div className="movie-cont">
              <img className="poster" alt="" src={result.image} />
              <p>{result.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};
