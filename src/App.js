// import logo from './wallet-logo.svg';

import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import Loader from 'react-loader-spinner';


import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

import './App.scss';

const HomePage = lazy(() => import('./views/HomePage/HomePage'))
const StatisticPage = lazy(() => import('./views/StatisticPage/StatisticPage'))
const CurrencyPage = lazy(() => import('./views/CurrencyPage/CurrencyPage'))

const RegistrationPage = lazy(() => import('./views/RegistrationPage/RegistrationPage' /* webpackChunkName: "RegisterView"*/),);
const LoginPage = lazy(() => import('./views/LoginPage/LoginPage' /* webpackChunkName: "LoginView"*/),);

export default function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)
  const name = useSelector(authSelectors.getUserName)
  // console.log(isLoggedIn)
  // console.log(name)

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);


  return (
    (
      <div className="App" >
        <Suspense fallback={<Loader className="loader" type="ThreeDots" color="brown" height={80} width={80}/>
        }>

          <Switch>
            <PublicRoute exact path="/fin-project-front/registration" restricted>
              <RegistrationPage />
            </PublicRoute>

            <PublicRoute path="/fin-project-front/login" restricted>
              <LoginPage />
            </PublicRoute>

            <PrivateRoute path="/fin-project-front/home" redirectTo="/fin-project-front/login">
              <ToastContainer />
              <HomePage />
            </PrivateRoute>

            <PrivateRoute path="/fin-project-front/statistics" redirectTo="/fin-project-front/login">
              <StatisticPage />
            </PrivateRoute>

            <PrivateRoute path="/fin-project-front/currency" redirectTo="/fin-project-front/login">
              <CurrencyPage />
            </PrivateRoute>

            <PublicRoute>
              <Redirect to="/fin-project-front/registration" />
            </PublicRoute>
          </Switch>
        </Suspense>
      </div>
    ));
}
