
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/buttonLoader.json';

export default (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password mismatch')
    }),
    onSubmit: values => {
      setLoading(true)
      const { email, password } = values;
      AuthService.userRegistration({ email, password }).then(function (response) {
        if(response.flag) {
            setLoading(false)
            toast.success('Registration Completed successfully');
            props.history.push('/sign-in');
        }
        else {
            if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                toast.error(response.message);
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
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control type="email" id="email" 
                        placeholder="example@company.com" 
                        {...formik.getFieldProps('email')}
                      />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email ? (
                        <p>{formik.errors.email}</p>
                      ) : null}
                  </Form.Group>
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
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control id="confirmPassword" type="password" 
                          placeholder="Confirm Password" {...formik.getFieldProps('confirmPassword')}
                        />
                    </InputGroup>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <p >{formik.errors.confirmPassword}</p>
                      ) : null}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                  {  loading ?
                      <span className="d-inline-flex">
                        Finalizing Account... <Player loop="true" src={LoadingIndicator} style={{width:18,marginLeft:5}} autoplay="true"/>
                      </span> :
                      "Register"
                  }
                  </Button>
                </Form>
                
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
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
