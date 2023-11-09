import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {AuthRoute, PrivateRoute, PrivatePremium} from './middleware'
import Login from '../containers/auth/login'
import Register from '../containers/auth/register'
import Confirm from '../containers/auth/confirm'
import ForgetPassword from '../containers/auth/forgetPassword'
import Logout from '../containers/auth/logout'
import Dashboard from '../containers/candidate/index'
import Profile from '../containers/candidate/profile/index'
import Company from '../containers/candidate/company/index'
import Admin from '../containers/candidate/admin/exam'
import FavoriteCompany from '../containers/candidate/company/favorite'
import CompanyDetail from '../containers/candidate/company/detail'
import FavoriteOpening from '../containers/candidate/opening/favorite'
import OpeningDetail from '../containers/candidate/opening/detail'
import UpcomingExam from '../containers/candidate/exam/upcoming'
import Exam from '../containers/candidate/exam/index'
import Train from '../containers/candidate/train/index'
import TrainResult from '../containers/candidate/train/result/index'
import ResultCompany from '../containers/candidate/result/company'
import ResultAdmin from '../containers/candidate/result/admin'
import ResultTrain from '../containers/candidate/result/train'
import ResultDetail from '../containers/candidate/result/detail/index'
import CumulativeCompany from '../containers/candidate/result/cumulative/company'
import CumulativeAdmin from '../containers/candidate/result/cumulative/admin'
import Block from '../containers/candidate/block'
import Payment from '../containers/candidate/payment/index'
import PaymentDetail from '../containers/candidate/payment/detail'
import AdminRoute from './admin'
import CorporateRoute from './corporate'
import {getCookie} from '../functions/cookie'
import {getJson} from '../functions/string'
import {useSetting} from '../provider/setting'

const Routes = () => {
  const [, dispatch] = useSetting()

  useEffect(() => {
    const userString = getCookie('auth')
    const user = getJson(userString)
    if (user) {
      dispatch({type: 'SET', settingName: 'auth', settingData: user})
    }
  }, [])
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">

        </PrivateRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute path="/register">
          <Register />
        </AuthRoute>
        <AuthRoute path="/confirm">
          <Confirm />
        </AuthRoute>
        <AuthRoute path="/forget">
          <ForgetPassword />
        </AuthRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/company">
          <Company />
        </PrivateRoute>
        <PrivateRoute exact path="/empowerr">
          <Admin />
        </PrivateRoute>
        <PrivateRoute path="/favorite/company">
          <FavoriteCompany />
        </PrivateRoute>
        <PrivateRoute path="/company/detail/:id">
          <CompanyDetail />
        </PrivateRoute>
        <PrivateRoute path="/favorite/opening">
          <FavoriteOpening />
        </PrivateRoute>
        <PrivateRoute path="/opening/detail/:id">
          <OpeningDetail />
        </PrivateRoute>
        <PrivateRoute path="/exam/upcoming">
          <UpcomingExam />
        </PrivateRoute>
        <PrivateRoute path="/exam/:id" isSidebar={false} isNav={false}>
          <Exam />
        </PrivateRoute>
        <PrivateRoute exact path="/train">
          <PrivatePremium>
            <Train />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/train/result/:id" isSidebar={false} isNav={false}>
          <PrivatePremium>
            <TrainResult />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/result/company">
          <PrivatePremium>
            <ResultCompany />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/result/empowerr">
          <PrivatePremium>
            <ResultAdmin />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/result/train">
          <PrivatePremium>
            <ResultTrain />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/result/detail/:id">
          <PrivatePremium>
            <ResultDetail />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/cumulative/company">
          <PrivatePremium>
            <CumulativeCompany />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/cumulative/empowerr">
          <PrivatePremium>
            <CumulativeAdmin />
          </PrivatePremium>
        </PrivateRoute>
        <PrivateRoute path="/block" isSidebar={false}>
          <Block />
        </PrivateRoute>
        <PrivateRoute exact path="/payment">
          <Payment />
        </PrivateRoute>
        <PrivateRoute path="/payment/:id">
          <PaymentDetail />
        </PrivateRoute>
        <Route path="/admin">
          <AdminRoute />
        </Route>
        <Route path="/corporate">
          <CorporateRoute />
        </Route>
      </Switch>
    </Router>
  )
}
export default Routes
