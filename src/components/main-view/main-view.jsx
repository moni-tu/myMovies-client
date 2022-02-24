import React from 'react';
import axios from 'axios';

//import Redux components
import { connect } from 'react-redux';
// #0
import { setMovies } from '../../actions/actions';
// we haven't written this one yet
//import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

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


class MainView extends React.Component {
  constructor(){
      // initialises the component's state
      super();
      this.state = {
        //movies: [],
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
      //this.setState({
        //movies: response.data,

      //});
      this.props.setMovies(response.data);
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
    const { user } = this.state;
    const { movies } = this.props;
     
    return (
      <Router>
        <NavbarView user= { user }/>
        <Container/>        
          <Row className='main-view justify-content-md-center' >
          <Route exact path="/" render={() => {
            // if there is no user, Login view is rendered. if a user is logged in, its details are passed as a prop to LoginView
            if (!user) return (
            <Row>
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col> 
            </Row>
            )
            // before the movies have been loaded
            if (movies.length === 0) return <div className="main-view"></div>   
              return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }}/>

          <Route path= "/register" render= {() => {  
            return (
              <Col>
              <RegistrationView/>
              </Col>
            );
          }}/>

          <Route exact path= "/login" render= {() => {
            if (!user) return 
            <Row>
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col> 
            </Row>
              
              if (movies.length === 0) return <div className="main-view"></div> 
            return (
              <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
              </Col>
            );
          }}/>

          <Route path= {`/users/${user}`} render= {({match, history}) => {
            if (!user) return <Redirect to="/"/>
            return (
              <Col>
              <ProfileView movies={movies} user={user} onBackClick={()=> history.goBack()}/>
              </Col>
            );
          }}/>

          {/* <Route path= {`/user-update/${user}`} render= {({match, history}) => {
            if (!user) return <Redirect to="/"/>
            return (
              <Col>
              <UserUpdate user={user} onBackClick={()=> history.goBack()}/>
              </Col>
            );
          }}/> */}

          <Route exact path="/mymovies/:movie_id" render={({ match, history }) => {
            if (!user) return 
            <Row>
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col> 
            </Row>
            
            if (movies.length === 0) return <div className="main-view"/>;
              return (
                <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movie_id)} user={user} onBackClick={() => history.goBack()} />
              </Col>
              )            
          }}/>

          <Route exact path="/genre/:name" render={({ match, history }) => {
            if (!user) { return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            }
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView movie={movies.find((m) => m.genre.name === match.params.name)} onBackClick={() => history.goBack()} />
              </Col>
            )            
            }
          }/>

          <Route exact path="/director/:name" render={({ match, history }) => {
            if (!user) { return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            }
            if (movies.length === 0) return <div className="main-view"/>;
            return (
              <Col md={8}>
              <DirectorView movie={movies.find(m => m.director.name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
            )          
          }}/>
        
          </Row>
        <Container/>
      </Router>
    
    );
  }
}
