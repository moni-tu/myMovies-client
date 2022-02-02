import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Col, Row, Container} from 'react-bootstrap';
import axios from 'axios';
import { Link, Router } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');
    const [ values, setValues] = useState({
      nameErr: '',
      usernameErr: '',
      passwordnameErr: '',
      emailErr: '',
    })

    const validate = () => {
      let isReq = true;
      if(!username){
       setUsernameErr('Username Required');
       isReq = false;
      }else if(username.length < 6){
       setUsernameErr('Username must be 6 characters long');
       isReq = false;
      }
      if(!password){
       setPasswordErr('Password Required');
       isReq = false;
      }else if(password.length < 8){
       setPasswordErr('Password must be 8 characters long');
       isReq = false;
      }
      if(!email){
        setemailErr('Please user valid email')
      } else if(email.indexOf('@') === -1){
        setemailErr('Please user valid email')
        isReq = false;
      }
      if(!birthdate){
        setBirthdateErr('Please enter birthdate')
        isReq = false;
      }
      return isReq;
  }

    // Modify state of MainView to be registered and logged in with new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq ) {
          console.log(username, password);
          axios.post(`https://mymovie-backend-api.herokuapp.com/users`, {
            name: name,
            username: username,
            password: password,
            email: email,
            birthday: birthday,
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
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};