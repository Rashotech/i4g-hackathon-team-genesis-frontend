import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
import { Routes } from "../routes";
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';

// pages
import Presentation from "./Presentation";
import DashboardOverview from "./DashboardOverview";
import Transactions from "./Transactions";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import NotFoundPage from "./NotFound";
import LinkPage from "./LinkPage";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const RouteWithSidebar = ({ component: Component, ...rest }) => {

  const history = useHistory();
  const [link, setLink] = useState(false);

  useEffect(() => {
    AuthService.checkUserSession().then(function (response) {
        if(!response) {
            history.replace('/sign-in')
        }
    });
    CheckLink();
  }, []);

  const CheckLink = () => {
    AuthService.CheckLink().then(function (response) {
        if(response === "linked") {
          setLink(true);
        } else {
          toast.warn("Bank Account not yet linked.");
          history.replace('/link');
        }
    });
  }; 

  return (
    <Route {...rest} render={props => (
      <>
        <Sidebar />
        <main className="content">
          <Navbar />
          {
             link &&  <Component {...props} /> 
          }
        </main>
      </>
    )}
    />
  );
};

const RouteForLink = ({ component: Component, ...rest }) => {
  const history = useHistory();
  useEffect(() => {
    AuthService.checkUserSession().then(function (response) {
        if(!response) {
            history.push('/sign-in')
        }
    });
  }, []);
  return (
    <Route {...rest} render={props => (
      <>
        <Sidebar />
        <main className="content">
          <Component {...props} /> 
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <Route exact path={Routes.Presentation.path} component={Presentation} />
    <Route exact path={Routes.Signin.path} component={Signin} />
    <Route exact path={Routes.Signup.path} component={Signup} />
    <Route exact path={Routes.NotFound.path} component={NotFoundPage} />
    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Profile.path} component={Profile} />
    <RouteForLink exact path={Routes.Account.path} component={LinkPage} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
