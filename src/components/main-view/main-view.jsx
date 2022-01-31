import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import './main-view.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MainView extends React.Component {
    constructor(){
        // initialises the component's state
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null
        }
      }

  getMovies(token){
    axios.get('https://mymovie-backend-api.herokuapp.com/mymovies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* User registers */
  onRegistration(registration) {
    this.setState({
        registration,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, registration } = this.state;
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;
    // if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);
    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view"/>

    // If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all movies will be returned
    return (
      <Router>
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
          <Row className='justify-content-md-center'>
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md= {3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md= {8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />
          </Row>
      </Router>
    
    );
  }
}
export default MainView;