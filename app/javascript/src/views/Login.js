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
  Alert
} from "reactstrap";

import { User } from "../backend-sdk/user.sdk";
import { Image} from "react-bootstrap";
import logo from '../assets/img/logo.jpg';
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
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
            <img style={{maxWidth:"38%", marginLeft:'20%'}} src={logo} />             
          
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
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Login
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
