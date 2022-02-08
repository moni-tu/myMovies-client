import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// Import React Bootstrap components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import custom SCSS
import './movie-view.scss';

export class MovieView extends React.Component {
  /* constructor(props) {
    super(props);
    // Create state variables that will be used to add/remove a movie from a users Favorites list
    this.state = {
      
      FavoriteMovies: [],
      userDetails: []
  }

    // Bind these additional functions that will get called by onClick events to 'this'
    //this.addFavorite = this.addFavorite.bind(this);
    //this.removeFavorite = this.removeFavorite.bind(this);
  } */

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
      document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
      document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <Card bg="secondary" text="light" border="light">
            <Card.Body>
                <Row>
                    <Col xs={12} md={6}>
                        <Card.Img variant="top" crossOrigin='anonymous' src={movie.ImagePath} ClassName="" />
                    </Col>
                    <Col xs={12} md={6}>
                        <Card.Title className="text-center">{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        {movie.Genre.Name && (
                            <Card.Text className="genre_heading"><span className="genre_title">Genre: </span><Link style={{ color: "white" }} to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></Card.Text>
                        )}
                        {movie.Director.Name && (
                            <Card.Text className="director_heading"><span className="director_title">Director: </span><Link style={{ color: "white" }} to={`/director/${movie.Director.Name}`}>{movie.Director.Name}</Link></Card.Text>
                        )}
                        <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
                        {isFavoriteNew ? (
                            <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.removeFavorite}>
                                Remove from Favorites
                            </Button>
                        ) : (
                            <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.addFavorite}>
                                Add to Favorites
                            </Button>
                        )}
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card> 
    );
  }
}