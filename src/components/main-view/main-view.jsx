import React from 'react';
import axios from 'axios';

//import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Navbar, Nav, Form, Card, CardGroup} from 'react-bootstrap';

// Import React components
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

// Import React Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// import custom SCSS
import './main-view.scss';


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
    const { mymovies, user } = this.state;
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;
    // if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);
    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    // If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all movies will be returned
    
   /*  if (!user) return 
    <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (mymovies.length === 0) return <div className="main-view" />;
     */
    return (
      <Router>
        <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link style={{ color: "white" }} to={'/'}>
                Welcome to MyMovies
            </Link>
          </Navbar.Brand>
          {user && (
            <Navbar.Collapse className="justify-content-end">
                <Link to={`/users/${user}`} className="mr-2">
                    <Button variant="light" style={{ color: "white" }}>Profile for {user}</Button>
                </Link>
                <Button onClick={() => this.onLoggedOut()} variant="light" style={{ color: "white" }}>Logout</Button>
            </Navbar.Collapse> 
          )}
        </Navbar>

        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );

          if (mymovies.length === 0) return <div className="main-view" />;
          
          return mymovies.map(m => (
            <Col md={3} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }}/>

        <Route exact path="/mymovies/:movieId" render={({ match, history }) => {
          if (!user) return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );
          if (mymovies.length === 0) return <div className="main-view" />;
            return 
            <Col md={8}>
              <MovieView movie={mymovies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
            </Col>
        }}/>

        <Route exact path="/genre/:name" render={({ match, history }) => {
          if (!user) return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );
          if (mymovies.length === 0) return <div className="main-view" />;
          return 
            <Col md={8}>
              <GenreView genre={mymovies.find((m) => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
            </Col>
          }
        }/>

        <Route exact path="/director/:name" render={({ match }) => {
          if (!user) return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );
          if (mymovies.length === 0) return <div className="main-view" />;
          return 
          <Col md={8}>
            <DirectorView director={mymovies.find(m => m.director.name === match.params.name).director} />
          </Col>
        }}/>
      
        </Row>
      </Router>
    
    );
  }
}
export default MainView;