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

    // Modify state of MainView to be registered and logged in with new user
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        axios
      .post(`https://mymovie-backend-api.herokuapp.com/users`, {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert('Registration Successful!');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
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