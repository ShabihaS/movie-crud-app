import React, { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import NoImage from '../no-image.png';
import AsyncSelect from 'react-select/async';
import { useParams, useNavigate } from 'react-router-dom';

const EditMovie = ({ onCancel }) => {
  const { movieid } = useParams();
  const navigate = useNavigate();

 const [movie, setMovie] = useState({ actors: [] });
const [actors, setActors] = useState([]);
const [validated, setValidated] = useState(false);
const [imagePreview, setImagePreview] = useState(NoImage);

  useEffect(() => {
    if (movieid) {
      fetch(process.env.REACT_APP_API_URL + "/movie/" + movieid)
        .then(res => res.json())
        .then(res => {
          if (res.status === true) {
            let movieData = res.data;

            if (movieData.releaseDate) {
              movieData.releaseDate = movieData.releaseDate.split('T')[0];
            }

            setMovie({ ...movieData, actors: movieData.actors || [] });
            setImagePreview(movieData.coverImage || NoImage);
            setActors(
              (movieData.actors || []).map(x => ({ value: x.id, label: x.name }))
            );
          }
        })
        .catch(() => alert("Error occurred while fetching movie"));
    }
  }, [movieid]);

 const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  // Show selected local image immediately
  const localPreview = URL.createObjectURL(file);
  setImagePreview(localPreview);

  const form = new FormData();
  form.append("imageFile", file);

  fetch(process.env.REACT_APP_API_URL + "/Movie/upload-movie-poster", {
    method: "POST",
    body: form,
  })
    .then(res => res.json())
    .then(data => {
      console.log("Upload response:", data);

      if (data.profileImage) {
        // Save the real backend image URL
        setMovie(prev => ({
          ...prev,
          coverImage: data.profileImage,
        }));

        // Use backend URL for preview
        setImagePreview(data.profileImage);
      } else {
        console.error("No profileImage returned from upload");
      }
    })
    .catch(error => {
      console.error("Error in file upload:", error);
    });
};
  const handleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const method = movie.id ? "PUT" : "POST";
    const url = process.env.REACT_APP_API_URL + "/movie";

    const movieToPost = {
      Id: movie.id,
      Title: movie.title,
      Description: movie.description,
      ReleaseDate: movie.releaseDate,
      Language: movie.language,
      CoverImage: movie.coverImage,
      Actors: actors.map(a => a.value),
    };

    fetch(url, {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieToPost),
    })
      .then(async res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();

        if (data.status === true) {
          alert(method === "PUT" ? "Updated successfully" : "Created successfully");
          navigate("/");
        } else {
          throw new Error(data.message || "Save failed");
        }
      })
      .catch(err => {
        alert("Error in saving data: " + err.message);
      });
  };

  const handleFieldChange = (event) => {
  const { name, value } = event.target;
  setMovie(prev => ({ ...prev, [name]: value }));
};

 const promiseOptions = (inputValue) => {
  console.log("Searching actors:", inputValue);

  return fetch(
    process.env.REACT_APP_API_URL + "/Person/Search/" + inputValue
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("Actor search response:", res);

      if (res.status === true && res.data.length > 0) {
        return res.data.map((x) => ({
          value: x.id,
          label: x.name,
        }));
      }

      return [];
    })
    .catch((error) => {
      console.error("Actor search error:", error);
      return [];
    });
};

  const multiSelectChange = (data) => {
    setActors(data);
    const people = data.map(x => ({ id: x.value, name: x.label }));
    setMovie(prev => ({ ...prev, actors: people }));
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSave}>
      <Form.Group className="movie-upload">
  <Form.Label className="movie-upload__label">
    Movie Poster
  </Form.Label>

  <div className="movie-upload__preview">
   <Image
  src={imagePreview}
  className="movie-upload__image"
  alt="Movie poster preview"
/>
  </div>

  <div className="movie-upload__input">
    <Form.Control
      type="file"
      accept="image/*"
      onChange={handleFileUpload}
    />
  </div>

  <Form.Text className="movie-upload__help">
    Choose an image from your computer for the movie poster.
  </Form.Text>
</Form.Group>

      <Form.Group controlId='formMovieTitle'>
        <Form.Label>Movie Title</Form.Label>
        <Form.Control
          name='title'
          value={movie.title || ''}
          required
          type='text'
          autoComplete='off'
          placeholder="Enter Movie name"
          onChange={handleFieldChange}
        />
        <Form.Control.Feedback type='invalid'>
          Please enter movie name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formMovieDescription'>
        <Form.Label>Movie Description</Form.Label>
        <Form.Control
          name='description'
          value={movie.description || ''}
          required
          as="textarea"
          rows={3}
          placeholder="Enter Movie description"
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group controlId='formMovieReleaseDate'>
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          name='releaseDate'
          value={movie.releaseDate || ''}
          required
          type='date'
          onChange={handleFieldChange}
        />
        <Form.Control.Feedback type='invalid'>
          Please enter release date
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formMovieActors'>
        <Form.Label>Actors</Form.Label>
       <AsyncSelect
  cacheOptions
  isMulti
  value={actors}
  loadOptions={promiseOptions}
  onChange={multiSelectChange}
  placeholder="Search and select actors..."
  noOptionsMessage={() => "No actors found"}
  styles={{
    control: (base) => ({
      ...base,
      minHeight: '45px',
      borderColor: '#cbd5e1',
      boxShadow: 'none',
    }),

    input: (base) => ({
      ...base,
      color: '#1e293b',
    }),

    singleValue: (base) => ({
      ...base,
      color: '#1e293b',
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e2e8f0',
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: '#1e293b',
    }),

    option: (base, state) => ({
      ...base,
      color: '#1e293b',
      backgroundColor: state.isFocused ? '#ede9fe' : '#ffffff',
      cursor: 'pointer',
    }),

    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  }}
/>
      </Form.Group>

      <Form.Group controlId='formMovieLanguage'>
        <Form.Label>Movie Language</Form.Label>
        <Form.Control
          name='language'
          value={movie.language || ''}
          required
          type='text'
          placeholder="Enter Movie language"
          onChange={handleFieldChange}
        />
      </Form.Group>

     <div className="movie-form__actions">
  <Button type="submit" className="movie-form__save">
    {movie && movie.id > 0 ? "Update Movie" : "Create Movie"}
  </Button>

  <Button
    type="button"
    className="movie-form__cancel"
     onClick={onCancel || (() => navigate("/"))}
  >
    Cancel
  </Button>
</div>
    </Form>
  );
};

export default EditMovie;






