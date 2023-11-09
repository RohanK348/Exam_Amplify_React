import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {AuthRoute, PrivateCorporateRoute, PrivateRoute} from './middleware'
import Login from '../containers/auth/login'
import Logout from '../containers/auth/logout'
import Dashboard from '../containers/corporate/index'
import Profile from '../containers/corporate/profile/index'
import CreateOpening from '../containers/corporate/opening/create/index'
import EditOpening from '../containers/corporate/opening/edit/index'
import DetailOpening from '../containers/corporate/opening/detail/index'
import Opening from '../containers/corporate/opening/index'
import CreateExam from '../containers/corporate/exam/create/index'
import EditExam from '../containers/corporate/exam/edit/index'
import Result from '../containers/corporate/result/index'
import ResultStudent from '../containers/corporate/result/student'
import ResultDetail from '../containers/corporate/result/detail/index'
import Payment from '../containers/corporate/payment/index'
import PaymentDetail from '../containers/corporate/payment/detail'
import AppliedCandidate from '../containers/corporate/students/all'
import SimpleTemplate from '../containers/corporate/simpleTemplate/index'
import SimpleBrainTemplate from '../containers/corporate/simpleTemplate/brain'
import SimpleParagraph from '../containers/corporate/simpleTemplate/paragraph/index'
import ImproveTemplate from '../containers/corporate/improveTemplate/index'
import CreateImproveTemplate from '../containers/corporate/improveTemplate/create/index'
import EditImproveTemplate from '../containers/corporate/improveTemplate/edit/index'

const CorporateRoutes = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PrivateCorporateRoute exact path="/corporate">
          <Dashboard />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/profile">
          <Profile />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/opening/create">
          <CreateOpening />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/opening/edit/:id">
          <EditOpening />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/opening/detail/:id">
          <DetailOpening />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/opening">
          <Opening />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/exam/create/:id">
          <CreateExam />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/exam/edit/:id">
          <EditExam />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/exam/result/:id">
          <Result />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/exam/result/:examId/:index">
          <ResultStudent />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/exam/result/detail/:examId/:userId">
          <ResultDetail />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/payment">
          <Payment />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute path="/corporate/payment/:id">
          <PaymentDetail />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute path="/corporate/appliedCandidate">
          <AppliedCandidate />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/simpleTemplate">
          <SimpleTemplate />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/simpleTemplate/:id">
          <SimpleBrainTemplate />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/simpleTemplate/paragraph/:id">
          <SimpleParagraph />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/improveTemplate">
          <ImproveTemplate />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/improveTemplate/create">
          <CreateImproveTemplate />
        </PrivateCorporateRoute>
        <PrivateCorporateRoute exact path="/corporate/improveTemplate/:id">
          <EditImproveTemplate />
        </PrivateCorporateRoute>
      </Switch>
    </Router>
  )
}
export default CorporateRoutes
