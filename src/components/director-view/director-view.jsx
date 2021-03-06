import React from "react";
import PropTypes from "prop-types";

// Import React components
import { LoginView } from '../login-view/login-view';
/* import { DirectorView } from '../director-view/director-view'; */

//import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card } from 'react-bootstrap';

// Import React Bootstrap Components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

// Import custom SCSS
import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movie } = this.props;
        return (
            <Router>
                
                        <Card bg="secondary" text="light"  border="info" align="center">                            
                            <Card.Body>
                            <Card.Header className="card-header" as="h3">{movie.director.name} </Card.Header>                            
                            <Card.Text>{movie.director.bio}</Card.Text>       
                            <Card.Text> Birthday: {movie.director.birth}</Card.Text>                          
                                
                                                           
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