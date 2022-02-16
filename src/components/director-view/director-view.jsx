import React from "react";
import PropTypes from "prop-types";

// Import React components
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';

//import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card } from 'react-bootstrap';

// Import React Bootstrap Components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

// Import custom SCSS
import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movie } = this.props;
        return (
            <Router>
                
                        <Card bg="secondary" text="light" border="light" align="center">                            
                            <Card.Body>
                            <Card.Title>Director</Card.Title>                            
                                <div className="movie-director">
                                <span className="label">Name: </span>
                                <span className="value">{movie.director.name}</span>
                                <div>
                                    <span className="label">Bio: </span>
                                    <span className="value">{movie.director.bio}</span>
                                </div>
                                <div>
                                    <span className="label">Birth Date: </span>
                                    <span className="value">{movie.director.birth}</span>
                                </div>
                                </div>                            
                                <div className="backButton">
                                    <Button size="md" variant="light" style={{ color: "white", backgroundColor: "grey"}} onClick={() => { onBackClick(null); }}>Back</Button>
                                </div>
                            </Card.Body>
                        </Card>                    
            </Router>
        );  
    }
}


 DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birth: PropTypes.string.isRequired,
      }),
      onBackClick: PropTypes.func.isRequired
}; 