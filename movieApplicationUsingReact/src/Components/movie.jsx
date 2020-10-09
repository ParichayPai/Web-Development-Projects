import React from "react";
import "./movie.css";

export default function Movie(props) {
  const { name, rating, cast, id, liked, watchlist } = props.pro;
  const { onDelete, onLiked, onWatchlist } = props;
  return (
    <div className="movieContainer">
      <div className="title"> {name}</div>
      <div>
        <span className="star">&#9733;</span> {rating}{" "}
        <button
          className={liked === true ? "like" : "unlike"}
          onClick={() => onLiked(id)}
        >
          Like!
        </button>
      </div>
      <div>Cast:- {cast}</div>
      <div>
        <button
          className={
            watchlist === false ? "addToWatchlist" : "addedToWatchlist"
          }
          onClick={() => onWatchlist(id)}
        >
          Add to WatchList
        </button>
      </div>
      <div className="buttonContainer">
        <button className="deleteButton" onClick={() => onDelete(id)}>
          {/* {" "} */}
          DELETE
          {/* {" "} */}
        </button>
      </div>
    </div>
  );
}
