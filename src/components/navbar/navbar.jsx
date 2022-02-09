import React from 'react';
import { Navbar, Container, Nav, Button, NavbarBrand } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export function Menubar({user}){ 

    return (
        <Navbar>
            <Container>
                <NavbarBrand> MyMovies </NavbarBrand>
                <NavbarToggle/>
                <NavbarCollapse>
                    <Nav>
                        
                    </Nav>
                </NavbarCollapse>

            </Container>
        </Navbar>
    );
 }