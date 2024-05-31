import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Alert
} from "reactstrap";

import { User } from "../backend-sdk/user.sdk";
import { Image} from "react-bootstrap";
import logo from '../assets/img/Medialogo.png';
function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    // history.push("/admin/dashboard");
    setError(null);
    // history.push("/admin/dashboard");
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);
    User.login(email, password)
      .then((res) => {
        setIsSubmitting(false);
        localStorage.setItem("apiToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        history.push("/admin/user_profile");
      })
      .catch((err) => {
        setError(err.msg);
        console.log(err.error);
        setIsSubmitting(false);
      });
    }

  return (
    <div className="">
      <Col className="ml-auto mr-auto col-md-8 col-lg-8">
        <Card className="cardstyle" style={{marginTop:"8rem"}}>
          <Row>
            <Col lg="5" md="5" sm="5" style={{backgroundColor: "#3c266e"}}>
            <div className="p-4">
              <div className="d-flex justify-content-center mt-4">  <img style={{maxWidth:"122%"}} src={logo} />   </div>
              <div className="authentication-info">
                <div className="arth-auth-name">Happy</div>
                <div className="auth-powring-msg">Powering Micro Businesses</div>
                <div className="arth-copyright">
                  © 2024 Happy
                </div>
              </div>
            </div>
            </Col>
            <Col lg="7" md="7" sm="7">
            <Form>
            <CardHeader>
                    
            Login
             {/* <CardTitle tag="h3">Wellcome To Login</CardTitle> */}
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>

              {/* <span>
                Don't have an account? <a href="/auth/register">Register</a>
              </span> */}
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill login-button"
                color=""
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Login
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
            </Col>
          </Row>
          
        </Card>
      </Col>
    </div>
  );
}

export default Login;
