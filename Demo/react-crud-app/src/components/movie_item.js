import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NoImage from '../no-image.png';

const MovieItem = ({ data, deleteMovie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <Row className="align-items-center">
        <Col xs={12} sm={3} md={2}>
          <img
            src={data.coverImage || NoImage}
            className="movie-card__image"
            alt={data.title}
          />
        </Col>

        <Col xs={12} sm={9} md={10}>
          <div className="movie-card__content">
            <h3 className="movie-card__title">
              {data.title}
            </h3>

            <p className="movie-card__actors">
              <strong>Actors:</strong>{' '}
              {data.actors?.map(x => x.name).join(', ') || 'No actors listed'}
            </p>

            <div className="movie-card__actions">
              <Button
                className="movie-card__details"
                onClick={() => navigate('/details/' + data.id)}
              >
                See Details
              </Button>

              <Button
                variant="outline-secondary"
                onClick={() => navigate('/edit/' + data.id)}
              >
                Edit
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => deleteMovie(data.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MovieItem;