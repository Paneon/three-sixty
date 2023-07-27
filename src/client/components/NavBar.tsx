import React from 'react';
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { FaAddressCard } from 'react-icons/fa6';
import { RiAdminLine } from 'react-icons/ri';

interface Props {
  onSwitchPage: (page) => void;
  version?: string;
}

export enum Page {
  HOME = 'home',
  RESULTS = 'results',
  ADMIN = 'admin',
}

export const NavBar = ({ onSwitchPage, version }: Props) => {
  return (
    <Navbar className="bg-body-tertiary mb-4">
      <Container>
        <NavbarBrand>360° {version ? ` - ${version}` : ''}</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink onClick={(e) => onSwitchPage(Page.HOME)}>
              <HiHome /> Home
            </NavLink>
            <NavLink onClick={(e) => onSwitchPage(Page.RESULTS)}>
              <FaAddressCard /> Results
            </NavLink>
            <NavLink onClick={(e) => onSwitchPage(Page.ADMIN)}>
              <RiAdminLine /> Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
