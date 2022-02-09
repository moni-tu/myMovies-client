import React from 'react';
import axios from 'axios';

//import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Navbar, Nav, Form, Card, CardGroup} from 'react-bootstrap';

// Import React components
import { NavbarView } from '../navbar-view/navbar-view';
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
        selectedMovie: null, // is this needed?
        user: null
      }
    }
  
  // load movies from database
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // get movies
  getMovies(token){
    axios.get('https://mymovie-backend-api.herokuapp.com/mymovies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data,

      });
    })
    .catch(function(error) {
      console.log(error);
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
  //to log out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
  render() {
    const { movies, user } = this.state;
     
    return (
      <Router>
        {/* <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
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
        </Navbar> */}
        <Container/>
        <NavbarView/>
          <Row >
          <Route exact path="/" render={() => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );

            if (movies.length === 0) return <div className="main-view" />;
            
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }}/>

          <Route exact path= "/register" render= {() => {
            if (user) {
              return <Redirect to="/"/>;
            }
            return (
              <Col>
              <RegistrationView/>
              </Col>
            );
          }}/>

          <Route exact path="/mymovies/:movie_id" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movie_id)} user={user} onBackClick={() => history.goBack()} />
              </Col>
              )            
          }}/>

          <Route exact path="/genre/:name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView Genre={movies.find((m) => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
              </Col>
            )            
            }
          }/>

          <Route exact path="/director/:name" render={({ match }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
              <DirectorView Director={movies.find(m => m.director.name === match.params.name).director} />
            </Col>
            )          
          }}/>
        
          </Row>
        <Container/>
      </Router>
    
    );
  }
}
