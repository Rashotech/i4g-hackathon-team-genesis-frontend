import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faMoneyCheckAlt, faArrowAltCircleRight, faDatabase, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container, Navbar, Nav } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Frame1 from "../assets/img/Frame1.svg"

import ReactMockupImg from "../assets/img/master.png";
import mono from "../assets/img/mono.png"
import i4gLogo1 from "../assets/img/I4G-Logo-White.png"
import GenifyLogo from "../assets/img/genesis.png";


import features from "../data/features";

export default () => {

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" bg="purpish" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 d-flex align-items-center">
            <Image src={GenifyLogo} />
            <span className="ms-2 brand-text d-none d-md-inline">GENIFY</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#home">Home</Nav.Link>
                <Nav.Link as={HashLink} to="#features">Features</Nav.Link>
                <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Button as={Link} to="/sign-up" variant="outline-white" className="ms-3"> Sign Up</Button>
          </div>
        </Container>
      </Navbar>
      <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-lg-6" id="home">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <h1 className="fw-boldest text-secondary" class="display-2">Be the Boss <br/> of your spending</h1>
              <p className="text-muted fw-bold mb-5 h5">You have goals and we want to help you achieve <br /> them easily by tracking and monitoring your spendings</p>
               <div className="d-flex align-items-center justify-content-center" class="mb-3">
                <Button variant="secondary" as={Link} to="/sign-up" className="text-dark me-3">
                  Get Started <FontAwesomeIcon icon={faArrowAltCircleRight} className="d-none d-sm-inline ms-1" />
                </Button>
              </div>
                <img class="img-fluid" src={Frame1} alt="frame1" /> 
              </Col>
              </Row> 
              </Container>
      </section>

      <div className="section" id="features">
        <Container className="z-2">
          <Row className="justify-content-center">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">Expenditure</h3>
              <p className="text-gray"> Let's help you keep track of your expenditure.
            </p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faDatabase} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">Insights from<br/> data</h3>
              <p className="text-gray">Let's help you keep informed decision and what you should improve on.
            </p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faIdCard} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">Identity Management</h3>
              <p className="text-gray">Let's confirm the identity of every intending customers</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon color="secondary" icon={faChartLine} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">Account Analytics</h3>
              <p className="text-gray">Get graphical representation of your accout</p>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="section section-lg bg-primary text-white">
        <Container>
          <Row className="justify-content-center mb-0.5 mb-lg-6">
            <Col xs={12} className="text-center">
              <h2 className="px-lg-5">Get started In four easy steps</h2>
            </Col>
          </Row>
          <Row >
            {features.map(feature => <Feature key={`features-${feature.id}`} {...feature} />)}
          </Row>
        </Container>
      </section>

      <section className="section section-md bg-soft">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
              <h2>Don’t be a slave to your spending.</h2>
              <p className="mb-3 lead fw-bold">
                Let's help you rule over your money
              </p>
              <p className="mb-4">
              The overall benefit you get to enjoy is that our platform makes you wiser when it comes to spending.  It helps you make an informed decision before and after spending.
              </p>
            </Col>
            <Col lg={6} className="col-lg-6 order-lg-1">
              <Image src={ReactMockupImg} alt="Advice" />
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="footer py-6 bg-dark text-white">
        <Container>
          <Row>
            <Col className="mb-md-2">
              <Card.Link href="https://ingressive.org/" target="_blank">
                <Image src={mono} height={35} className="d-block mx-auto mb-3" alt="Themesberg Logo" />
               
              </Card.Link>

              <Card.Link href="https://ingressive.org/" target="_blank">
               
                <Image src={i4gLogo1} height={35} className="d-block mx-auto mb-3" alt="Themesberg Logo" />
               
              </Card.Link>
              <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                <p className="font-weight-normal font-small mb-0">Copyright © Team Genesis 2021 (i4G x Mono Hackaton). All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
