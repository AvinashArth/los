
import React,{useEffect, useState, forwardRef} from "react";
// nodejs library that concatenates classes
import { BarChart } from "./Barchart/BarChart.js";
import DateRange from "./DateRange/DateRange.js";
import "../views/Funnal/Dashboard.scss";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Alert,
  Input,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import { Task } from "../backend-sdk/task.sdk";
import DataChart from "./DataChart/DataChart.js";
import TableComponent from "./Table/Table.js";
function Dashboard()  {
 //dashboardList
 const [customerDetailsInfo, setCustomerDetailsInfo] = useState({});
 const [selectedDateRange, setSelectedDateRange] = useState(null);
 const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
 const [userDetails, setUserDetails] = useState(null);
 const [funnelData, setFunnelData] = useState('');
 const [chartData, setChartData] = useState({});
 const [isLoading, setIsLoading] = useState(true);
 const [filterInput,setFilterInput] = useState("TIDE");
 const [filterInputFiled, setFilterInputField] = useState("");
 const onDismiss = () => setVisible(false);
 const[startDates, setStartDates] = useState(null)
 const [endDates, setEndDates] = useState(null);
 const [filterValue, setFilterValue] = useState("");
 const [visible, setVisible] = useState(false);
 const [error, setError] = useState("");
 const [values, setValues] = useState([]);

 const customerDetailsList = async(token, data) => {
  if (!verficationHandleing(data.partner_code)) {
    return; // Exit function if validation fails
  }
  try {
    const res = await Task.dashboardList(token, data); // Await the promise
    setCustomerDetailsInfo(res);
    setIsLoading(false);
  } catch (err) {
    console.log(err.error);
    setIsLoading(false);

  }
};
const verficationHandleing = (value) => {
  if(value === "Please Select"){
    setVisible(true);
    setError("Please Select Partner name");
    setTimeout(() => {
      setVisible(false); // Set visibility to false after 5 second
    }, 5000);
    return false;
  }
  return true;
}

useEffect(() => {
  let isMounted = true; // Flag to track if the component is mounted

  const fetchData = async () => {
    const items = JSON.parse(localStorage.getItem('user'));
    setUserDetails(items);
    if (!verficationHandleing(filterInput)) {
      return; // Exit function if validation fails
    }
    if (items) {
      try {
        const data ={
          partner_code : items.role === "Admin"? filterInput: items.role_code,
          start_date:startDate,
          end_date: endDate
        }
        const res = await Task.dashboardList(items.token, data);
        if (isMounted) {
          // Check if the component is still mounted before updating the state
          setCustomerDetailsInfo(res);
          setFilterInputField(res.fetch_data.Partner)
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


 const handleCustomerFilter = () => {
  const data ={
    partner_code : userDetails.role === "Admin"? filterInput: userDetails.role_code,
    start_date:startDate,
    end_date: endDate
  }
  
  customerDetailsList(userDetails.token,data)
  setEndDate(null)
  setStartDate(null)
 } 
 const handleclearFilter = () => {
  
  const data ={
    partner_code : userDetails.role === "Admin"? filterInput: userDetails.role_code,
    start_date: null,
    end_date: null
  }
  
  customerDetailsList(userDetails.token,data)
  setEndDate(null)
  setStartDate(null)
}

const handlefilterInput = (value) => {
  setFilterInput(value)
  const data ={
    partner_code : value,
    start_date:startDate,
    end_date: startDate
  }
  
  customerDetailsList(userDetails.token,data)
}

 function handlebarChart()  {
    return (<>
      <DataChart datacharts={customerDetailsInfo.fetch_data.partner} />
      </>)
 }
 
//  function handlePartnerData(){
//   return (<>
//   {/* <BarChart labels={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.labels}/> */}
//     <BarChart labels={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.labels} 
//     datas={customerDetailsInfo && customerDetailsInfo.partner_leads && customerDetailsInfo.partner_leads.TIDE && customerDetailsInfo.partner_leads.TIDE.datasets}/> 
    
//     </>)
//  }
  
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
                  <Col md="12" xs="12">
                    <div className="numbers hover-effect" >
                      <div className="ptextcenter ptextcolor" >Total Leads</div>
                      <CardTitle className="pstyle ptextcenter" style={{textAlign:"-webkit-center"}} tag="p">
                      <div className="white-circle p-span">
                      {customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.all_cust}
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
            <Card className="card-stats" style={{background:"green", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
              <CardBody>
                <Row>
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
                      ₹ {parseFloat(customerDetailsInfo && customerDetailsInfo.total_data && customerDetailsInfo.total_data.total_disburse_amount).toLocaleString()}
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
            <Alert isOpen={visible} toggle={onDismiss} color="danger">
                {error}
              </Alert>
              <CardHeader>
                <CardTitle tag="h5" className="pstyle">Funnel Status</CardTitle>
              </CardHeader>
              <CardBody>
            
                {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? (<>
                  <Row>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                       <Input
                       className="form-control"
                        type="select"
                        value={filterInput}
                        onChange={(e) => handlefilterInput(e.target.value)}
                        >
                        <option>
                         Please Select
                        </option>
                        <option>
                         TIDE
                        </option>
                        <option>
                          HAPPY
                       </option>
                       
                       </Input>
                      </FormGroup>
                    </Col>
                   
                    <Col className="px-md-1" md="2" >
                      <FormGroup>
                      <Input
                          placeholder={"Start Date"}
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2" >
                      <FormGroup>
                        <Input
                          placeholder={"End Date"}
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                      <Col className="px-md-1 p-button" md="2" >
                        <Button style={{margin:"0%"}} className="btn-fill" onClick={handleCustomerFilter} color="primary" >
                      Filter
                     </Button>
                     </Col>
                      <Col className="px-md-1 p-button" md="2">
                    <Button style={{margin:"0%"}} className="btn-fill" onClick={handleclearFilter} color="" type="submit">
                      Clear
                     </Button>
                    </Col> 
                  
                  </Row>
                </>):(<>
                  <Row>
                  <Col className="px-md-1" md="4">
                    </Col>
                   
                    {/* <Form className="contact-forms">
                  <Row> */}
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                      <Input
                          placeholder={"Start Date"}
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <Input
                          placeholder={"End Date"}
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                      <Col className="px-md-1 p-button" md="2">
                        <Button style={{margin:"0%"}} className="btn-fill" onClick={handleCustomerFilter} color="primary" >
                      Filter
                     </Button>
                     </Col>
                      <Col className="px-md-1 p-button" md="2">
                    <Button style={{margin:"0%"}} className="btn-fill" onClick={handleclearFilter} color="" type="submit">
                      Clear
                     </Button>
                    </Col> 
                  {/* </Row>
                 </Form> */}
                    
                  </Row>
                </>)}
                {handlebarChart()}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
          <Card className="cardstyle">
            <CardBody>
             <TableComponent data={customerDetailsInfo.fetch_data} />
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
