import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';

import MovieList from '../components/movie-list';
import CreateMovieModel from '../components/create-movie-model';

const Landing = () => {

const[show,setShow]=useState(false);

  return (
    <>

   <section className="movies-header">
  <Row className="align-items-center">
    <Col xs={12} md={8}>
      <p className="movies-header__subtitle">MOVIE COLLECTION</p>

      <h1 className="movies-header__title">
        Movie World
      </h1>

      <p className="movies-header__description">
        Discover, manage and explore your movie collection.
      </p>
    </Col>

    <Col xs={12} md={4} className="text-md-end">
      <Button
        className="add-movie-btn"
        onClick={() => setShow(true)}
      >
        + Add New Movie
      </Button>
    </Col>
  </Row>
</section>

    <MovieList/>
    <CreateMovieModel show={show} handleClose={()=>setShow(false)}/>

    </>
  )
}

export default Landing;

