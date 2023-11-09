import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Index from './pages/index'
import EmptyPage from './pages/empty-page'
import PricingTables from './pages/pricing-tables'
import ReactSelect from './pages/react-select'
import Dashboard from './pages/dashboard'
import Alerts from './pages/alerts'
import Badges from './pages/badges'
import BarCharts from './pages/bar-charts'
import Breadcrumbs from './pages/breadcrumbs'
import Buttons from './pages/buttons'
import ComingSoon from './pages/coming-soon'
import ContactUs1 from './pages/contact-us-1'
import CountryFlags from './pages/country-flags'
import CreateAccount from './pages/create-account'
import Datatables from './pages/datatables'
import DefaultForms from './pages/default-forms'
import DefaultTables from './pages/default-tables'
import Demo1 from './pages/demo-1'
import Demo2 from './pages/demo-2'
import Demo3 from './pages/demo-3'
import Demo4 from './pages/demo-4'
import Demo5 from './pages/demo-5'
import Demo6 from './pages/demo-6'
import Documentation from './pages/documentation'
import EmailConfirmation from './pages/email-confirmation'
import ErrorPage from './pages/error-page'
import ForgotPassword from './pages/forgot-password'
import Images from './pages/images'
import LineCharts from './pages/line-charts'
import Lists from './pages/lists'
import LockScreen from './pages/lock-screen'
import Login1 from './pages/login-1'
import Login2 from './pages/login-2'
import Login3 from './pages/login-3'
import Logout from './pages/logout'
import Modals from './pages/modals'
import OtherCharts from './pages/other-charts'
import Pagination from './pages/pagination'
import PieCharts from './pages/pie-charts'
import Popovers from './pages/popovers'
import Tooltips from './pages/tooltips'
import PrivacyPolicy from './pages/privacy-policy'
import ProgressBars from './pages/progress-bars'
import Notifications from './pages/notifications'
import ResetPassword from './pages/reset-password'
import Sliders from './pages/sliders'
import Subscribe from './pages/subscribe'
import Switches from './pages/switches'
import Tabs from './pages/tabs'
import TermsOfService from './pages/terms-of-service'
import Typography from './pages/typography'
import UserProfile from './pages/user-profile'
import Datepicker from './pages/datepicker'
import LeafletMaps from './pages/leaflet-maps'
import VectorMaps from './pages/vector-maps'
import Dropdowns from './pages/dropdowns'
import TextEditor from './pages/text-editor'
import DragAndDrop from './pages/drag-and-drop'
import Kanban from './pages/kanban'
import FileUploads from './pages/file-uploads'
import Todo from './pages/todo'
import Inbox from './pages/inbox'
import Steps from './pages/steps'
import Validation from './pages/validation'
import ReactIcons from './pages/react-icons'
import SampleForms from './pages/sample-forms'
import Landing from './pages/landing'
import Tasks from './pages/tasks'
import SocialFeed from './pages/social-feed'
import Support1 from './pages/support-1'
import Invoice from './pages/invoice'
import Ecommerce from './pages/e-commerce'

const Routes = () => {
  return (
    <Switch>
      <Route path="/e-commerce">
        <Ecommerce />
      </Route>
      <Route path="/support-1">
        <Support1 />
      </Route>
      <Route path="/invoice">
        <Invoice />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/pricing-tables">
        <PricingTables />
      </Route>
      <Route path="/react-select">
        <ReactSelect />
      </Route>
      <Route path="/social-feed">
        <SocialFeed />
      </Route>
      <Route path="/tasks">
        <Tasks />
      </Route>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/sample-forms">
        <SampleForms />
      </Route>
      <Route path="/react-icons">
        <ReactIcons />
      </Route>
      <Route path="/validation">
        <Validation />
      </Route>
      <Route path="/steps">
        <Steps />
      </Route>
      <Route path="/inbox">
        <Inbox />
      </Route>
      <Route path="/todo">
        <Todo />
      </Route>
      <Route path="/file-uploads">
        <FileUploads />
      </Route>
      <Route path="/kanban">
        <Kanban />
      </Route>
      <Route path="/drag-and-drop">
        <DragAndDrop />
      </Route>
      <Route path="/text-editor">
        <TextEditor />
      </Route>
      <Route path="/dropdowns">
        <Dropdowns />
      </Route>
      <Route path="/vector-maps">
        <VectorMaps />
      </Route>
      <Route path="/leaflet-maps">
        <LeafletMaps />
      </Route>
      <Route path="/datepicker">
        <Datepicker />
      </Route>
      <Route path="/empty-page">
        <EmptyPage />
      </Route>
      <Route path="/alerts">
        <Alerts />
      </Route>
      <Route path="/badges">
        <Badges />
      </Route>
      <Route path="/bar-charts">
        <BarCharts />
      </Route>
      <Route path="/breadcrumbs">
        <Breadcrumbs />
      </Route>
      <Route path="/buttons">
        <Buttons />
      </Route>
      <Route path="/coming-soon">
        <ComingSoon />
      </Route>
      <Route path="/contact-us">
        <ContactUs1 />
      </Route>
      <Route path="/contact-us-1">
        <ContactUs1 />
      </Route>
      <Route path="/country-flags">
        <CountryFlags />
      </Route>
      <Route path="/create-account">
        <CreateAccount />
      </Route>
      <Route path="/datatables">
        <Datatables />
      </Route>
      <Route path="/default-forms">
        <DefaultForms />
      </Route>
      <Route path="/default-tables">
        <DefaultTables />
      </Route>
      <Route path="/demo-1">
        <Demo1 />
      </Route>
      <Route path="/demo-2">
        <Demo2 />
      </Route>
      <Route path="/demo-3">
        <Demo3 />
      </Route>
      <Route path="/demo-4">
        <Demo4 />
      </Route>
      <Route path="/demo-5">
        <Demo5 />
      </Route>
      <Route path="/demo-6">
        <Demo6 />
      </Route>
      <Route path="/documentation">
        <Documentation />
      </Route>
      <Route path="/email-confirmation">
        <EmailConfirmation />
      </Route>
      <Route path="/error-page">
        <ErrorPage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/images">
        <Images />
      </Route>
      <Route path="/line-charts">
        <LineCharts />
      </Route>
      <Route path="/lists">
        <Lists />
      </Route>
      <Route path="/lock-screen">
        <LockScreen />
      </Route>
      <Route path="/login">
        <Login1 />
      </Route>
      <Route path="/login-1">
        <Login1 />
      </Route>
      <Route path="/login-2">
        <Login2 />
      </Route>
      <Route path="/login-3">
        <Login3 />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/modals">
        <Modals />
      </Route>
      <Route path="/other-charts">
        <OtherCharts />
      </Route>
      <Route path="/pagination">
        <Pagination />
      </Route>
      <Route path="/pie-charts">
        <PieCharts />
      </Route>
      <Route path="/tooltips">
        <Tooltips />
      </Route>
      <Route path="/popovers">
        <Popovers />
      </Route>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route path="/progress-bars">
        <ProgressBars />
      </Route>
      <Route path="/notifications">
        <Notifications />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/sliders">
        <Sliders />
      </Route>
      <Route path="/subscribe">
        <Subscribe />
      </Route>
      <Route path="/switches">
        <Switches />
      </Route>
      <Route path="/tabs">
        <Tabs />
      </Route>
      <Route path="/terms-of-service">
        <TermsOfService />
      </Route>
      <Route path="/typography">
        <Typography />
      </Route>
      <Route path="/user-profile">
        <UserProfile />
      </Route>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route component={Index} />
    </Switch>
  )
}
export default Routes
