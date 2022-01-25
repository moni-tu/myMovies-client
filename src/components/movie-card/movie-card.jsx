import React from 'react';
import PropTypes from 'prop-types';
// task 3.5 code
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
            // code task 3.5
            // <Card>
        //<Card.Img variant="top" src={movie.ImagePath} />
        //<Card.Body>
          //<Card.Title>{movie.Title}</Card.Title>
          //<Card.Text>{movie.Description}</Card.Text>
          //<Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        //</Card.Body>
      //</Card>
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
        imagePath: PropTypes.string.isRequired,
        featured: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };