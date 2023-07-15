import React from "react";
import { Row, Card, Col, Container, Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router";
const ComposeMail = (props) => {
  const API = "https://mailbox-df3f9-default-rtdb.firebaseio.com/";
  const receievermailref = useRef("");
  const [content, setContent] = useState(" ");
  const SubjectRef = useRef(" ");
  const sendermail = useSelector((state) => state.auth.userid);
  const recieveremail = receievermailref.current.value;
  const subject = SubjectRef.current.value;
    const navigate=useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const senderid = sendermail.replace(/[@.]/g, '');
    const receiverid =recieveremail.replace(/[@.]/g, '');
    const obj = {
      subject: subject,
      content: content,
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    }
  
    try {
      const sentRes = await fetch(`${API}${senderid}/sentbox.json`, {
        method: 'POST',
        body: JSON.stringify({...obj,reciever:recieveremail}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const inboxRes = await fetch(`${API}${receiverid}/inbox.json`, {
        method: 'POST',
        body: JSON.stringify({...obj,sender:sendermail,read:""}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const sentData = await sentRes.json();
      const inboxData = await inboxRes.json();
  
      if (sentRes.ok && inboxRes.ok) {
        toast.success('Sent successfully');
      } else {
        throw new Error('An error occurred while sending the email');
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <>
      <Container>
      <h2 className="d-flex  justify-content-center">Compose Mail</h2>
        <div className="wrapper">
          <Row className="d-flex  justify-content-center">
            <Col>
              <Card className="mt-3 ">
                <Card.Body>
                  <Form onSubmit={submithandler}>
                   
                    <Form.Group className="mb-2">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        ref={receievermailref}
                        type="email"
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Control
                        ref={SubjectRef}
                        placeholder="Subject"
                        type="text"
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <JoditEditor
                        required
                        value={content}
                        tabIndex={1}
                        onChange={(newContent) => {
                          setContent(newContent);
                        }}
                      />
                    </Form.Group>
                    <div className="mt-2 d-flex justify-content-end gap-3">
                      <Button onClick={()=>navigate('/inbox')}><KeyboardReturnIcon></KeyboardReturnIcon></Button>

                      <Button type="submit"><SendIcon></SendIcon></Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default ComposeMail;
