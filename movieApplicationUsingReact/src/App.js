import React from "react";
import "./styles.css";
import Movie from "./Components/movie";

export default function App() {
  const [movieList, setMovieList] = React.useState([
    {
      id: 1,
      name: "No Smoking",
      rating: 9.0,
      watchlist: false,
      liked: false,
      cast: ["John Abraham", ", ", "Ayesha Takia"]
    },
    {
      id: 2,
      name: "Tenet",
      rating: 9.1,
      watchlist: false,
      liked: false,
      cast: ["John David Washington", ", ", "Robert Pattinson"]
    },
    {
      id: 3,
      name: "Usual Suspects",
      rating: 8.9,
      watchlist: false,
      liked: false,
      cast: ["Kevin Spacey", ",  ", "  Viggo Mortensen"]
    },
    {
      id: 4,
      name: "The Raincoat",
      rating: 8.7,
      watchlist: false,
      liked: false,
      cast: ["Aishwarya Rai", " ,", "Ajay Devgn"]
    }
  ]);
  const handledelete = (id) => {
    let newMovieList = movieList.filter((movie) => movie.id !== id);
    setMovieList(newMovieList);
  };

  const handleLike = (id) => {
    let likedMovies = movieList.filter((movie) => {
      if (movie.id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });
    setMovieList(likedMovies);
  };

  const handleWatchlist = (id) => {
    let likedMovies = movieList.filter((movie) => {
      if (movie.id === id) {
        movie.watchlist = !movie.watchlist;
      }
      return movie;
    });
    setMovieList(likedMovies);
  };

  return (
    <div className="Center">
      <div className="Container">
        {movieList.length === 0
          ? `The List is empty`
          : `There are ${movieList.length} items in the list`}
      </div>

      {movieList.length !== 0
        ? movieList.map((movie) => (
            <Movie
              pro={movie}
              key={movie.id}
              onDelete={handledelete}
              onLiked={handleLike}
              onWatchlist={handleWatchlist}
            />
          ))
        : null}
    </div>
  );
}
