/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./layouts/Admin/Admin.js";
import RTLLayout from "./layouts/RTL/RTL.js";
import AuthLayout from "./layouts/Auth/Auth.js";
import "../src/assets/css/black-dashboard-react.css"
import "../src/assets/css/black-dashboard-react.min.css"
import "../src/assets/css/nucleo-icons.css"
// import "../src/assets/css/black-dashboard-react.css.map"
//  import "../src/assets/scss/black-dashboard-react.scss";
// import "../src/assets/css/demo.css";
// import "../src/assets/css/nucleo-icons.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";

 import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
 import CustomerDetailsForm from "./views/onBoard/CustomerForm.js";
 import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

//const root = ReactDOM.createRoot(document.getElementById("root"));
const app = () => {
  return(<>
    <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          {/* <Route path="/onboards" component={<CustomerDetailsForm/>} /> */}
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
    </>)
}
export default app
// root.render(
//   <ThemeContextWrapper>
//     <BackgroundColorWrapper>
//       <BrowserRouter>
//         <Switch>
//           <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//           <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
//           <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
//           <Redirect from="/" to="/auth/login" />
//         </Switch>
//       </BrowserRouter>
//     </BackgroundColorWrapper>
//   </ThemeContextWrapper>
// );
