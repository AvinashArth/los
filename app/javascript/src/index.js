
import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./layouts/Admin/Admin.js";
import RTLLayout from "./layouts/RTL/RTL.js";
import AuthLayout from "./layouts/Auth/Auth.js";
import "../src/assets/css/black-dashboard-react.css"
import "../src/assets/css/black-dashboard-react.min.css"
import "../src/assets/css/nucleo-icons.css"
 import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
 import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const app = () => {
  return(<>
    <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
    </>)
}
export default app
