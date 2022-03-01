import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Import React Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Import Custom CSS
import './registration-view.scss';

export function RegistrationView(props) {
    const [ Username, setUsername ] = useState('');
    const [ Password, setPassword ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ Birthday, setBirthday] = useState('');
    const [ values, setValues] = useState({
      UsernameErr: '',
      PasswordnameErr: '',
      EmailErr: '',
    })

    const validate = () => {
      let isReq = true;
      if(!Username){
       setValues({...values, UsernameErr: 'Username Required'});
       isReq = false;
      }else if(Username.length < 6){
        setValues('Username must be 6 characters long');
       isReq = false;
      }
      if(!Password){
        setValues({...values, passwordErr: 'Password Required'});
       isReq = false;
      }else if(Password.length < 8){
        setValues('Password must be 8 characters long');
       isReq = false;
      }
      if(!Email){
        setValues({...values, emailErr: 'Email Required'});
        isReq = false;
        ('Please user valid email')
      } else if(Email.indexOf('@') === -1){
        setValues({...values, emailErr: 'Please use valid email'})
        isReq = false;
      }
      return isReq;
  }

    // Modify state of MainView to be registered and logged in with new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq ) {
          console.log(Username, Password);
          axios.post(`https://mymovie-backend-api.herokuapp.com/users`, {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday,
            Favorites: []
          })
          .then((response) => {
            const data = response.data;
            console.log(data);
            alert('Registration Successful, please login!');
            // the argument _self makes the page open in the current tab
            window.open('/', '_self');
          })
          .catch(response => {
            console.error(response);
            alert('unable to register');
          });
        }
    };

    return (
      <Row className="mt-5">
      <Col md={10}>
        <Form>
          <h3>Sign Up</h3>
          <p></p>
          <Form.Group controlId='formUsername'>
            <Form.Label> Username:</Form.Label>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} />
                {values.UsernameErr&& <p>{values.UsernameErr}</p>}
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label> Password:</Form.Label>                
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} />
                {values.PasswordErr&& <p>{values.PasswordErr}</p>}
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Label> Email:</Form.Label>
                <Form.Control type="email" value={Email} onChange={e => setEmail(e.target.value)} />
                {values.EmailErr&& <p>{values.EmailErr}</p>}
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Col>
      </Row>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
    }),
};