import { useEffect } from "react";
import { useState } from "react";

import MovieItem from "./../MovieItem";
import classes from "./Movies.module.css";
import MovieDetail from "../MovieDetail";

function Movies({ title, url, isUsingPoster, isTvShow = false }) {
  const [movies, setMovies] = useState([]);
  const [chooseedMovie, setChoosedMovie] = useState(null);

  const movieListStyle = isUsingPoster ? classes.show : classes.movies;

  function choosingMovieHandler(movie) {
    setChoosedMovie((prevState) => {
      if (prevState?.id === movie.id) return null;
      else return movie;
    });
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Can not fetch movies");
        const resultObj = await resp.json();
        setMovies(resultObj.results);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchMovies();
  }, [url]);

  const movieList = movies.map((movie) =>
    movie.backdrop_path && movie.poster_path ? (
      <MovieItem
        key={movie.id}
        movie={movie}
        isUsingPoster={isUsingPoster}
        onSelectMovie={choosingMovieHandler}
      />
    ) : null
  );

  return (
    <div>
      {title && <h2 className={classes.title}>{title}</h2>}
      <div className={movieListStyle}>{movieList}</div>
      {chooseedMovie && (
        <MovieDetail movie={chooseedMovie} isTvShow={isTvShow} />
      )}
    </div>
  );
}

export default Movies;
