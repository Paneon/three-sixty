import React from 'react';
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { FaAddressCard } from 'react-icons/fa6';
import { RiAdminLine } from 'react-icons/ri';

export const NavBar = () => {
  return (
    <Navbar className="bg-body-tertiary mb-4">
      <Container>
        <NavbarBrand>360°</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink href="#/">
              <HiHome /> Home
            </NavLink>
            <NavLink href="#/results">
              <FaAddressCard /> Results
            </NavLink>
            <NavLink href="#/admin">
              <RiAdminLine /> Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
