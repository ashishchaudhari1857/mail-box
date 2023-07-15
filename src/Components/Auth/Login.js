import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Authactions } from './LoginSlice';
import { Mailactions } from '../Pages/SentBoxAndInbox/MailManageSlice';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch=useDispatch();
  const Navigate=useNavigate()
  const inboxarray =useSelector((state)=>state.mail.Recieved)
     const loading =toast.info("loading.........")
    const emailref=useRef()
    const passref=useRef()
    const cfpassref=useRef()
   const   submitHandler =async(e)=>{
    e.preventDefault()
     try{
        if(passref.current.value===cfpassref.current.value){
            const res= await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrv9qqCvVc26a4XoWfkq5TiUhew2qVaVg",{
             method:'POST',
             body:JSON.stringify({
                 email:emailref.current.value,
                 password:passref.current.value,
                 returnSecureToken:true
             }),
             headers:{
                 "Content-Type": "application/json"
             }
            })
     
            const data=await res.json()
             const {idToken:token ,email:id} =data;
              if(res.ok){
              dispatch(Authactions.login({token,id}))
              dispatch(Mailactions.inbox(inboxarray))
                 toast.success("login successfully")
                 toast.dismiss(loading)
                 Navigate('/inbox')
              }else{
                 throw Error(data.error.message)
              }
            }
            else{
             toast.error("password  not match")
             return;
     
            }
     }catch(err){
        toast.error(err.message)
     }
      

   }
      return (
        <div>
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2  text-center">Welcome to Mailbox</h2>
                      <div className="mb-3">
                        <Form  onSubmit={submitHandler}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email address
                            </Form.Label>
                            <Form.Control ref ={emailref} type="email" placeholder="Enter email" />
                          </Form.Group>
    
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control  ref={passref} type="password" placeholder="Password" />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={cfpassref} type="password" placeholder=" Comfirm Password" />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <p className="small">
                                <Link  to="/forget"  lassName="text-primary">  Forgot password?</Link>
                  
                            </p>
                          </Form.Group>
                          <div className="d-grid">
                            <Button variant="primary" type="submit">
                              Login
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            Don't have an account?{" "}
                            <NavLink to="/signup" className="text-primary fw-bold"> Sign Up</NavLink>
                          </p>
                        </div>
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

export default Login;