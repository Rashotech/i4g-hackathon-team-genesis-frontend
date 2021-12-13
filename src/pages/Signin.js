
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/buttonLoader.json';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";

export default (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')
    }),
    onSubmit: values => {
      setLoading(true)
      const { email, password } = values;
      AuthService.authLogin({ email, password }).then(function (response) {
        if(response.flag) {
            setLoading(false)
            toast.success('Login Successful');
            props.history.push('/dashboard');
        }
        else {
            console.log(response);
            if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                toast.error(response.data.message);
            } else {
                toast.error('Something went wrong. Try again');
            }
            setLoading(false);
        }
      })
    },
  });
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to="/" className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus id="email" type="email" 
                        placeholder="example@company.com" {...formik.getFieldProps('email')}
                      />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email ? (
                        <p>{formik.errors.email}</p>
                      ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control id="password" type="password" 
                          placeholder="Password" {...formik.getFieldProps('password')}
                        />
                      </InputGroup>
                      {formik.touched.password && formik.errors.password ? (
                        <p >{formik.errors.password}</p>
                      ) : null}
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                  {  loading ?
                      <span className="d-inline-flex">
                        Logging in... <Player loop="true" src={LoadingIndicator} style={{width:18,marginLeft:5}} autoplay="true"/>
                      </span> :
                      "Login"
                  }
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
