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
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username);
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://mymovie-backend-api.herokuapp.com/users/${username}/movies/${movie._id}`,
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  };

  getUserDetails = (token) => {
    const username = localStorage.getItem('user');
    axios
      .get(`https://mymovie-backend-api.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favorites: response.data.favoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put('https://mymovie-backend-api.herokuapp.com/users/${username}', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      birthday: this.state.birthdate
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const data = response.data;
      // Update localStorage with the new username
      localStorage.setItem('user', data.username);
      console.log(data);
      console.log(this.state.username);
      alert('Profile is updated!');
      // Reload the page to make sure that the user can immediately start using their new details
      window.open(`/users/${data.username}`, '_self');
    }).catch(error => {
      console.log('error updating user details')
    });
  };


  // Function for deleting user details. A delete request is made ot the API for this user
  deleteUserDetails() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete('https://mymovie-backend-api.herokuapp.com/users/${Username}', {
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

  // Render function to display items on the DOM
  render() {
    const { movies } = this.props;
    const { favorites, username, email, birthday } = this.state;

    return (
      <div className="profile_view">
        {/* Card for displaying current user details */}
        <Card bg="secondary" text="light" border="light">
          <Card.Body>
            <Card.Title className="text-center">Profile of {this.state.userDetails.Username}</Card.Title>
            <Card.Text><span className="profile_heading">Email: </span>{this.state.userDetails.Email}</Card.Text>
            {/* Only display birthday section if a user has filled that out (since it's the only optional section) */}
            {this.state.userDetails.Birthdate && (
              <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.userDetails.Birthday))}</Card.Text>
            )}
          </Card.Body>
        </Card>

        {/* Card for displaying the form which will be used to update user details */}
        <Card>
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
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
              <Button variant="light" style={{ color: "white" }} type="submit" onClick={this.updateUserDetails}>
                Update User Details
              </Button>
              {/* Button to go back to the previous view */}
              <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
              {/* Button for deleting the user. This will first open the Modal defined above */}
              <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.showModal}>
                Delete User Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Favorites Section*/}
        <Card bg="secondary" text="light" border="light" align="center" style={{ color: "white" }}>
          <Card.Title>{this.state.userDetails.Username}'s Favorites:</Card.Title>
          <Row>
            {/* Iterate over the FavoriteMoviesArray and create a MovieCard component for each one */}
            {/* At this stage, I don't have a way to remove a Favorite movie from the ProfileView page. It must be done from the MovieView page, although I will likely change this in the future */}
            {FavoriteMoviesArray.map(movie => (
              <Col md={4} key={movie._id} className="my-2">
                <MovieCard movie={movie} />
              </Col>))}
          </Row>
        </Card>
      </div>
    );
  }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birthday: PropTypes.string,
      }),
      imagePath: PropTypes.string,
      featured: PropTypes.any,
    })
  ),
  onBackClick: PropTypes.func.isRequired
};



