import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  Input,
  FormGroup,
  Button,
  Row,
  Col
} from "reactstrap";
import "./Tables.css"
import { Task } from "../backend-sdk/task.sdk";

const TableList = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userDetails, setUserDetails] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [customerDetailsInfo, setCustomerDetailsInfo] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10
  });

  const customerDetailsList = async (id, token, page, pageSize) => {
    await Task.customerList(id, token, page, pageSize)
      .then((res) => {
        setCustomerDetailsInfo(res.loan_profiles);
        setPagination({
          totalRecords: res.pagination.total_records,
          totalPages: res.pagination.total_pages,
          currentPage: res.pagination.current_page,
          perPage: pageSize
        });
      })
      .catch((err) => {
        console.log(err.error);
      });
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    setUserDetails(items);
    customerDetailsList(items && items.id, items && items.token, currentPage, perPage);
  }, []);

  function convertDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
  }
  const PerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  }

  const PaginationChange = (page) => {
    setCurrentPage(page);
    customerDetailsList(userDetails && userDetails.id, userDetails && userDetails.token, page, perPage);
  }

  const handleCustomerFilter = async () => {
    await Task.customerListFilter(userDetails && userDetails.id, userDetails && userDetails.token, filterInput, filterValue, currentPage, perPage)
      .then((res) => {
        setCustomerDetailsInfo(res.loan_profiles);
        setPagination({
          totalRecords: res.pagination.total_records,
          totalPages: res.pagination.total_pages,
          currentPage: res.pagination.current_page,
          perPage: perPage
        });
      })
      .catch((err) => {
        console.log(err.error);
      });
  }

  const handleClearFilter = () => {
    setFilterInput("");
    setFilterValue("");
    setCurrentPage(1);
    customerDetailsList(userDetails && userDetails.id, userDetails && userDetails.token, 1, perPage);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="cardstyle">
              <CardHeader>
                <CardTitle tag="h4" className="title" style={{ color: 'black', fontWeight: 'bold' }}>Customer List</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="contact-forms">
                  <Row>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="select"
                          value={filterInput}
                          onChange={(e) => setFilterInput(e.target.value)}
                        >
                          <option>Please Select</option>
                          <option>Customer Id</option>
                          <option>Mobile Number</option>
                          <option>Loan Amount</option>
                          <option>Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <Input
                          placeholder={filterInput}
                          type="text"
                          value={filterValue}
                          onChange={(e) => setFilterValue(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1 p-button" md="2" >
                      <Button className="btn-fill" onClick={handleCustomerFilter} color="primary" >
                        Filter
                      </Button>
                    </Col>
                    <Col className="px-md-1 p-button" md="2">
                      <Button className="btn-fill" onClick={handleClearFilter} color="" type="submit">
                        Clear
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <div className="table-responsive">
                  <Table className="table table-text-small mb-0">
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
                        customerDetailsInfo && customerDetailsInfo.map((data, index) => (
                          <tr key={index} style={{ backgroundColor: data.status === 'DISBURSED' ? 'green' : data.status === 'REJECTED' ? '#FF6961' : '' }}>
                            <td style={{ color: "black !important", fontWeight: "bold" }}>{data.customer_info_id}</td>
                            <td>{data.name}</td>
                            <td>{data.mobile}</td>
                            <td>{data.amount_offered}</td>
                            {userDetails && userDetails.role !== null && userDetails.role === "Admin" ? <td className="td-table">{data.partner_code}</td> : null}
                            <td>{data.lender_code}</td>
                            <td>{data.status}</td>
                            <td>{data.created_at !== null ? convertDateTime(data.created_at) : ""}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
                <div className="table-filter-info">
                  <Pagination
                    className="pagination-data"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                    onChange={PaginationChange}
                    total={pagination.totalRecords}
                    current={pagination.currentPage}
                    pageSize={pagination.perPage}
                    showSizeChanger={false}
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

export default TableList;
