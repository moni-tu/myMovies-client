import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from './movie-sala.png';

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
        alert('No such user, check username/password or register')
      });
    }
  };

  return (
    
      //<Row>
        //<Col md={10}>
          //<CardGroup>
            
            <Card bg="primary" text="light" border="dark" style={{width:"750px", marginTop: "50px", backgroundImage: "url(/movie-sala.png)"}}>
              <Card.Body>
                <Card.Title style= {{textAlign: "center", marginTop: "20px", fontSize: "22px"}}>Welcome to MyMovies!</Card.Title>
                <Form style={{marginRight:"40px", marginLeft:"40px", marginTop: "20px"}}>
                  <Form.Group controlId="formUsername" style={{ marginBottom: "1px"}}>
                    <Form.Label class="card-subtitle text-muted">Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter username here"
                    onChange={e => setUsername(e.target.value)} />
                    {/* code added here to display validation error */}
                    {UsernameErr && <p>{UsernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label class="card-subtitle text-muted">Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter password here"
                    onChange={e => setPassword(e.target.value)} />
                    {/* code added here to display validation error */}
                    {PasswordErr && <p>{PasswordErr}</p>} 
                  </Form.Group>
                  <Button 
                  style= {{marginTop: "80px"}}
                  class= "btn btn-primary btn-block"
                  fontSize= "30px"
                  /* variant="primary" */ 
                  type="submit" 
                  onClick={handleSubmit}>
                    Submit
                  </Button>    
                  <div style= {{marginTop: "5px", marginBottom: "20px"}}>             
                    <Link to={`/register`} style={{textAlign: "center"}}>
                      No account? Click here to Register!
                    </Link>
                  </div> 
                </Form>
              </Card.Body>
              <img src={backgroundImage} alt="movie-sala"/>
            </Card>
          //</CardGroup>
        //</Col>
      //</Row> 
    
    
  );
}

LoginView.propTypes = {
  User: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};