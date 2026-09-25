import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const CreateEditActor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Actor data passed when editing
  const actorData = location.state?.data || null;

  const [actor, setActor] = useState({
    id: actorData?.id || null,
    name: actorData?.name || "",
    dateOfBirth: actorData?.dateOfBirth
      ? actorData.dateOfBirth.split("T")[0] 
      : "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const method = actor.id ? "PUT" : "POST";
    const url = process.env.REACT_APP_API_URL + "/person";

    // Build payload
    const actorToPost = {
      name: actor.name,
      dateOfBirth: actor.dateOfBirth
        ? new Date(actor.dateOfBirth).toISOString()
        : null,
    };

    if (actor.id) {
      actorToPost.id = actor.id; 
    }

    console.log("Sending actor:", actorToPost);

    fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actorToPost),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();

        if (data.status === true) {
          alert(
            method === "PUT"
              ? "Actor updated successfully"
              : "Actor created successfully"
          );
          navigate("/actors");
        } else {
          throw new Error(data.message || "Save failed");
        }
      })
      .catch((err) => {
        alert("Error saving actor: " + err.message);
      });
  };

 return (
  <Row className="actor-form-page">
    <Col md={{ span: 6, offset: 3 }}>
      <div className="actor-form">
        <div className="actor-form__header">
          <p className="actor-form__subtitle">ACTOR MANAGEMENT</p>

          <h2 className="actor-form__title">
            {actor.id ? "Edit Actor" : "Create Actor"}
          </h2>

          <p className="actor-form__description">
            {actor.id
              ? "Update the actor details below."
              : "Add a new actor to your movie collection."}
          </p>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSave}>
          <Form.Group className="mb-4" controlId="actorName">
            <Form.Label>Actor Name</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Enter actor name"
              name="name"
              value={actor.name}
              onChange={handleChange}
            />

            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="actorDob">
            <Form.Label>Date of Birth</Form.Label>

            <Form.Control
              required
              type="date"
              name="dateOfBirth"
              value={actor.dateOfBirth}
              onChange={handleChange}
            />

            <Form.Control.Feedback type="invalid">
              Please provide a date of birth.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="actor-form__actions">
            <Button className="actor-form__save" type="submit">
              {actor.id ? "Update Actor" : "Create Actor"}
            </Button>

            <Button
              className="actor-form__cancel"
              type="button"
              onClick={() => navigate("/actors")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  </Row>
);
};

export default CreateEditActor;




