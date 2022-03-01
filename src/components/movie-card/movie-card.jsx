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
    const { movie } = this.props;

    return (
      <Card border= "dark">
        <Card.Img variant="fluid" crossOrigin='anonymous' src={movie.imagePath} />
      <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          {/* <Card.Text>{movie.description}</Card.Text> */}
            <Link to={`/mymovies/${movie._id}`}>
              <Button variant="outline-secondary" size="sm" >Open</Button> {/* onClick={() => onMovieClick(movie)} */}
            </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onMovieClick: PropTypes.func,
};