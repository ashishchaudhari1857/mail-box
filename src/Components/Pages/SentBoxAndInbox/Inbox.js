import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mailactions } from "./MailManageSlice";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Inbox = () => {
  const API = "https://mailbox-df3f9-default-rtdb.firebaseio.com/";
  const usermail = useSelector((state) => state.auth.userid);
  const senderid = usermail.replace(/[@.]/g, "");
  const dispatch = useDispatch();
  const Recieved = useSelector((state) => state.mail.Recieved);
  const inboxmails = async () => {
    const loading = toast.info("loading....");
    try {
      const res = await fetch(`${API}${senderid}/inbox.json`);
      const inboxmaildata = await res.json();
      const inboxmailarray = [];
      for (let key in inboxmaildata) {
        inboxmailarray.push({
          key: key,
          senderemail: inboxmaildata[key].sender,
          content: inboxmaildata[key].content,
          subject: inboxmaildata[key].subject,
          date: inboxmaildata[key].date,
        });
      }

      if (res.ok) {
        toast.dismiss(loading);
        dispatch(Mailactions.inbox(inboxmailarray));
      } else {
        throw Error(inboxmaildata.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    inboxmails();
  }, []);

  //
  const deletehandler = async (key) => {
    try {
      const res = await fetch(`${API}${senderid}/inbox/${key}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("mail deleted successfully");
        inboxmails();
      } else {
        throw Error(data.error.massage);
      }
    } catch (err) {
      toast.error(err.massage);
    }
  };
  const data = Recieved.map((item) => (
    <Container style={{ backgroundColor: "gray" }}>
     <NavLink as={Link} to="/maildetail">

        <Row>
          <Col>
            <Card className="mt-1 bg-black  text-white">
              <Card.Body>
                <ul className="d-flex gap-2 gap-md-5  list-style-none   list-unstyled">
                  <li className=" col-3 col-md-4 text-truncate">
                    {item.senderemail}
                  </li>
                  <li className=" col-3 col-md-2 text-truncate">
                    {item.subject}
                  </li>
                  <li className="col-4 col-md-2 text-truncate text-nowrap">
                    {item.date}
                  </li>
               

                  <li className="col-1 d-flex ">

                    <Button
                      onClick={deletehandler.bind(null, item.key)}
                      className="p-0 p-md-1"
                    >
                      Delete
                    </Button>
                  </li>
               
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </NavLink>
    </Container>
  ));

  //
  console.log(data);
  return (
    <div className="bg-info">
      <h5
        style={{ fontStyle: "oblique" }}
        className="d-flex justify-content-center  "
      >
        inbox
      </h5>
      {data}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Inbox;
