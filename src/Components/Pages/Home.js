import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
<Row className='bg-primary'>
    <Col className='col-12'>Welcome to Mailbox</Col>
    <NavLink to='/composeMail'>+</NavLink>
</Row>
  )
};

export default Home;