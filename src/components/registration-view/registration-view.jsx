import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';
import axios from 'axios';
import { Link, Router } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onRegistration(username);
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