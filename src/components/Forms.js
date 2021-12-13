
import React from "react";
import { Col, Row, Card } from '@themesberg/react-bootstrap';


export const GeneralInfoForm = ({ info }) => {

  const replaceWithAsterisk = (str) => {
    let res = '';
    res = [3, 4, 5, 6, 7].reduce((acc, val) => {
        acc[val] = '*';
        return acc;
    }, str.split('')).join('');
    return res;
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">User information</h5>
          <Row>
            <Col md={6} className="mb-3">
              <p>Full Name</p>
              <p class="text-uppercase">{info.fullName}</p>
            </Col>
            <Col md={6} className="mb-3">
              <p>Phone Number</p>
              <p class="text-uppercase">{info.phone}</p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <p>BVN</p>
              <p>{replaceWithAsterisk(info.bvn)}</p>
            </Col>
            <Col md={6} className="mb-3">
              <p>Gender</p>
              <p class="text-uppercase">{info.gender}</p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <p>Email</p>
              <p class="text-uppercase">{info.email}</p>
            </Col>
            <Col md={6} className="mb-3">
              <p>Marital Status</p>
              <p class="text-uppercase">{info.maritalStatus}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <p>Address</p>
              <p class="text-uppercase">{info.addressLine1}, {info.addressLine2}</p>
            </Col>
          </Row>
      </Card.Body>
    </Card>
  );
};
