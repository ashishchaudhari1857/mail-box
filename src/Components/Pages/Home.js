import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";
const Home = () => {
  const isLogged=useSelector((state)=>state.auth.isLogged)
   const navigate=useNavigate();
  return (
    <div style={{ backgroundColor: "white" }}>
      <Row>
        <Col
          className="col-12 fw-bold text-secondary d-flex justify-content-center"
          style={{ fontSize: "2rem", backgroundColor: "transparent" }}
        >
          Welcome to Mailbox
        </Col>
      </Row>

      <div className={classes.section1}>
        <section>
          <div className={classes.head}>
            <h1>
              Secure, smart, and easy to use emails
            </h1>
            {!isLogged && <Button onClick={()=>navigate("/login")}>signin /signup</Button>}
            <p>
              Get more done with Gmail. Now integrated with Google Chat, Google
              Meet, and more, all in one place.
            </p>
          </div>
        </section>

        <section>
          <div>
            <img
              src="https://addons.mozilla.org/user-media/previews/full/183/183985.png?modified=1622132402"
              alt="Random Image 1"
            />
          </div>
        </section>
      </div>

      <footer className={classes.footer}>
        <section>
          <h3>Stay productive, even offline</h3>

          <img
            src="https://st2.depositphotos.com/2234329/8038/i/950/depositphotos_80385600-stock-photo-google-gmail-interface-on-apple.jpg"
            alt="Random Image 2"
          />
        </section>
        <section>
          <h3>Stay productive, even offline</h3>
          <p>
            Gmail works great with desktop clients like Microsoft Outlook. Stay
            productive even offline. Gmail offline lets you read, reply, delete,
            and search your Gmail messages when you’re not connected to the
            internet. Experience Gmail on any device. Enjoy the ease and
            simplicity of Gmail, wherever you are.
          </p>
        </section>
      </footer>
    </div>
  );
};

export default Home;
