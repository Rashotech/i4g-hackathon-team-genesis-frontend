
import React from "react";
import { Col, Row, Nav, Card, Button, Table, Pagination } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import moment from "moment-timezone";
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/skeletonLoader.json';

export const PageVisitsTable = ({transactions}) => {
  const TableRow = (props) => {
    const { date, amount, type, narration } = props;
    const typeVariant = type === "credit" ? "success"
      : type === "creditd" ? "primary"
        : type === "debit" ? "danger" : "primary";

    function thousands_separators(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }
    return (
      <tr>
        <th scope="row"> {moment(date).format("DD MMM YYYY")}</th>
        <td>NGN {thousands_separators(parseFloat(amount/100).toFixed(2))}</td>
        <td>
          <span className={`fw-normal text-${typeVariant}`}>
              {type}
            </span>
        </td>
        <td>
          {narration.length > 25 ? narration.substr(0,25)+'...' : narration}
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Last 5 transactions</h5>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/transactions" variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Narration</th>
          </tr>
        </thead>
        <tbody>
          { transactions ?
            transactions.data.map(pv => <TableRow key={`page-visit-${pv._id}`} {...pv} />) :
            <Player loop="true" src={LoadingIndicator} style={{width: 650 }} autoplay="true"/>
          }
        </tbody>
      </Table>
    </Card>
  );
};


export const TransactionsTable = ({transactions}) => {
  const totalTransactions = transactions.data.length;

  const TableRow = (props) => {
    const { date, amount, type, narration } = props;
    const typeVariant = type === "credit" ? "success"
      : type === "creditd" ? "primary"
        : type === "debit" ? "danger" : "primary";

    function thousands_separators(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }
      
    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {moment(date).format("DD MMM YYYY")}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
          NGN {thousands_separators(parseFloat(amount/100).toFixed(2))}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${typeVariant}`}>
            {type}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {narration}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Date</th>
              <th className="border-bottom">Amount</th>
              <th className="border-bottom">Type</th>
              <th className="border-bottom">Narration</th>
            </tr>
          </thead>
          <tbody>
            {transactions.data.map(t => <TableRow key={`transaction-${t._id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>{transactions.paging.total}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
