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
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
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

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/charts.js";
import { Task } from "../backend-sdk/task.sdk";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
 //dashboardList
 const [customerDetailsInfo, setCustomerDetailsInfo] = useState({});
 const [userDetails, setUserDetails] = useState(null);
 const [chartData, setChartData] = useState({});
 const handleChartFunction = (labels, datas) => {
  console.log(labels, datas)
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: datas,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  setChartData(data)
 }
 

 const customerDetailsList = (id, token) => {
  Task.dashboardList(token)
    .then((res) => {
      setCustomerDetailsInfo(res);
      handleChartFunction(res && res.TIDE && res.TIDE.labels, res && res.TIDE && res.TIDE.datasets);
    })
    .catch((err) => {
      console.log(err.error);
    });
};

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('user'));
  setUserDetails(items);
  if (items) {
    customerDetailsList(items.id, items.token);
  }
}, []);

 const handlebarChart = () => {
  console.log(chartData)
    return (<>
        <Doughnut data={chartData} />
    </>)
 }

  return (
    <>
      <div className="content">
      <div className="content">
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
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.all_cust}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter> */}
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
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.total_disburse_amount}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter> */}
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
                      <CardTitle tag="p">{customerDetailsInfo && customerDetailsInfo.total_disburse_lead}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
              {/* {console.log(customerDetailsInfo && customerDetailsInfo.TIDE && customerDetailsInfo.TIDE.labels, customerDetailsInfo && customerDetailsInfo.TIDE && customerDetailsInfo.TIDE.datasets)}
              {chartData && (<></>)}
              <Doughnut data={chartData} /> */}
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                {/* <BarChart
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                /> */}
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                {/* <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                /> */}
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
