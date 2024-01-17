import { IMG_URL_PREFIX } from "../../api";
import classes from "./MovieItem.module.css";

function MovieItem({ movie, isUsingPoster, onSelectMovie }) {
  const movieClass = isUsingPoster
    ? `${classes.movie} ${classes.poster}`
    : `${classes.movie} ${classes.backdrop}`;

  const title = movie.name ? movie.name : movie.title;
  return (
    <div
      className={movieClass}
      onClick={() => {
        onSelectMovie(movie);
      }}
      data-id={movie.id}
    >
      <img
        src={`${IMG_URL_PREFIX}${
          isUsingPoster ? movie.poster_path : movie.backdrop_path
        }`}
        alt={title}
      />
    </div>
  );
}

export default MovieItem;
