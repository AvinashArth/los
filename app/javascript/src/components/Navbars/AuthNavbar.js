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
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Collapse,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  NavbarToggler,
} from "reactstrap";
import imageData from "../../assets/img/Happy-Tide.png";
import { useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/onboard";

  const [color, setcolor] = React.useState(isLoginPage? "rgb(60, 38, 110)" : "transparent !important");
  
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // React.useEffect(() => {
  //   if(location.pathname === "/auth/onboard"){

  //   }
  //    setLocationPath()
  // },[])
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      if(!isLoginPage){
        setcolor("transparent !important");
      } else {
        setcolor("rgb(60, 38, 110)");
      }
      
    } else {
      if(!isLoginPage){
        setcolor("transparent !important");
      } else {
        setcolor("rgb(60, 38, 110)");
      }
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      if(isLoginPage){
        setcolor("transparent !important");
      } else {
        setcolor("rgb(60, 38, 110)");
      }
    } else {
      if(isLoginPage){
        setcolor("transparent !important");
      } else {
        setcolor("rgb(60, 38, 110)");
      }
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
    {isLoginPage ? (<>
      <Navbar className={classNames("top_nav navbar-absolute css-1tgyln", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {isLoginPage ? (<>
              <Image style={{maxWidth:"40%", maxHeight:"30%"}} src={imageData} />
            </>):(<></>)}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar"></InputGroup>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
     </>):(<>
     <div style={{backgroundColor:'transparent !important'}}>
     <Navbar style={{backgroundColor:'ffffff !important'}} className={classNames("top_nav", "#ffffff")} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {isLoginPage ? (<>
              <Image style={{maxWidth:"40%", maxHeight:"30%"}} src={imageData} />
            </>):(<></>)}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar"></InputGroup>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
     </div>
     
     </>)}
     
    </>
  );
}

export default AdminNavbar;
