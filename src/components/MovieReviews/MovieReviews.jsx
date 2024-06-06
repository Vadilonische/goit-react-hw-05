import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/api";
import css from "./MovieReviews.module.css";

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

export default function MovieReviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getMovieReviews = async (movieId) => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviewsList(data.results);
      } catch (error) {
        notify();
      }
    };
    getMovieReviews(movieId);
  }, [movieId]);

  return (
    <main>
      <ul className={css.movieReviewsList}>
        {reviewsList.length > 0 ? (
          reviewsList.map(({ author, content, id }) => (
            <li key={id}>
              <p>{author}</p>
              <p>{content}</p>
            </li>
          ))
        ) : (
          <p>Sorry, there is no information</p>
        )}
      </ul>
    </main>
  );
}
