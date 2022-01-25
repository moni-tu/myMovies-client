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
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
          }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.stringisRequired,
            Birth: PropTypes.string.isRequired,
          }),
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };