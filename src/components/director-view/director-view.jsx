import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container>
                <Br />
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
                        <Br />
                        <div className="backButton">
                            <Button size="md" variant="light" style={{ color: "white" }} onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                    </Card>
            </Container>
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