import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { fetchSearchMovie } from "../../api/api";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";

const notify = (txt) =>
  toast.error(`${txt}`, {
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

export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieName === "") {
      notify("Please, enter the keyword.");
      return;
    }
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyWord = async (movieName) => {
      try {
        await fetchSearchMovie(movieName).then((data) => {
          if (!data.results.length) {
            setLoading(false);
            setError(true);
            return notify("We did not find it. Try changing the request.");
          }

          setError(false);
          setMoviesList(data.results);
        });
      } catch (error) {
        notify("Error! Try again!");
      } finally {
        setLoading(false);
      }
    };
    getMovieByKeyWord(movieName);
  }, [movieName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({
      movieName: searchForm.elements.movieName.value,
    });
    searchForm.reset();
  };

  return (
    <main>
      <div>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p>We did not find it. Try changing the request.</p>}
        <ul className={css.moviesPageList}>
          {moviesList.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.original_title || movie.name}
                </Link>
              </li>
            );
          })}
          {loading && <Loader />}
        </ul>
      </div>
    </main>
  );
}
