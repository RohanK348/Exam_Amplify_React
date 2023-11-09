import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {AuthRoute, PrivateAdminRoute, PrivateRoute} from './middleware'
import {QuestionProvider} from '../provider/question'
import {TemplateProvider} from '../provider/template'
import { PriceCandidateProvider } from '../provider/priceCandidate'
import { ImproveTemplateProvider } from '../provider/improveTemplate'
import Login from '../containers/auth/login'
import Logout from '../containers/auth/logout'
import AllQuestion from '../containers/admin/allQuestion/index'
import Topic from '../containers/admin/topic/index'
import SubTopic from '../containers/admin/subtopic/index'
import Question from '../containers/admin/question/index'
import QuestionDetail from '../containers/admin/question/detail/index'
import Paragraph from '../containers/admin/paragraph/index'
import Template from '../containers/admin/template/index'
import TemplateDetail from '../containers/admin/template/detail/index'
import TemplateTopic from '../containers/admin/template/topic/index'
import TemplateSubTopic from '../containers/admin/template/subtopic/index'
import SimpleTemplate from '../containers/admin/simpleTemplate/index'
import SimpleBrainTemplate from '../containers/admin/simpleTemplate/brain'
import SimpleParagraph from '../containers/admin/simpleTemplate/paragraph/index'
import ImproveTemplate from "../containers/admin/improveTemplate/index"
import Department from "../containers/admin/department/index"
import EditImproveTemplate from "../containers/admin/improveTemplate/edit/index";
import Exam from '../containers/admin/exam/index'
import ResultCompany from '../containers/admin/result/exam/company/index'
import ResultOpening from '../containers/admin/result/exam/company/opening'
import ResultCompanyExam from '../containers/admin/result/exam/company/exam'
import ResultExam from '../containers/admin/result/exam/admin'
import ExamDetail from '../containers/admin/exam/detail/index'
import ExamView from '../containers/admin/exam/view'
import StudentAnalisis from '../containers/admin/exam/detail/student/index'
import StudentDetail from '../containers/admin/exam/detail/student/detail'
import CompanyStudent from '../containers/admin/result/cumulative/company/student'
import CumulativeCompany from '../containers/admin/result/cumulative/company/cumulative'
import AdminStudent from '../containers/admin/result/cumulative/admin/student'
import CumulativeAdmin from '../containers/admin/result/cumulative/admin/cumulative'
import UserBlock from '../containers/admin/user/block'
import CompanyVerify from '../containers/admin/user/verify'
import CorporatePrice from '../containers/admin/payment/price/corporate'
import CandidatePrice from '../containers/admin/payment/price/candidate'
import CandidatePriceDetail from '../containers/admin/payment/price/candidate/detail/index'
import CandidateCoupon from '../containers/admin/payment/coupon/candidate/index'
import CorporateCoupon from '../containers/admin/payment/coupon/corporate/index'
import SettingPrice from '../containers/admin/payment/setting'
import Company from '../containers/admin/company/index'
import CompanyTemplate from '../containers/admin/company/template'

const AdminRoutes = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PrivateAdminRoute exact path="/admin/allQuestion">
          <AllQuestion />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/topic">
          <Topic />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/topic/:id">
          <SubTopic />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/subtopic/:id">
          <Question />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/paragraph/:id">
          <Paragraph />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/question/:id">
          <QuestionProvider>
            <QuestionDetail />
          </QuestionProvider>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/template">
          <Template />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/template/:id">
          <TemplateProvider>
            <TemplateDetail />
          </TemplateProvider>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/template/topic/:id">
          <TemplateSubTopic />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/template/:brain/:id">
          <TemplateTopic />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/simpleTemplate">
          <SimpleTemplate />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/simpleTemplate/:id">
          <SimpleBrainTemplate />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/simpleTemplate/paragraph/:id">
          <SimpleParagraph />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/department">
          <Department />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/department/:id">
          <ImproveTemplate />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/improveTemplate/:id">
          <ImproveTemplateProvider>
            <EditImproveTemplate />
          </ImproveTemplateProvider>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam">
          <Exam />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/company">
          <ResultCompany />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/company/:id">
          <ResultOpening />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/opening/:id">
          <ResultCompanyExam />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/empowerr">
          <ResultExam />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam/detail/:id">
          <ExamDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam/view/:id">
          <ExamView />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam/detail/:examId/:index">
          <StudentAnalisis />
        </PrivateAdminRoute>
        <PrivateAdminRoute
          exact
          path="/admin/exam/student/detail/:examId/:userId"
        >
          <StudentDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/cumulative/company">
          <CompanyStudent />
        </PrivateAdminRoute>
        <PrivateAdminRoute
          exact
          path="/admin/result/cumulative/company/detail/:id"
        >
          <CumulativeCompany />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/result/cumulative/empowerr">
          <AdminStudent />
        </PrivateAdminRoute>
        <PrivateAdminRoute
          exact
          path="/admin/result/cumulative/empowerr/detail/:id"
        >
          <CumulativeAdmin />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/user/block">
          <UserBlock />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/company">
          <Company />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/company/template/:id">
          <CompanyTemplate />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/company/verify">
          <CompanyVerify />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/company/price">
          <CorporatePrice />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/candidate/price">
          <CandidatePrice />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/candidate/price/detail/:id">
          <PriceCandidateProvider>
            <CandidatePriceDetail />
          </PriceCandidateProvider>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/candidate/coupon/:id">
          <CandidateCoupon />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/corporate/coupon/:id">
          <CorporateCoupon />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/price/setting">
          <SettingPrice />
        </PrivateAdminRoute>
      </Switch>
    </Router>
  );
}
export default AdminRoutes
