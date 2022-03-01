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
  constructor(props) {
    super(props);
  } 

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios
      .post(
        `https://mymovie-backend-api.herokuapp.com/users/${Username}/Favorites/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'POST',
        }
      )
      .then((response) => {
        alert(`Added ${this.props.movie.title} to your favorites!`);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <Card bg="secondary" text="light" border="primary">
            <Card.Body>
                <Row>
                    <Col xs={12} md={6}>
                        <Card.Img variant="top" crossOrigin='anonymous' src={movie.imagePath} className="movie-poster" />
                    </Col>
                    <Col xs={12} md={6}>
                        <Card.Title className="text-center" as="h3">{movie.title}</Card.Title>
                        <Card.Text>{movie.description}</Card.Text>
                        {movie.genre.name && (
                        <Card.Text className="genre_heading"><span className="genre_name">Genre: </span><Link style={{ color: "white"}} to={`/genre/${movie.genre.name}`}>{movie.genre.name}</Link></Card.Text>
                        )}
                        {movie.director.name && (
                        <Card.Text className="director_heading"><span className="director_name">Director: </span><Link style={{ color: "white" }} to={`/director/${movie.director.name}`}>{movie.director.name}</Link></Card.Text>
                        )}
                        <Button onClick={() => onBackClick(null)} variant="outline-secondary" size='sm' className = "button">Back</Button>
                    
                        <Button className="btn-outline-primary" variant="outline-primary" size='md' onClick={(e) => this.addFavoriteMovie(e, movie)}>
                            Add to Favorites
                        </Button>
                        
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card> 
    );
  }
}