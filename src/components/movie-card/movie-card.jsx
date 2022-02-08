import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Import Custom CSS
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    
    return (
      <Card>
        <Card.Img variant="top" crossOrigin='anonymous' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
            <Link to={'/mymovies/${movie._id}'}>
              <Button variant="link">Open</Button>
            </Link>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Actors: PropTypes.array.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
      }),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.any.isRequired,
    Featured: PropTypes.any.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};