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
import React,{useEffect, useState} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import "./Contact.css"
const Contact = () => {
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address,setAddess] = useState("");
    const handleSubmit = () => {

    }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            {/* <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody> */}
              <div class="container">
      <span class="big-circle"></span>
      <img src="img/shape.png" class="square" alt="" />
      <div class="form">
        <div class="contact-info">
          <h3 class="title">Let's get in touch</h3>
          <p class="text" style={{color:"black"}}>
            <span>Address:</span> The Empire Business Centre, Empire Industries Ltd, 414 Senapati Bapat Marg, Lower Parel, Mumbai city Mumbai City MH 400013 IN
          </p>

          <div class="info">
            <div class="information">
              {/* <i class="fas fa-map-marker-alt"></i> &nbsp &nbsp */}

              <p class="text" style={{color:"black"}}><span>Email ID:</span> <span>compliance@happyness.net</span></p>
            </div>

            {/* <div class="information" style={{color:"black"}}>
              <i class="fas fa-envelope"></i> &nbsp &nbsp
              <p style={{color:"black"}}>lorem@ipsum.com</p>
            </div>
            <div class="information" style={{color:"black"}}>
              <i class="fas fa-phone"></i>&nbsp&nbsp
              <p style={{color:"black"}}>123-456-789</p>
            </div> */}
          </div>

          {/* <div class="social-media" style={{color:"black"}}>
            <p>Connect with us :</p>
            <div class="social-icons">
              <a href="#">
                <i><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
</svg></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div> */}
        </div>

        <div class="contact-form">
          <span class="circle one"></span>
          <span class="circle two"></span>

          <form action="index.html" autocomplete="off">
            <h3 class="title">Contact us</h3>
            <div class="input-container">
              <input type="text" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} class="input" />
              <label for="">Email</label>
              <span>Email</span>
            </div>
            {/* <div class="input-container">
              <input type="" name="email" class="input" />
              <label for="">Email</label>
              <span>Email</span>
            </div> */}
            <div class="input-container">
              <input type="tel" name="phone" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} class="input" />
              <label for="">Phone</label>
              <span>Phone</span>
            </div>
            <div class="input-container textarea">
              <textarea name="address" class="input" value={address} onChange={(e) => setAddess(e.target.value)}></textarea>
              <label for="">addess</label>
              <span>Address</span>
            </div>
            <input type="submit" onClick={handleSubmit} value="Send" class="btn" />
          </form>
        </div>
      </div>
    </div>
              {/* </CardBody>
            </Card> */}
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default Contact;
