import React, { useEffect, useState } from "react";
import { TransactionsTable } from "../components/Tables";
import { toast } from 'react-toastify';
import InfoService from '../services/InfoService';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/skeletonLoader.json';
import { useHistory, useLocation } from "react-router-dom";

export default () => {
  const [transactions, setTransactions] = useState(null);
  const [loader, setLoader] = useState(false);  
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    Transactions();
  }, []);

  const Transactions = () => { 
    InfoService.transactions().then(function (response) {
      if(response.flag) {
          setTransactions(response.data);
          setLoader(true);
      } else if(parseInt(response.status) === 404) {
        if(location.pathname !== "/link") {
          toast.error("Account Information not available yet");
          history.push('/dashboard');
        }
      } else {
          if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              toast.error(response.data.message);
          } else {
              toast.error('Something went wrong. Try again');
          }
      }
    })
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Transactions</h4>
          <p className="mb-0">Last 20 Transactions</p>
        </div>
      </div>
      {
        loader ? 
        <TransactionsTable transactions={transactions}/> :
        <Player loop="true" src={LoadingIndicator} autoplay="true"/>
      }
    </>
  );
};
