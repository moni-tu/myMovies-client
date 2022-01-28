import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
          <Card>
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
  };