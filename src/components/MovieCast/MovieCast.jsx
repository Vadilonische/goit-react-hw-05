import { fetchMovieCast } from "../../api/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";

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

export default function MovieCast() {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCast = async (movieId) => {
      try {
        const data = await fetchMovieCast(movieId);
        setCastList(data.cast);
      } catch (error) {
        notify();
      }
    };
    getMovieCast(movieId);
  }, [movieId]);

  return (
    <ul className={css.movieCastList}>
      {castList.length > 0 ? (
        castList.map(({ id, name, profile_path, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : defaultImg
              }
              alt="actor"
              loading="lazy"
              width="120"
            />
            <h3>{name}</h3>
            <p> Character: {character}</p>
          </li>
        ))
      ) : (
        <p>Sorry, there is no information</p>
      )}
    </ul>
  );
}
