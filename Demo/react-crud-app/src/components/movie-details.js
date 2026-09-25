import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import NoImage from "../no-image.png";
import { Link, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieid } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieid) {
      fetch(process.env.REACT_APP_API_URL + "/movie/" + movieid)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === true) {
            setMovie(res.data);
          }
        })
        .catch(() => alert("Error occurred while fetching movie"));
    }
  }, [movieid]);

 return (
  <Row className="movie-detail-page">
    {movie && (
      <>
        <Col xs={12} md={5}>
          <div className="movie-detail__poster-wrapper">
            <img
              src={movie.coverImage || NoImage}
              alt={movie.title}
              className="movie-detail__poster"
            />
          </div>
        </Col>

        <Col xs={12} md={7}>
          <div className="movie-detail__content">
            <p className="movie-detail__subtitle">MOVIE DETAILS</p>

            <h1 className="movie-detail__title">
              {movie.title}
            </h1>

            <p className="movie-detail__description">
              {movie.description || "No description available."}
            </p>

            <div className="movie-detail__info">
              <div className="movie-detail__info-item">
                <span className="movie-detail__label">
                  Language
                </span>
                <span className="movie-detail__value">
                  {movie.language || "N/A"}
                </span>
              </div>

              <div className="movie-detail__info-item">
                <span className="movie-detail__label">
                  Release Date
                </span>
                <span className="movie-detail__value">
                  {movie.releaseDate
                    ? movie.releaseDate.split("T")[0]
                    : "N/A"}
                </span>
              </div>

              <div className="movie-detail__info-item">
                <span className="movie-detail__label">
                  Cast
                </span>
                <span className="movie-detail__value">
                  {movie.actors?.map((x) => x.name).join(", ") ||
                    "No cast information"}
                </span>
              </div>
            </div>

            <Link to="/" className="movie-detail__back">
              ← Back to Movies
            </Link>
          </div>
        </Col>
      </>
    )}
  </Row>
);
};

export default MovieDetail;

