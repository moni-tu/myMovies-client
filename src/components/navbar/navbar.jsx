import React from 'react';
import { Navbar, Container, Nav, Button, NavbarBrand } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export function Menubar({user}){ 

    return (
        <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
            <Container fluid>
                <NavbarBrand lassName="navbar-logo" href="/"> MyMovies </NavbarBrand>
                <NavbarToggle aria-controls="responsive-navbar-nav"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">                    

                    </Nav>
                </NavbarCollapse>

            </Container>
        </Navbar>
    );
 }