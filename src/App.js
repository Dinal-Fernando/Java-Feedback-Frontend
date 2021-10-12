import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect,BrowserRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const ForgetPassword = React.lazy(() => import('./views/Pages/ForgetPassword'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Loader = React.lazy(() => import('./views/Pages/Loader/Loader'));


const isAuthenticated = () => {
  let state=false;
  localStorage.getItem('AccessToken') ? state=true:state=false ;
  console.log(state)
  return state;
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Loader Page" render={props => <Loader {...props}/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/forgetPassword" name="Forget Password" render={props => <ForgetPassword {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {/*<Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />*/}
              <AuthenticatedRoute path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
