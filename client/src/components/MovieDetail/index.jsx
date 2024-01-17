import { useEffect, useState } from "react";

import { API_KEY, IMG_URL_PREFIX_ORIGINAL } from "../../api";
import classes from "./MovieDetail.module.css";

function MovieDetail({ movie, isTvShow }) {
  const [detailVideo, setDetailVideo] = useState(null);

  // Some movies or tv shows have "name" instead of "title" and "first_air_date" instead of "release_date"
  const title = movie.name ? movie.name : movie.title;
  const date = movie.release_date ? movie.release_date : movie.first_air_date;
  const vote = movie.vote_average.toFixed(1);

  useEffect(() => {
    const url = isTvShow
      ? `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`;

    async function getVideo() {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Can not fetch videos");
        const data = await resp.json();

        const filteredVideos = data.results.filter(
          (video) =>
            (video.type === "Trailer" || video.type === "Teaser") &&
            video.site === "YouTube"
        );

        // sort the list of videos in order to get the one with type "Trailer" (if there is one available)
        const video = filteredVideos.sort((a, b) => {
          if (a.type > b.type) return -1;
          else return 1;
        })[0];
        setDetailVideo(video);
      } catch (error) {
        console.log(error.message);
      }
    }

    getVideo();
  }, [movie]);

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <div className={classes.title}>{title}</div>
        <hr />
        <div className={classes.general}>
          {movie.release_date ? (
            <p>Release Date: {date}</p>
          ) : (
            <p>First Air Date: {date}</p>
          )}
          <p>Vote: {vote}/10</p>
        </div>
        <div className={classes.overview}>{movie.overview}</div>
      </div>
      {detailVideo ? (
        <div className={classes.video}>
          <iframe
            src={`https://www.youtube.com/embed/${detailVideo.key}`}
          ></iframe>
        </div>
      ) : (
        <div className={classes.image}>
          <img src={IMG_URL_PREFIX_ORIGINAL + movie.backdrop_path} />
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
