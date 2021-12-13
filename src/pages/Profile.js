import React, { useState, useEffect } from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import InfoService from '../services/InfoService';
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingIndicator from '../assets/lotties/skeletonLoader.json';

export default () => {
  const [userInfo, setUserInfo] = useState({});
  const [loader, setLoader] = useState(false);  

  useEffect(() => {
    UserInfo();
  }, [])
  const UserInfo = () => { 
    InfoService.identity().then(function (response) {
      if(response.flag) {
          setUserInfo(response.data);
          setLoader(true)
      } else if(parseInt(response.status) === 404) {
        toast.error("Account Information not available yet");
        window.location.replace('/dashboard');
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
      {}
      <Row>
        <Col xs={12} xl={4}>
            <Row>
              <Col xs={12}>
                <ProfileCardWidget/>
              </Col>
            </Row>
          </Col>
        <Col xs={12} xl={8} className="order-lg-first">
          {loader ? <GeneralInfoForm info={userInfo}/> :
             <Player loop="true" src={LoadingIndicator} autoplay="true"/>
          }
        </Col>
      </Row>
    </>
  );
};
