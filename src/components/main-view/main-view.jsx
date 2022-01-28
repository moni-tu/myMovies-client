import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import './main-view.scss';

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

componentDidMount(){
  axios.get('https://mymovie-backend-api.herokuapp.com/mymovies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
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
onLoggedIn(user) {
  this.setState({
    user
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
      <Container>
          <div className="main-view">
          {selectedMovie
            ?( 
              <Row className='justify-content-md-center'>
                <Col md= {8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row>
            )
            :(
            <Row className='justify-content-md-center'>
              {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))}
            </Row>
            )
          }
          </div>
      </Container>
    
  );
}
}
export default MainView;