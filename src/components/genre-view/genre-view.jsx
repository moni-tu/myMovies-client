import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import "./genre-view.scss";



export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick, mymovies } = this.props;
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
                <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
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