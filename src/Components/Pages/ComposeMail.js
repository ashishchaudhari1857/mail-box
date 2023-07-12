import React from "react";
import { Row, Card, Col, Container, Form, Button } from "react-bootstrap";
import { useRef,useState } from "react";
import JoditEditor from "jodit-react";
import { useSelector  } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComposeMail = () => {
  const API="https://mailbox-df3f9-default-rtdb.firebaseio.com/";
  const receievermailref=useRef('')
  const [content, setContent] = useState('');
  const SubjectRef=useRef(" ");
 const sendermail=useSelector((state)=>state.auth.userid)
 const recieveremail=receievermailref.current.value;
 const subject=SubjectRef.current.value;
    const submithandler =async(e)=>{
      e.preventDefault();
      const senderid = sendermail.replace(/[@.]/g, '');
      const receiverid = recieveremail.replace(/[@.]/g, '');
       const obj ={
         recieveremail:recieveremail,
         subject:subject,
         content:content,
       }

       try{
      const res= await fetch(`${API}${senderid}/sentbox.json`,{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
          'Content-Type':'application/json',
        }
      })
      const data= await res.json()
      if (res.ok) {
        toast.success('Sent successfully');
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while sending the email');
    }
        
    }  
  return (
    <>
    <Container>
      <div className="wrapper">
        <Row className="d-flex  justify-content-center">
          <Col>
            <Card className="mt-3 ">
              <Card.Body>
                <Form onSubmit={submithandler} >
                  <Form.Group className="mb-2">
                    <Form.Label>To</Form.Label>
                    <Form.Control  ref={receievermailref}type="email"></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Control ref={SubjectRef}  placeholder="Subject" type="text"></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <JoditEditor
                      value={content}
                      tabIndex={1} 
                      onChange={(newContent) => {setContent(newContent)}}
                    />
                  </Form.Group>
                  <div className="mt-2 d-flex justify-content-end gap-3">
                  <Button >Discard</Button>

                  <Button type="submit">Send</Button>
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
