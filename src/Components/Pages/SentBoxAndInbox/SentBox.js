import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mailactions } from "./MailManageSlice";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes  from './mail.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

const Sent = () => {
  const API = "https://mailbox-df3f9-default-rtdb.firebaseio.com/";
  const usermail = useSelector((state) => state.auth.userid);
  const senderid = usermail.replace(/[@.]/g, "");
  const dispatch = useDispatch();
  const Sent = useSelector((state) => state.mail.Sent);

  const sentmails = async () => {
    const loading = toast.info("loading....");
    try {
      const res = await fetch(`${API}${senderid}/sentbox.json`);
      const sentmailsdata = await res.json();
      const sentmailarray = [];
      for (let key in sentmailsdata) {
        sentmailarray.push({
          key: key,
          recieveremail: sentmailsdata[key].reciever,
          content: sentmailsdata[key].content,
          subject: sentmailsdata[key].subject,
          date: sentmailsdata[key].date,
        });
      }

      if (res.ok) {
        toast.dismiss(loading);
        dispatch(Mailactions.sentbox(sentmailarray));
      } else {
        throw Error(sentmailsdata.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    sentmails();
  }, []);

  const deletehandler = async (key) => {
    try {
      const res = await fetch(`${API}${senderid}/sentbox/${key}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("mail deleted successfully");
        sentmails();
      } else {
        throw Error(data.error.massage);
      }
    } catch (err) {
      toast.error(err.massage);
    }
  };


  const data = Sent.map((item) => (
    <div key={item.key} className="mt-3">
      <div className="d-flex justify-content-center">
        <NavLink as={Link} to={`/maildetail/${item.key}/${senderid}/${"sentbox"}`}>
          <Card className={`mt-1 bg-black text-white  ${classes.mailline}`}>
            <Card.Body>
              <ul className="d-flex gap-2 gap-md-5 list-style-none list-unstyled">
                <li className="col-5 col-md-4 text-truncate">{item.recieveremail}</li>
                <li className="col-3 col-md-2 text-truncate">{item.subject}</li>
                <li className="col-4 col-md-2 text-truncate text-nowrap">{item.date}</li>
              </ul>
            </Card.Body>
          </Card>
        </NavLink>
        <Card className="mt-1 bg-black text-white" >
          <Card.Body>
          <Button
                    onClick={(event) => {
                      deletehandler(item.key);
                    }}
                    className="p-0 p-md-1"
                  >
                  < DeleteIcon></DeleteIcon> 
                  </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  ));
  
  
  
  return (
    <div >
      <h1  style={{ fontStyle: "oblique" }} className="d-flex justify-content-center bg-info">
        Sentbox
      </h1>
      {data}
      <ToastContainer />
    </div>
  );
};

export default Sent;
