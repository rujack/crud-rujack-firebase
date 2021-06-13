import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/Pages/Login'
import Register from './Component/Pages/Register';
import Dashboard from './Component/Pages/Dashboard'
import { Provider } from 'react-redux';
import { store } from './Config/redux'
import ProtectedComponent from './Component/Common';

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedComponent/>
          <Switch>
            <Route exact path="/"component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}