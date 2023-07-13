import React from "react";
import { Navbar, Nav, NavLink, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Authactions } from "../Auth/LoginSlice";
const Header = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  return (
    <Navbar
      collaspseOnselect
      expand="sm"
      bg="dark"
      variant="dark"
      className="p-1  fs-4   "
    >
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
        <Nav className="text-primary">
          {isLogged && (
            <NavLink as={Link} to="/composemail">
              <Button type="button">Compose +</Button>
            </NavLink>
          )}
          {isLogged && (
            <NavLink as={Link} to="/home">
              Home
            </NavLink>
          )}
          {!isLogged && (
            <NavLink as={Link} to="/login">
              <Button> Sign In</Button>
            </NavLink>
          )}
          {isLogged && (
            <NavLink
              as={Link}
              to="/login"
              onClick={() => dispatch(Authactions.logout())}
            >
              Logout
            </NavLink>
          )}

          {isLogged && (
            <NavLink as={Link} to="/inbox">
              Inbox
            </NavLink>
          )}

          {isLogged && (
            <NavLink as={Link} to="/sentmails">
              Sent
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
