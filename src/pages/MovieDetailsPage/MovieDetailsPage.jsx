import { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchMovieDetails } from "../../api/api";
import toast from "react-hot-toast";

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

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        notify();
      }
    };
    getMovieDetails();
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetails;
  const scoreToFixed = vote_average ? Number(vote_average).toFixed(2) : "N/A";

  return (
    <main>
      <div>
        <Link to={location.state?.from ?? "/"}>Go back</Link>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : defaultImg
          }
          loading="lazy"
          width={250}
          alt="Movie poster"
        />
        <div>
          <h2>{original_title}</h2>
          <p>User score: {scoreToFixed}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul>
            {genres &&
              genres.length > 0 &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to="cast" state={{ ...location.state }}>
                Cast
              </Link>
            </li>
            <li>
              {" "}
              <Link to="reviews" state={{ ...location.state }}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
