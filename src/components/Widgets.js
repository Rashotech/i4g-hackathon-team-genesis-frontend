
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCreditCard, faTv, faPizzaSlice, faPhone  } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, ProgressBar } from '@themesberg/react-bootstrap';
import { CircleChart } from "./Charts";
import InfoService from '../services/InfoService';
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/skeletonLoader.json';

export const ProfileCardWidget = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loader, setLoader] = useState(false);  

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    location.pathname !== "/link" && AccountInformation();
  }, []);

  const AccountInformation = () => { 
    InfoService.accountInfo().then(function (response) {
      if(response.flag) {
          setAccountInfo(response.data.account);
          setLoader(true)
      } else {
          if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            // location.pathname !== "/link" && toast.error(response.data.message);
          } else {
              toast.error('Something went wrong. Try again');
          }
      }
    })
  };

  return (
    <Card border="light" className="text-center p-0 mb-4">
     { loader ? <Card.Body className="pb-5">
        <Card.Img src={`https://ui-avatars.com/api/?background=262B40&color=FFF&bold=true&size=800&name=${accountInfo.name}`} alt="Profile Pic" className="user-avatar large-avatar rounded-circle mx-auto  mb-4" />
        <Card.Title>{accountInfo.name}</Card.Title>
        <Card.Subtitle className="fw-normal py-2">Balance: {accountInfo.currency} {parseFloat(accountInfo.balance/100).toFixed(2)}</Card.Subtitle>
        <Card.Text className="fw-normal">{accountInfo.accountNumber}</Card.Text>
        <Card.Text className="text-gray">{accountInfo.institution.name}</Card.Text>
      </Card.Body> :
        <Player loop="true" src={LoadingIndicator} autoplay="true"/>
    }
    </Card>
  );
};

export const CounterWidget = (props) => {
  const { icon, iconColor, category, title, period, percentage } = props;

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}>
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h4 className="mb-1">{title}</h4>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <h4 className="mb-1">{title}</h4>
            </div>
            <div className="small mt-2">
              Since last 6 months
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map(d => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map(d => (
              <h6 key={`circle-element-${d.id}`} className="fw-normal text-gray">
                <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
                {` ${d.label} `}{`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = ({ transactions }) => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  const bills = (transaction, type) => {
    let billPay = transaction.filter((data) => {
      return data.narration.includes(type)
    });
    return ((parseInt(billPay.length)/40)*100).toFixed(2);
  }

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">BILL PAYMENTS</h5>
      </Card.Header>
      <Card.Body>
        <Progress last title="Airtime" color="green" icon={faPhone} percentage={bills(transactions, "AIRTIME")} />
        <Progress title="Loan" color="tertiary" icon={faCreditCard} percentage={bills(transactions, "LOAN")} />
        <Progress title="TV Subscription" color="info" icon={faTv} percentage={bills(transactions, "TV")} />
        <Progress last title="Food" color="purple" icon={faPizzaSlice} percentage={bills(transactions, "FOOD")} />
        <Progress title="Electricity" color="danger" icon={faBolt} percentage={bills(transactions, "INTERNET")} />
      </Card.Body>
    </Card>
  );
};
