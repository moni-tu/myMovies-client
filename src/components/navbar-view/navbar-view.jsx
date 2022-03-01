import React from 'react';
import logo from './logo-dark.png';
import { Navbar, Container, Nav, Button, NavbarBrand } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export function NavbarView({user}){ 

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
            <Container fluid>
                <NavbarBrand className="navbar-logo" href="/" > 
                <img src={logo} alt="logo-dark"/>
                </NavbarBrand>
                <NavbarToggle aria-controls="responsive-navbar-nav"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">  
                         {isAuth() && (
                            <Nav.Link href={`/`}>Home</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link variant='dark' onClick={() => {
                                onLoggedOut()
                            }}>Logout</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Login</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )}                  
                    </Nav>
                </NavbarCollapse>

            </Container>
        </Navbar>
    );
}