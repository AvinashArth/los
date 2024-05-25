import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../src/index'
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "../src/layouts/Admin/Admin.js";
import RTLLayout from "../src/layouts/RTL/RTL.js";
import AuthLayout from "../src/layouts/Auth/Auth.js";

// import "../src/assets/scss/black-dashboard-react.scss";
// import "../src/assets/demo/demo.css";
// import "../src/assets/css/nucleo-icons.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App}/>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})