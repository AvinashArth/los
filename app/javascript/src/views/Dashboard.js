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
// nodejs library that concatenates classes
import { BarChart } from "./Barchart/BarChart.js";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { Task } from "../backend-sdk/task.sdk";
import DataChart from "./DataChart/DataChart.js";

function Dashboard()  {
 //dashboardList
 const [customerDetailsInfo, setCustomerDetailsInfo] = useState({});

 const [userDetails, setUserDetails] = useState(null);
 const [chartData, setChartData] = useState({});
 const [isLoading, setIsLoading] = useState(true);

 
 
 const customerDetailsList = async(id, token) => {
  try {
    const res = await Task.dashboardList(token); // Await the promise
    setCustomerDetailsInfo(res);
    // handleChartFunction(res); // Pass the response to handleChartFunction
  } catch (err) {
    console.log(err.error);
  }
};
 
useEffect(() => {
  let isMounted = true; // Flag to track if the component is mounted

  const fetchData = async () => {
    const items = JSON.parse(localStorage.getItem('user'));
    setUserDetails(items);
    if (items) {
      try {
        const res = await Task.dashboardList(items.id, items.token);
        if (isMounted) {
          // Check if the component is still mounted before updating the state
          setCustomerDetailsInfo(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
  };

  fetchData();

  // Cleanup function to be called when the component unmounts
  return () => {
    isMounted = false; // Update the flag to indicate that the component is unmounted
  };
}, []);

 function handlebarChart()  {
  // console.log(customerDetailsInfo && customerDetailsInfo.fetch_data)
   return (<>
    <DataChart datacharts={customerDetailsInfo && customerDetailsInfo.fetch_data} />
        {/* <Doughnut data={chartData} /> */}
    </>)
 }
 function handlePartnerData(){
  return (<>
  {/* <BarChart labels={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.labels}/> */}
    <BarChart labels={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.labels} 
    datas={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.datasets}/> 
    
    </>)
 }

  return (
    <>
      <div className="content">
        {isLoading ? (
        // Render a loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
         <>
          <Row>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Leads</p>
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.all_cust}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">total disbursed amount</p>
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.total_disburse_amount}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">total disbursed leads</p>
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.total_disburse_lead}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Funnel Status</CardTitle>
                {/* <p className="card-category">24 Hours performance</p> */}
              </CardHeader>
              <CardBody>
                {handlebarChart()}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Leads Status</CardTitle>
                {/* <p className="card-category">Last Campaign Performance</p> */}
              </CardHeader>
              <CardBody >
                {handlePartnerData()}
              </CardBody>
            </Card>
          </Col>
        </Row>
         </>
        )}
        
      </div>
    </>
  );
}

export default Dashboard;
