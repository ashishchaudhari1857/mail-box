import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container ,Row ,Col ,Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Maildetail = () => {
    const [mail ,setmail]=useState("")
    const usermail=useSelector((state)=>state.auth.userid)
    const API = "https://mailbox-df3f9-default-rtdb.firebaseio.com/";
    const params= useParams();
    const fetchmail =async()=>{
    try{
      const  res =await fetch( `${API}/${params.userid}/${params.userchoice}/${params.id}.json`)
      const data =await res.json();
      console.log(data)
      if(res.ok){
         setmail(data)
      }else{
       throw Error("something is went wrong")
      }
//   logic  for read unread msgs
     if(params.userchoice==="inbox"){
      const inboxReads = await fetch(`${API}/${params.userid}/${params.userchoice}/${params.id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({...data,read:true}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
     }
    

    }catch(err){
      toast.error(err)
    }
    }
    useEffect(()=>{
        fetchmail()
    }, [])
  return (
  <>
<Container className='mt-2'>
<Card>
  <Card.Body>
  <Row>
    <Col>
    <ul style={{ display: "flex", flexDirection: "column", listStyleType: "none", fontStyle: "oblique", gap: "5px"}}>
              <li><strong>Form:</strong>{params.userchoice==="sentbox"?usermail:mail.sender}</li>
              <li><strong> To:</strong>{params.userchoice==="sentbox"?mail.reciever:usermail}</li>
              <li><strong>Subject:</strong>{mail.subject}</li>
              <li><strong> Date :</strong>{mail.date}</li>
            </ul>
        
    </Col>
<hr></hr>
  </Row>
  <Row className='mt-2' >
    <Col>
    <p dangerouslySetInnerHTML={{ __html: mail.content }}></p>
    </Col>

  </Row>
  </Card.Body>
  </Card>
</Container>
    <ToastContainer></ToastContainer>  
</>

  );
};

export default Maildetail;