import { HelmetTitle } from "../components/HelmetTitle";
import { useFetch } from "../hooks/useFetch";

export const Homepage = () => {
  const data = useFetch("http://localhost:5000/imdb/trending");
  data && console.log(data);
  return (
    <section>
      <HelmetTitle title={"Home"} />
    </section>
  );
};
