
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Nav, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import AuthService from '../services/AuthService';
import { useHistory, useLocation } from "react-router-dom";
import InfoService from '../services/InfoService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import GenifyLogo from "../assets/img/genesis.png";

export default () => {
  const history = useHistory();
  const location = useLocation();
  
  const Logout = () => {
    AuthService.userLogout();
    history.replace('/sign-in');
  }

  const [accountInfo, setAccountInfo] = useState(null);
  const [loader, setLoader] = useState(false);  

  useEffect(() => {
    location.pathname !== "/link" && AccountInformation();
  }, []);

  const AccountInformation = () => { 
    InfoService.accountInfo().then(function (response) {
      if(response.flag) {
          setAccountInfo(response.data.account);
          setLoader(true)
      } else if(parseInt(response.status) === 404) {
        if(location.pathname !== "/link") {
          toast.error("Account Information not available yet");
          history.push('/dashboard');
        }
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
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/dashboard" className="me-lg-3 d-flex align-items-center">
              <Image src={GenifyLogo} />
              <span className="ms-2 brand-text d-none d-md-inline">GENIFY</span>
            </Navbar.Brand>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              {loader && <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={`https://ui-avatars.com/api/?background=262B40&color=FFF&bold=true&size=800&name=${accountInfo.name}`} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{accountInfo.name}</span>
                  </div>
                </div>
              </Dropdown.Toggle>}
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" as={Link} to="/transactions">
                  <FontAwesomeIcon icon={faHandHoldingUsd} className="me-2" /> Transactions
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => Logout()} className="fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav> 
        </div>
      </Container>
     </Navbar>
  )
};
