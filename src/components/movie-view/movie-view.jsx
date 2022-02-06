import React from 'react';
//import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    // Create state variables that will be used to add/remove a movie from a users Favorites list
    this.state = {
      
      FavoriteMovies: [],
      userDetails: []
  }

    // Bind these additional functions that will get called by onClick events to 'this'
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

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
                      <Card.Img varient="top" src={movie.imagePath} className="big_image" />
                  </Col>
                  <Col xs={12} md={6}>
                      <Card.Title className="text-center">{movie.title}</Card.Title>
                      <Card.Text>{movie.description}</Card.Text>
                      {/* && operator here is an alternative to an if statement. If movie.Genre.Name exists, then it will render the Genre section. If it doesn't exist, it will skip */}
                      {movie.genre.name && (
                          <Card.Text className="genre_heading"><span className="genre_title">Genre: </span><Link style={{ color: "white" }} to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link></Card.Text>
                      )}
                      {movie.director.name && (
                          <Card.Text className="director_heading"><span className="director_title">Director: </span><Link style={{ color: "white" }} to={`/directors/${movie.director.name}`}>{movie.director.name}</Link></Card.Text>
                      )}
                      <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
                      {/* Use flag defined above to determine if we need an add or remove from Favorites button */}
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