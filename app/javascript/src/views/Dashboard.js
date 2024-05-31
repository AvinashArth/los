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
import React,{useEffect, useState, forwardRef} from "react";
// nodejs library that concatenates classes
import { BarChart } from "./Barchart/BarChart.js";
// import DateRange from "./DateRange/DateRange.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import Pagination  from "rc-pagination";
import "react-datepicker/dist/react-datepicker.css";
import "../views/Funnal/Dashboard.scss";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
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
import Funnel from "./Funnal/Funnal.js";
function Dashboard()  {
 //dashboardList
 const [customerDetailsInfo, setCustomerDetailsInfo] = useState({});
 const [selectedDateRange, setSelectedDateRange] = useState(null);

 const [userDetails, setUserDetails] = useState(null);
 const [funnelData, setFunnelData] = useState('');
 const [chartData, setChartData] = useState({});
 const [isLoading, setIsLoading] = useState(true);
 const [filterInput,setFilterInput] = useState("");
 const [filterValue, setFilterValue] = useState("");
 
 let today = moment().utc().startOf("day").toDate();
 let yesterday = moment().subtract(1, "days").utc().startOf("day").toDate();
 let weekAgo = moment().subtract(7, "days").utc().startOf("day").toDate();
 let thirtyDaysAgo = moment()
   .subtract(30, "days")
   .utc()
   .startOf("day")
   .toDate();

 let lastMonthStart = moment()
   .subtract(1, "month")
   .utc()
   .startOf("month")
   .startOf("day")
   .toDate();

 const [dateRange, setDateRange] = useState([today, today]);
 const [startDate, endDate] = dateRange;

 const setRange = (fromDate, ToDate) => {
   setDateRange([fromDate, ToDate]);
 };

 
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
          setFunnelData(res.total_data);
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

// const handleDateRangeInput = (key, value) => {
//         console.log('Selected Date Range:', value);
//         setSelectedDateRange(value);
// }
 function handlebarChart()  {
  // console.log(customerDetailsInfo && customerDetailsInfo.fetch_data)
   return (<>
    <DataChart datacharts={customerDetailsInfo && customerDetailsInfo.fetch_data} />
        {/* <Doughnut data={chartData} /> */}
    </>)
 }
 const CustomInput = forwardRef(({ value, onClick }, ref) => {
  console.log(value);
  let rangeArray = value.split(" - ");
  console.log(rangeArray[0]);
  console.log(rangeArray[1]);
  let displayValue;
  if (rangeArray[1]) {
    let displayEnd = new Date(rangeArray[0]);
    let displayStart = new Date(rangeArray[1]);

    if (rangeArray[0] === rangeArray[1]) {
      displayValue = moment(displayStart).format("MMMM Do YYYY") + " UTC";
    } else {
      if (moment(displayStart).isAfter(displayEnd)) {
        displayValue =
          moment(displayStart).format("MMMM Do YYYY") +
          " - " +
          moment(displayEnd).format("MMMM Do YYYY") +
          " UTC";
      } else {
        displayValue =
          moment(displayEnd).format("MMMM Do YYYY") +
          " - " +
          moment(displayStart).format("MMMM Do YYYY") +
          " UTC";
      }
    }
  } else {
    let displayDate = new Date(rangeArray[0]);
    displayValue = moment(displayDate).format("MMMM Do YYYY") + " UTC";
  }

  return (
    <input
      id="pickInput"
      style={{ width: "100%" }}
      onClick={onClick}
      ref={ref}
      value={displayValue}
      onKeyDown={(e) => {
        if (e.keyCode === 40) {
          document.getElementById("pickInput").click();
        }
      }}
      readOnly
    />
  );
});
const PerPageChange = (value) => {
  setSize(value);
  const newPerPage = Math.ceil(customerDetailsInfo.length / value);
  if (current > newPerPage) {
      setCurrent(newPerPage);
  }
}

const getData = (current, pageSize) => {
  // Normally you should get the data from the server
  return customerDetailsInfo.slice((current - 1) * pageSize, current * pageSize);
};

const PaginationChange = (page, pageSize) => {
  setCurrent(page);
  setSize(pageSize)
}

const PrevNextArrow = (current, type, originalElement) => {
  if (type === 'prev') {
      return <button><i className="fa fa-angle-double-left"></i></button>;
  }
  if (type === 'next') {
      return <button><i className="fa fa-angle-double-right"></i></button>;
  }
  return originalElement;
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
            <Card className="card-stats" style={{background:"#F84540"}}>
              <CardBody>
                <Row>
                  {/* <Funnel data={funnelData} handleInput={handleDateRangeInput}/> */}
                  {/* <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col> */}
                  <Col md="12" xs="12">
                    <div className="numbers hover-effect" >
                      <div className="ptextcenter ptextcolor" >Total Leads</div>
                      <CardTitle className="pstyle ptextcenter" style={{textAlign:"-webkit-center"}} tag="p">
                      <div className="white-circle p-span">
            {customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.all_cust}
          </div>
          <span className='white-line'></span>
                        {/* {customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.all_cust} */}
                        </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats" style={{background:"green", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
              <CardBody>
                <Row>
                  {/* <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col> */}
                  <Col md="12" xs="12">
                  <div className="numbers hover-effect">
                  <div className="ptextcenter ptextcolor" >Total Disbursed Leads</div>
                      <CardTitle className="pstyle ptextcenter" style={{textAlign:"-webkit-center"}} tag="p">
                      <div className="white-circle p-span">
                      {customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.total_disburse_lead}
                   </div>
          <span className='white-line'></span>
                      </CardTitle>
                      <p />
                    </div>
                    
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats" style={{background:"#FD8C15"}}>
              <CardBody>
                <Row>
                  <Col md="12" xs="12">
                  <div className="numbers hover-effect" >
                  <div className="ptextcenter ptextcolor" >Total Disbursed Amount</div>
                      <CardTitle className="pstyle ptextcenter" style={{textAlign:"-webkit-center"}} tag="p">
                      <div className="white-circle p-span">
                      {customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.total_disburse_amount}
                   </div>
                      <span className='white-line'></span>
                      </CardTitle>
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
            <Card className="cardstyle">
              <CardHeader>
                <CardTitle tag="h5" className="pstyle">Funnel Status</CardTitle>
                {/* <p className="card-category">24 Hours performance</p> */}
              </CardHeader>
              <CardBody>
              <Form className="contact-forms">
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                       <Input
                       className="form-control"
                        type="select"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                        >
                        <option>
                         Please Select
                        </option>
                        <option>
                         Partner 1
                        </option>
                        <option>
                          Partner 2
                       </option>
                       <option>
                        Partner 3
                       </option>
                       <option>
                          Partner 4
                       </option>
                       </Input>
                      </FormGroup>
                    </Col>
                      <Col className="px-md-1" md="6">
                      <DatePicker
            selectsRange={true}
            // dateFormat="MMMM dd, yyyy O"
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            monthsShown={2}
            maxDate={today}
            minDate={lastMonthStart}
             customInput={<CustomInput />}
          />
                        
                    </Col> 
                  </Row>
                </Form>
                {handlebarChart()}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="cardstyle">
              <CardHeader>
                <CardTitle tag="h5" className="pstyle">Leads Table List</CardTitle>
                {/* <p className="card-category">Last Campaign Performance</p> */}
              </CardHeader>
              <CardBody >
              <div className="table-responsive">
              
                                <table className="table table-text-small mb-0">
                                    <thead className="thead-primary table-sorting">
                                        <tr className="background:#f8d7da">
                                            <th className="td-table">Customer Id</th>
                                            <th className="td-table">Customer Name</th>
                                            <th className="td-table">Mobile Number</th>
                                            <th>Loan Amount</th>
                                            {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <th className="td-table">Partner Name</th> : null}
                                            <th className="td-table">Lender Name</th>
                                            <th className="td-table">Status</th>
                                            <th className="td-table">Onboarding At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData(current, size).map((data, index) => {
                                                return (
                                                    <tr key={data.customer_info_id}>
                                                        <td className="td-table" style={{color:"black !important", fontWeight:"bold"}}>{data.customer_info_id}</td>
                                                        <td className="td-table">{data.name}</td>
                                                        <td className="td-table">{data.mobile}</td>
                                                        <td className="td-table">{data.amount_offered}</td>
                                                        {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <td className="td-table">{data.partner_code}</td> : null}
                                                        <td className="td-table">{data.lender_code}</td>
                                                        <td className="td-table">{data.status}</td>
                                                        <td className="td-table">{data.created_at !== null ? convertDateTime(data.created_at):""}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    
                                </table>
                 </div>
                  <div className="table-filter-info">
                                
                                <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={customerDetailsInfo.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                  </div>        
                {/* {handlePartnerData()} */}
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
