import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import custom SCSS
import './login-view.scss';

//Import React Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  // Declare hook for each input 
  const [ UsernameErr, setUsernameErr ] = useState('');
  const [ PasswordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!Username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(Username.length < 6){
      setUsernameErr('Username must be 6 characters long');
      isReq = false;
    }
    if(!Password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(Password.length < 8){
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://mymovie-backend-api.herokuapp.com/mymovies/login', {
        Username: Username,
        Password: Password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <div className="login-view">
    <Container fluid style={{paddingTop: '0.75rem'}}>
      <Row>
        <Col>
          <CardGroup>
            <Card bg="secondary" text="light" border="light">
              <Card.Body>
                <Card.Title>Welcome to MyMovies!</Card.Title>
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                      {/* code added here to display validation error */}
                      {UsernameErr && <p>{UsernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                      {/* code added here to display validation error */}
                      {UsernameErr && <p>{UsernameErr}</p>} 
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>                  
                    {/* <Link to={`/register`} className="float-right">
                      <Button variant="light" style={{ color: "white" }} type="button">No account? Click here to Register!</Button>
                    </Link> */}
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    </div> 
  );
}

LoginView.propTypes = {
  User: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};