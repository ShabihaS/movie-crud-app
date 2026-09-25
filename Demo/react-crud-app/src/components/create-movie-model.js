import React from 'react';
import { Modal } from 'react-bootstrap';

import EditMovie from './edit-movie';

const CreateMovieModel = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      className="movie-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Movie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EditMovie onCancel={props.handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateMovieModel;