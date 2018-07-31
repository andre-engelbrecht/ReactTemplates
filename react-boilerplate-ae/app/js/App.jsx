//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import ListView from './components/Pages/ListView.jsx'
import DetailsView from './components/Pages/DetailsView.jsx'
import Components from './components/Pages/Components.jsx'
import Dashboard from './components/Pages/Dashboard.jsx'
import TableView from './components/Pages/TableView.jsx'
import CarouselView from './components/Pages/CarouselView.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/navigation/Footer.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx';
import LoggedOut from './components/Authentication/LoggedOut.jsx';
import LoadingPanel from './components/input/LoadingPanel.jsx'

const mapStateToProps = (state, props) => {
  let { general: { loading } } = state
  return { loading }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.getNavbar = this.getNavbar.bind(this)

    let showNavbar = true
    if (location.toString().includes("navbar=hidden")) {
      showNavbar = false
    }

    this.state = { navbar: showNavbar }
  }

  getNavbar() {
    if (this.state.navbar) {
      return <Navbar />
    }
  }

  render() {

    let { loading } = this.props

    return (
      <div className="container">
        <Router>
          <div>

            {this.getNavbar()}

            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/loggedout" component={LoggedOut} exact />
              <Route path="/callback" component={CallbackPage} />
              <Route path="/comp" component={Components} />
              <Route path="/list" component={ListView} />
              <Route path="/details/:id" component={DetailsView} exact />
              <Route path="/dash" component={Dashboard} />
              <Route path="/table" component={TableView} />
              <Route path="/carousel" component={CarouselView} />
            </Switch>

            <br />
            <Footer />

            <LoadingPanel enabled={loading} />

          </div>

        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
