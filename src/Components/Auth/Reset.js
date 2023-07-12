import React, { useRef } from "react";
import { Row, Col, Form, Button ,Card ,Container} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const Reset = () => {
  const emailref = useRef();
  const navigate=useNavigate();
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBrv9qqCvVc26a4XoWfkq5TiUhew2qVaVg",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailref.current.value,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        const data  =await res.json()
      if (res.ok) {
        toast.success("mail for update password send successfully");
      } else {
        throw Error(data.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
    <Container>
      <Row  className="vh-100 d-flex justify-content-center align-items-center">
        
        <Col md={8} lg={6} xs={12}>
        <Card className="shadow">
        <Card.Body>
          <Form onSubmit={submithandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                ref={emailref}
                type="email"
              />
            </Form.Group>
            <Button type="submit">Send Mail</Button>
          </Form>
          <NavLink  className="fw-bold" to="/login">Back</NavLink>
        </Card.Body>
        </Card>
        </Col>
   
      </Row>
      </Container>
     
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Reset;
