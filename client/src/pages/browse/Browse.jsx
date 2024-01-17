import Banner from "../../components/Banner/index.jsx";
import Movies from "../../components/Movies";

import api from "./../../api.js";

const filteredEndPoints = [...Object.keys(api)].filter(
  (item) => item !== "fetchNetflixOriginals" && item !== "fetchSearch"
);

function Browse() {
  const movieList = filteredEndPoints.map((endPoint) => {
    let title;
    switch (endPoint) {
      case "fetchTrending":
        title = "Xu Hướng";
        break;
      case "fetchTopRated":
        title = "Xếp Hạng Cao";
        break;
      case "fetchActionMovies":
        title = "Hành Động";
        break;
      case "fetchComedyMovies":
        title = "Hài";
        break;
      case "fetchHorrorMovies":
        title = "Kinh Dị";
        break;
      case "fetchRomanceMovies":
        title = "Lãng Mạn";
        break;
      case "fetchDocumentaries":
        title = "Tài Liệu";
        break;
    }
    return (
      <Movies
        key={endPoint}
        url={api[endPoint]}
        title={title}
        isUsingPoster={false}
      />
    );
  });
  return (
    <div className="app">
      <Banner />
      {movieList}
    </div>
  );
}

export default Browse;
