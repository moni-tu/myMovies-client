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
        <Card.Img className="movie-img" variant="top" crossOrigin='anonymous' src={movie.imagePath} />
      <Card.Body>
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          {/* <Card.Text>{movie.description}</Card.Text> */}
            <Link to={`/mymovies/${movie._id}`}>
              <Button variant="outline-secondary" size="sm" >Open</Button> {/* onClick={() => onMovieClick(movie)} */}
            </Link>
            {/* <Button className="fav-button" variant="link" size='sm' onClick={(e) => this.addFavoriteMovie(e, movie)}> Add to favorites</Button> */}
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