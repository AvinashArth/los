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
    const datatableUsers = [
    {
      "name": "Currey Slee",
      "partner_name": "Food Chemist",
      "gender": "Male",
      "lender_name": "Damietta",
      "email": "cslee0@netlog.com",
      "mobile": "532 179 1377",
      "amount_offered": "$49491.60",
       "status":"Approved",
      "customer_info_id": 1,
      "created_at":"23-05-2024"
    },
    {
      "name": "Chrissie MacInerney",
      "partner_name": "Account Executive",
      "gender": "Male",
      "lender_name": "Ferreiras",
      "email": "cmacinerney1@youtu.be",
      "mobile": "383 685 3274",
      "amount_offered": "$17269.83",
      "status":"Approved",
      "customer_info_id": 2,
      "created_at":"23-05-2024"
    },
    {
      "name": "Karly Okeshott",
      "partner_name": "Cost Accountant",
      "gender": "Female",
      "lender_name": "Cornillon",
      "email": "kokeshott2@bravesites.com",
      "mobile": "927 119 1091",
      "amount_offered": "$26878.49",
      "status":"Approved",
      "customer_info_id": 3,
      "created_at":"23-05-2024"
    },
    {
      "name": "Hermia Dayton",
      "partner_name": "VP Sales",
      "gender": "Female",
      "lender_name": "Chernoyerkovskaya",
      "email": "hdayton3@un.org",
      "mobile": "518 243 8139",
      "amount_offered": "$40424.12",
      "status":"Approved",
      "customer_info_id": 4,
      "created_at":"23-05-2024"
    },
    {
      "name": "Willem O'Hdirscoll",
      "partner_name": "Recruiting Manager",
      "gender": "Female",
      "lender_name": "Sukatani",
      "email": "wohdirscoll4@businessinsider.com",
      "mobile": "976 264 4693",
      "amount_offered": "$43236.35",
      "status":"Approved",
      "customer_info_id": 5,
      "created_at":"23-05-2024"
    },
    {
      "name": "Jose Caswall",
      "partner_name": "Environmental Tech",
      "gender": "Female",
      "lender_name": "Concepcion",
      "email": "jcaswall5@e-recht24.de",
      "mobile": "623 142 0771",
      "amount_offered": "$47377.66",
      "status":"Approved",
      "customer_info_id": 6,
      "created_at":"23-05-2024"
    },
    {
      "name": "Cal Russell",
      "partner_name": "Computer Systems Analyst II",
      "gender": "Female",
      "lender_name": "Melíssi",
      "email": "crussell6@histats.com",
      "mobile": "643 259 1412",
      "amount_offered": "$8542.68",
      "status":"Approved",
      "customer_info_id": 7,
      "created_at":"23-05-2024"
    },
    {
      "name": "Lavinia Atwill",
      "partner_name": "Occupational Therapist",
      "gender": "Male",
      "lender_name": "Mendeleyevo",
      "email": "latwill7@hexun.com",
      "mobile": "479 589 7945",
      "amount_offered": "$13361.55",
      "status":"Approved",
      "customer_info_id": 8,
      "created_at":"23-05-2024"
    },
    {
      "name": "Sophronia De Hooch",
      "partner_name": "Account Representative II",
      "gender": "Female",
      "lender_name": "Verkhnyaya Toyma",
      "email": "sde8@mozilla.org",
      "mobile": "592 831 1701",
      "amount_offered": "$35778.22",
      "status":"Approved",
      "customer_info_id": 9,
      "created_at":"23-05-2024"
    },
    {
      "name": "Harmon Argente",
      "partner_name": "Media Manager IV",
      "gender": "Male",
      "lender_name": "Azeitão",
      "email": "hargente9@vistaprint.com",
      "mobile": "823 917 4216",
      "amount_offered": "$42515.25",
      "status":"Approved",
      "customer_info_id": 10,
      "created_at":"23-05-2024"
    },
    {
      "name": "Andreana Hablot",
      "partner_name": "Geological Engineer",
      "gender": "Male",
      "lender_name": "Rameshki",
      "email": "ahablota@digg.com",
      "mobile": "425 484 6588",
      "amount_offered": "$51025.31",
      "status":"Approved",
      "customer_info_id": 11,
      "created_at":"23-05-2024"
    },
    {
      "name": "Elbertina Hinnerk",
      "partner_name": "Account Coordinator",
      "gender": "Female",
      "lender_name": "Fujishiro",
      "email": "ehinnerkb@typepad.com",
      "mobile": "629 484 9269",
      "amount_offered": "$39220.72",
      "status":"Approved",
      "customer_info_id": 12,
      "created_at":"23-05-2024"
    }
     ]
     const [perPage, setPerPage] = useState(10);
     const [size, setSize] = useState(perPage);
     const [current, setCurrent] = useState(1);
     const [userDetails, setUserDetails] = useState(null);
     const [filterInput,setFilterInput] = useState("");
     const [filterValue, setFilterValue] = useState("");
     const customerDetailsList = (id, token) => {
      Task.customerList(id, token)
      .then((res) => {
        console.log(res)
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
     const userDetail = {
       "role":"admin"
     }
    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datatableUsers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
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
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Filter</CardTitle>
              </CardHeader>
              <CardBody>
              <Form>
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
                         Customer Id
                        </option>
                        <option>
                        Customer Name
                        </option>
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
                    <FormGroup>
                    <Button className="btn-fill" color="primary" type="submit">
                      Filter
                     </Button>
                     </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                    <Button className="btn-fill" color="" type="submit">
                      Clear
                     </Button>
                     </FormGroup>
                    </Col>
                    
                  </Row>
                </Form>
              </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Customer List</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                {/* customer_id, name, mobile, loan_amoun, onboard_at,partner name, lender_name,message,status, */}
                                <table className="table table-text-small mb-0">
                                    <thead className="thead-primary table-sorting">
                                        <tr>
                                            <th>Customer Id</th>
                                            <th>Customer Name</th>
                                            <th>Mobile Number</th>
                                            <th>Loan Amount</th>
                                            {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <th>Partner Name</th> : null}
                                            <th>Lender Name</th>
                                            <th>Status</th>
                                            <th>Onboarding At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData(current, size).map((data, index) => {
                                                return (
                                                    <tr key={data.customer_info_id}>
                                                        <td>{data.customer_info_id}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.mobile}</td>
                                                        <td>{data.amount_offered}</td>
                                                        {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <td>{data.partner_name}</td> : null}
                                                        <td>{data.lender_name}</td>
                                                        <td>{data.status}</td>
                                                        <td>{data.created_at}</td>
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
                                    total={datatableUsers.length}
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
