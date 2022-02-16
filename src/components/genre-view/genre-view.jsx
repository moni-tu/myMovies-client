import React from 'react';
import PropTypes from 'prop-types';

// Import React components
import { GenreView } from '../genre-view/genre-view';

// Import React Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

// Import custom SCSS
import "./genre-view.scss";



export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick, movie } = this.props;
   return (
      <>
        <Card bg="secondary" text="light" border="light" align="center">
            <Card.Body>
                <Card.Title>Genre</Card.Title>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.genre.name}</span>
                </div>
                <div>
                    <span className="label">Description: </span>
                    <span className="value">{movie.genre.description}</span>
                </div>
                <Link to={`/`}>
                <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white", backgroundColor: "grey" }}>Back</Button>
              </Link>
          </Card.Body>
        </Card>
     
      </>        
   )}
}
                
GenreView.propTypes = {             
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired
}