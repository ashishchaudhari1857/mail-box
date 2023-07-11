import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const SignUp = () => {
  const emailref = useRef();
  const passref = useRef();
  const cfpassref = useRef();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (passref.current.value === cfpassref.current.value) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrv9qqCvVc26a4XoWfkq5TiUhew2qVaVg",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailref.current.value,
              password: passref.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          toast.success("account created  successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          throw Error(data.error.message);
        }
      } else {
        toast.error("password  not match");
        return;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2  text-center">
                    Welcome to Mailbox
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          ref={emailref}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          ref={passref}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          ref={cfpassref}
                          type="password"
                          placeholder=" Comfirm Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create account
                        </Button>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            already have an account?{" "}
                            <NavLink
                              to="/login"
                              className="text-primary fw-bold"
                            >
                              {" "}
                              Login
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SignUp;
