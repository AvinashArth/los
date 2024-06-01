import React, { useState, useEffect } from "react";
import Pagination  from "rc-pagination";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Table,
  Form,
  Input, FormGroup,
  Button,
  Row,
  Col
} from "reactstrap";
import "./Tables.css"
import { Task } from "../backend-sdk/task.sdk";

const Tables = () => {
   
     const [perPage, setPerPage] = useState(10);
     const [size, setSize] = useState(perPage);
     const [current, setCurrent] = useState(1);
     const [userDetails, setUserDetails] = useState(null);
     const [filterInput,setFilterInput] = useState("");
     const [filterValue, setFilterValue] = useState("");
     const [customerDetailsInfo, setCustomerDetailsInfo] = useState([]);

     const customerDetailsList = (id, token) => {
      Task.customerList(id, token)
      .then((res) => {
        // if(res.length > 0){
          setCustomerDetailsInfo(res);
          console.log(res)
        // }
        
      })
      .catch((err) => {
        console.log(err.error);
      });
     }
     //customerList
     useEffect(() => {
      const items = JSON.parse(localStorage.getItem('user'));
      setUserDetails(items);
      customerDetailsList(items && items.id, items && items.token)
     },[])
     function convertDateTime(dateTimeString) {
      // Create a new Date object with the given string
      const date = new Date(dateTimeString);
      // Extract individual components
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // January is 0
      const day = date.getDate();
      const formattedDateTime = `${year}-${month}-${day}`;
  
      return formattedDateTime;
  }

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
   

    const handleCustomerFilter = () => {
        Task.customerListFilter(userDetails && userDetails.id, userDetails && userDetails.token, filterInput, filterValue)
        .then((res) => {
            setCustomerDetailsInfo(res);
        })
        .catch((err) => {
          // console.log(err.error);
        });
    }
    const handleclearFilter= () => {
      customerDetailsList(userDetails && userDetails.id, userDetails && userDetails.token) 
    }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="cardstyle">
              <CardHeader>
                <CardTitle tag="h4" className="title" style={{color:'black', fontWeight:'bold'}}>Customer List</CardTitle>
              </CardHeader>
              <CardBody>
              <Form className="contact-forms">
                  <Row>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                      {/* <Label for="exampleSelect">
                        Select
                      </Label> */}
                       <Input
                       className="form-control"
                        // id="exampleSelect"
                        // name="select"
                        type="select"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                        >
                        <option>
                         Please Select
                        </option>
                        <option>
                         Customer Id
                        </option>
                        {/* <option>
                        Customer Name
                        </option> */}
                        <option>
                          Mobile Number
                       </option>
                       <option>
                       Loan Amount
                       </option>
                       <option>
                          Status
                       </option>
                       </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        {/* <label> Name</label> */}
                        <Input
                          // defaultValue="michael23"
                          placeholder={filterInput}
                          type="text"
                          value={filterValue}
                          onChange={(e) => setFilterValue(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                      <Col className="px-md-1" md="2">
                       
                        <Button className="btn-fill" onClick={handleCustomerFilter} color="primary" >
                      Filter
                     </Button>
                     </Col>
                     {/* </FormGroup> */}
                      {/* <FormGroup> */}
                      <Col className="px-md-1" md="2">
                    <Button className="btn-fill" onClick={handleclearFilter} color="" type="submit">
                      Clear
                     </Button>
                        
                    {/* <FormGroup> */}
                   
                     {/* </FormGroup> */}
                    </Col> 
                  </Row>
                </Form>
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
                                                    <tr key={data.customer_info_id} style={{backgroundColor: data.status === 'DISBURSED' ? 'green' : data.status === 'REJECTED' ? 'red' : ''}}>
                                                        <td  style={{color:"black !important", fontWeight:"bold"}}>{data.customer_info_id}</td>
                                                        <td >{data.name}</td>
                                                        <td >{data.mobile}</td>
                                                        <td >{data.amount_offered}</td>
                                                        {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <td className="td-table">{data.partner_code}</td> : null}
                                                        <td >{data.lender_code}</td>
                                                        <td >{data.status}</td>
                                                        <td >{data.created_at !== null ? convertDateTime(data.created_at):""}</td>
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
            </CardBody>
            </Card>
          </Col>
         
        </Row>
      </div>
    </>
  );
}

export default Tables;
