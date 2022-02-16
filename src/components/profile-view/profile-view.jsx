import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// scss file
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Favorites: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  };

  getUserDetails = (token) => {
    const Username = localStorage.getItem('user');
    axios
      .get(`https://mymovie-backend-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },        
      })
        .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favorites: response.data.Favorites,
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://mymovie-backend-api.herokuapp.com/users/${Username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const data = response.data;
      // Update localStorage with the new username
      localStorage.setItem('user', data.Username);
      console.log(data);
      console.log(this.state.Username);
      alert('Profile is updated!');
      // Reload the page to make sure that the user can immediately start using their new details
      window.open(`/users/${data.Username}`, '_self');
    }).catch(error => {
      console.log('error updating user details')
    });
  };


  // Function for deleting user details. A delete request is made ot the API for this user
  deleteUserDetails() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://mymovie-backend-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

// Function for removing this movie from a users Favorites list. Makes a delete request to the server using information passed in through the props
onRemoveFavorite = (e, movie) => {
  const Username = localStorage.getItem('user');
  console.log(Username);
  const token = localStorage.getItem('token');
  axios
    .delete(
      `https://mymovie-backend-api.herokuapp.com/users/${Username}/favorites/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert(`${movie.title} was removed from your favorites.`);
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};


  // Render function to display items on the DOM
  render() {
    const { movies, onBackClick } = this.props;
    const { Favorites, Username, Email, Birthday, Password } = this.state;

    return (
      <div className="profile_view">
        {/* Card for displaying current user details */}
        <Card bg="secondary" text="light" border="light">
          <Card.Body>
            <Card.Title className="text-center" as= "h3">Profile of {Username}</Card.Title>
            <Card.Text><span className="profile_heading">Email: </span>{Email}</Card.Text>
            {/* Only display birthday section if a user has filled that out (since it's the only optional section) */}
            {this.Birthday && (
              <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(Birthday))}</Card.Text>
            )}
          </Card.Body>
        </Card>

        {/* Card for displaying the form which will be used to update user details */}
        <Card>
          <Card.Body>
            <Card.Title as= "h3">Update Profile</Card.Title>
            {/* noValidate prevents default HTML5 validation. validated is then used as part of Bootstraps validation process */}
            <Form noValidate validated={this.state.validated}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                {/* When the input is changed, call handleFieldChange to update the state variables as required */}
                <Form.Control name="Username" type="text" onChange={this.handleFieldChange} required />
                {/* Validation message which will only display on failed validation */}
                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control name="Password" type="password" onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control name="email" type="email" onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control name="Birthdate" type="date" onChange={this.handleFieldChange} />
              </Form.Group>

              {/* Button for updating the details which will call updateUserDetails (defined above) */}
              <Button variant="light" style={{ backgroundColor: "blue", color: "white" }} type="submit" onClick={this.updateUserDetails}>
                Update User Details
              </Button>
              {/* Button to go back to the previous view */}
              <Button onClick={() => onBackClick(null)} variant="light" style={{ backgroundColor: "grey", color: "white" }}>Back</Button>
              {/* Button for deleting the user. This will first open the Modal defined above */}
              <Button className="float-right" variant="light" style={{ backgroundColor: "red", color: "white" }} onClick={this.showModal}>
                Delete User Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Favorites Section*/}
        <Card bg="secondary" text="light" border="light" align="center" style={{ color: "white" }}>
          <Card.Title as= "h3"> Favorite Movies:</Card.Title>
          <Card.Body>
                {Favorites.length === 0 && (
                  <div className="text-center">No Favorite Movies</div>
                )}
                {Favorites.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      Favorites.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Container className="card-holder" key={movie._id}>
                          <Card className="favorite-movie">
                            <Card.Img crossOrigin='anonymous'
                              className="fav-poster"
                              variant="top"
                              src={movie.imagePath}
                            />
                            <Card.Body className="favorite-movie-body">
                              <Card.Title className="movie-title">
                                {movie.title}
                              </Card.Title>
                              <Button
                                size="sm"
                                variant="danger"
                                value={movie._id}
                                onClick={(e) => this.onRemoveFavorite(e, movie)}
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Container>
                      );
                    }
                  })}
              </Card.Body>
          {/* <Row>            
            {Favorites.map(movie => (
              <Col md={4} key={movie._id} className="my-2">
                <MovieCard movie={movie} />
              </Col>))}
          </Row> */}
        </Card>
      </div>
    );
  }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Actors: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birth: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
      imagePath: PropTypes.any.isRequired,
      featured: PropTypes.any.isRequired,
    })).isRequired,
  onBackClick: PropTypes.func.isRequired,
};



