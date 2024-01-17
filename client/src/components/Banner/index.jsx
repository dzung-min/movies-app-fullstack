import { useState } from "react";
import { useEffect } from "react";

import classes from "./Banner.module.css";
import api, { IMG_URL_PREFIX_ORIGINAL } from "../../api";
import Movies from "../Movies";

export default function Banner() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getRandomMovie() {
      try {
        const resp = await fetch(api.fetchNetflixOriginals);
        if (!resp.ok) throw new Error("Can not fetch movies");
        const data = await resp.json();
        setMovies(data.results);
      } catch (error) {
        console.log(error.message);
      }
    }
    getRandomMovie();
  }, []);

  const randomMovie = movies[Math.floor(Math.random() * movies.length - 1)];

  return randomMovie ? (
    <>
      <div className={classes.banner}>
        <div className={classes.image}>
          <img
            src={`${IMG_URL_PREFIX_ORIGINAL}${randomMovie["backdrop_path"]}`}
            alt={randomMovie.name}
          />
        </div>
        <div className={classes.actions}>
          <h1>{randomMovie.name}</h1>
          <div>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p>{randomMovie.overview.slice(0, 120) + "..."}</p>
        </div>
      </div>
      <Movies
        title={null}
        url={api.fetchNetflixOriginals}
        isUsingPoster={true}
        isTvShow={true}
      />
    </>
  ) : null;
}
