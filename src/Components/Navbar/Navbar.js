import React from "react";
import { Navbar, Nav, NavLink, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { Authactions } from "../Auth/LoginSlice";
const Header = () => {
  const dispatch=useDispatch();
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
      >
        {" "}
      </Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
      <NavLink as={Link} to="/composemail">
            <Button type="button">Compose +</Button>
          </NavLink>
        <Nav className="text-primary">
          <NavLink as={Link} to="/home">
            Home
          </NavLink>
          <NavLink as={Link} to="/login">
            Login
          </NavLink>
          <NavLink as={Link} to="/login" onClick={ ()=> dispatch(Authactions.logout())}>
            Logout
          </NavLink>
         
          <NavLink as={Link} to="/inbox">
            Inbox
          </NavLink>
         
          <NavLink as={Link} to="/sentmails">
            Sent
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default Header;
