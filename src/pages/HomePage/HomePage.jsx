import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendMovies } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import css from "./HomePage.module.css";

const notify = () =>
  toast.error("Hmm... Please reload page.", {
    style: {
      border: "1px solid #000000",
      padding: "16px",
      color: "#000000",
    },
    iconTheme: {
      primary: "#000000",
      secondary: "#f5f5f5",
    },
  });

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      setLoading(true);
      try {
        const data = await fetchTrendMovies();
        setTrendMovies(data.results);
      } catch (error) {
        notify();
      } finally {
        setLoading(false);
      }
    }
    getTrendMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>

      {loading ? <Loader /> : <MovieList movies={trendMovies} />}
    </div>
  );
}
