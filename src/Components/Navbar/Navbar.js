import React from "react";
import { Navbar, Nav, NavLink, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Authactions } from "../Auth/LoginSlice";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
const Header = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const Inboxtotol=useSelector((state)=>state.mail.Inboxtotol)
  const dispatch = useDispatch();
  return (
    <Navbar
      collaspseOnselect
      expand="sm"
      bg="dark"
      variant="dark"
      className="p-1  fs-5  "
    >
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
        <Nav className="text-primary ms-auto gap-2" >
          {isLogged && (
            <NavLink as={Link} to="/composemail">
              <Button type="button">Compose +</Button>
            </NavLink>
          )}
          {isLogged && (
            <NavLink as={Link} to="/home">
             Home <HomeIcon></HomeIcon>
            </NavLink>
          )}
          {!isLogged && (
            <NavLink as={Link} to="/login">
              <Button> Sign In</Button>
            </NavLink>
          )}
         

          {isLogged && (
            <NavLink as={Link} to="/inbox">
             inbox <MailIcon></MailIcon>
              ({Inboxtotol})
            </NavLink>
          )}

          {isLogged && (
            <NavLink as={Link} to="/sentmails">
              Sent <ForwardToInboxIcon></ForwardToInboxIcon>
            </NavLink>
          )}

{isLogged && (
            <NavLink
              as={Link}
              to="/login"
              onClick={() => dispatch(Authactions.logout())}
            >
             logout   < LogoutIcon></LogoutIcon>
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
