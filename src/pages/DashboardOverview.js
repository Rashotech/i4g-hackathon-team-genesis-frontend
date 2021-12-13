
import React, { useState, useEffect } from "react";
import { faChartLine, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button } from '@themesberg/react-bootstrap';
import { faCoins, faCreditCard, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { CounterWidget, CircleChartWidget, ProgressTrackWidget } from "../components/Widgets";
import { PageVisitsTable } from "../components/Tables";
import { toast } from 'react-toastify';
import InfoService from '../services/InfoService';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/skeletonLoader.json';

export default () => {
  const [transactions, setTransactions] = useState(null);
  const [transactions2, setTransactions2] = useState(null);
  const [isAvailable, setIsavailable] = useState(true);

  useEffect(() => {
    Transactions();
    Transactions2();
  }, []);

  const Transactions = () => { 
    InfoService.transactions("limit").then(function (response) {
      if(response.flag) {
          setTransactions(response.data);
      } else if(parseInt(response.status) === 404) {
        setIsavailable(false)
;        toast.error("Account Information not available yet");
      } else {
          if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              toast.error(response.data.message);
          } else {
              toast.error('Something went wrong. Try again');
          }
      }
    })
  };

  const Transactions2 = () => { 
    InfoService.transactions("all").then(function (response) {
      if(response.flag) {
          setTransactions2(response.data);
      }
      else {
          if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              toast.error(response.data.message);
          } else {
              toast.error('Something went wrong. Try again');
          }
      }
    })
  };

  const refreshPage = ()=>{
    window.location.reload();
  };


  function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const totalAmount = (transaction, type) => {
    let debitTrans = transaction.filter((data) => {
      return data.type === type
    });
    const total = debitTrans.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.amount;
    }, 0);
    return thousands_separators(parseFloat(total/100).toFixed(2));
  }

  const bills = (transaction, type) => {
    let billPay = transaction.filter((data) => {
      return data.narration.includes(type)
    });
    return ((parseInt(billPay.length)/parseInt(transaction.length))*100).toFixed(2);
  }

  const billCategories = (transactions) => {
    return [
      { id: 1, label: "Transfer", value: bills(transactions, "TRF"), color: "secondary", icon: faCoins },
      { id: 2, label: "Web", value:  bills(transactions, "WEB"), color: "primary", icon: faGlobe },
      { id: 3, label: "POS", value:  bills(transactions, "POS"), color: "tertiary", icon: faCreditCard },
    ]
  };

  return (
    <>
      <Row className="justify-content-md-center">
        {
          !isAvailable &&
          <Col className="mb-4 d-flex align-items-baseline" xs={12}>
            <p className="fs-4 fw-bolder px-4">Your account info is not available at the moment.</p>
            <Button variant="secondary" onClick={refreshPage} size="sm">Refresh Data</Button>
          </Col>
        }
       <Col xs={12} sm={6} xl={4} className="mb-4">
        { transactions2 ?
            <CounterWidget
              category="Amount Recieved"
              title= {`NGN ${(totalAmount(transactions2.data, "credit"))}`}
              icon={faChartLine}
            /> :
            <Player loop="true" src={LoadingIndicator} autoplay="true"/>
        }
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          {transactions2 ?
            <CounterWidget
              category="Amount Spent"
              title= {`NGN ${(totalAmount(transactions2.data, "debit"))}`}
              icon={faArrowAltCircleDown}
            /> :
            <Player loop="true" src={LoadingIndicator} autoplay="true"/>
          }
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
         { transactions2 ?
          <CircleChartWidget
              title="Categories"
              data={billCategories(transactions2.data)} 
            /> :
            <Player loop="true" src={LoadingIndicator} autoplay="true"/>
          }
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable transactions={transactions}/>
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  { transactions2 ? 
                    <ProgressTrackWidget transactions={transactions2.data} /> :
                    <Player loop="true" src={LoadingIndicator} autoplay="true"/>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
