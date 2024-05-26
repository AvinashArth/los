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
  Table,
  Row,
  Col
} from "reactstrap";
import "./Tables.css"
import { Task } from "../backend-sdk/task.sdk";

const Tables = () => {
    const datatableUsers = [
    {
      "name": "Currey Slee",
      "position": "Food Chemist",
      "gender": "Male",
      "office": "Damietta",
      "email": "cslee0@netlog.com",
      "phone": "532 179 1377",
      "salary": "$49491.60",
      "id": 1
    },
    {
      "name": "Chrissie MacInerney",
      "position": "Account Executive",
      "gender": "Male",
      "office": "Ferreiras",
      "email": "cmacinerney1@youtu.be",
      "phone": "383 685 3274",
      "salary": "$17269.83",
      "id": 2
    },
    {
      "name": "Karly Okeshott",
      "position": "Cost Accountant",
      "gender": "Female",
      "office": "Cornillon",
      "email": "kokeshott2@bravesites.com",
      "phone": "927 119 1091",
      "salary": "$26878.49",
      "id": 3
    },
    {
      "name": "Hermia Dayton",
      "position": "VP Sales",
      "gender": "Female",
      "office": "Chernoyerkovskaya",
      "email": "hdayton3@un.org",
      "phone": "518 243 8139",
      "salary": "$40424.12",
      "id": 4
    },
    {
      "name": "Willem O'Hdirscoll",
      "position": "Recruiting Manager",
      "gender": "Female",
      "office": "Sukatani",
      "email": "wohdirscoll4@businessinsider.com",
      "phone": "976 264 4693",
      "salary": "$43236.35",
      "id": 5
    },
    {
      "name": "Jose Caswall",
      "position": "Environmental Tech",
      "gender": "Female",
      "office": "Concepcion",
      "email": "jcaswall5@e-recht24.de",
      "phone": "623 142 0771",
      "salary": "$47377.66",
      "id": 6
    },
    {
      "name": "Cal Russell",
      "position": "Computer Systems Analyst II",
      "gender": "Female",
      "office": "Melíssi",
      "email": "crussell6@histats.com",
      "phone": "643 259 1412",
      "salary": "$8542.68",
      "id": 7
    },
    {
      "name": "Lavinia Atwill",
      "position": "Occupational Therapist",
      "gender": "Male",
      "office": "Mendeleyevo",
      "email": "latwill7@hexun.com",
      "phone": "479 589 7945",
      "salary": "$13361.55",
      "id": 8
    },
    {
      "name": "Sophronia De Hooch",
      "position": "Account Representative II",
      "gender": "Female",
      "office": "Verkhnyaya Toyma",
      "email": "sde8@mozilla.org",
      "phone": "592 831 1701",
      "salary": "$35778.22",
      "id": 9
    },
    {
      "name": "Harmon Argente",
      "position": "Media Manager IV",
      "gender": "Male",
      "office": "Azeitão",
      "email": "hargente9@vistaprint.com",
      "phone": "823 917 4216",
      "salary": "$42515.25",
      "id": 10
    },
    {
      "name": "Andreana Hablot",
      "position": "Geological Engineer",
      "gender": "Male",
      "office": "Rameshki",
      "email": "ahablota@digg.com",
      "phone": "425 484 6588",
      "salary": "$51025.31",
      "id": 11
    },
    {
      "name": "Elbertina Hinnerk",
      "position": "Account Coordinator",
      "gender": "Female",
      "office": "Fujishiro",
      "email": "ehinnerkb@typepad.com",
      "phone": "629 484 9269",
      "salary": "$39220.72",
      "id": 12
    }
     ]
     const [perPage, setPerPage] = useState(10);
     const [size, setSize] = useState(perPage);
     const [current, setCurrent] = useState(1);
     const [userDetails, setUserDetails] = useState(null);
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
       console.log("jff", items && items.id, JSON.parse(localStorage.getItem('token')))
      customerDetailsList(items && items.id, JSON.parse(localStorage.getItem('token')))
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
                <CardTitle tag="h4">Simple Table</CardTitle>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData(current, size).map((data, index) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.position}</td>
                                                        <td>{data.gender}</td>
                                                        {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <td>{data.email}</td> : null}
                                                        <td>{data.email}</td>
                                                        <td>{data.salary}</td>
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
