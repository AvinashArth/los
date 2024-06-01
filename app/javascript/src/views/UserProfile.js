import React,{useEffect, useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

const UserProfile = ()  => {
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [customerId, setCustomerId] = useState();

  function convertDateTime(dateTimeString) {
    // Create a new Date object with the given string
    const date = new Date(dateTimeString);

    // Extract individual components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // January is 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the output as needed
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    setAddress(items && items.address === null ? "" : items.address);
    setCity(items && items.city === null ? "" : items.city);
    setCompany(items && items.company_name === null ? "" : items.company_name);
    setEmail(items && items.email === null ? "" : items.email);
    setMobileNumber(items && items.mobile === null ? "" : items.mobile);
    setRole(items && items.role === null ? "" : items.role);
    setCreatedat(items && items.created_at === null ? "" : convertDateTime(items.created_at));
    setCustomerId(items && items.id === null ? "" : items.id)
    setName(items && items.name === null ? "" : items.name);
  },[])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="cardstyle">
              <CardHeader>
                <h5 className="title" style={{color:"black"}}>User Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label> Customer Id</label>
                        <Input
                          // defaultValue="michael23"
                          placeholder="customer Id"
                          type="text"
                          value={customerId}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label> Name</label>
                        <Input
                          // defaultValue="michael23"
                          placeholder="Name"
                          type="text"
                          value={name}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="mike@email.com" type="email"  value={email}/>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Mobile Number</label>
                        <Input
                          // defaultValue="Mike"
                          placeholder="mobile Number"
                          type="number"
                          value={mobileNumber}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Company Name</label>
                        <Input
                          // defaultValue="Andrew"
                          placeholder="Comapny Name"
                          type="text"
                          value={companyName}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          // defaultValue="Mike"
                          placeholder="City"
                          type="text"
                          value={city}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                          value={address}
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          // defaultValue="Andrew"
                          placeholder="Role"
                          type="text"
                          value={role}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Created at</label>
                        <Input
                          // defaultValue="Andrew"
                          placeholder="Created at"
                          type="text"
                          value={createdat}
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col> */}
                  </Row>
                  {/* <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                </Form>
              </CardBody>
              {/* <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter> */}
            </Card>
          </Col>
          {/* <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
