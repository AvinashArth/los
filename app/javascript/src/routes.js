
import Dashboard from "./views/Dashboard";
import TableList from "./views/TableList.js";
import UserProfile from "./views/UserProfile.js";
import Contact from "./views/Contact.js";
import Login from "./views/Login";
import Register from "./views/Register";
import CustomerDetailsForm from "./views/onBoard/CustomerForm.js";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/CustomerList",
    name: "Customer List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/Contact-us",
    name: "Contact Us",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Contact,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/onboard",
    name: "CustomerDetailsForm",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CustomerDetailsForm,
    layout: "/auth",
  },
];
export default routes;
