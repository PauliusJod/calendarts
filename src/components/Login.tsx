import React, { useState, useEffect, Component } from "react";
import { IUserRegister, IUserLogin } from "../typings/UserProps";
import { Alert } from "react-bootstrap";
import { AuthService } from "../services/authservice";
import { withRouter } from "./common/with-router";
import {
  useFetcher,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";

const alertStyle = { fontSize: "14px", padding: "5px" };

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [rulesCheck, setRulesCheck] = useState<boolean>(false);
  const [isErrorMessageEnabled, setIsErrorMessageEnabled] =
    useState<boolean>(false);

  const instance = new AuthService({}, {});

  let navigate = useNavigate();
  const handleLogin = (username: string, password: string) => {
    if (username.length !== 0 && password.length !== 0) {
      instance.login(username, password).then((response: any) => {
        if (typeof response.statusCode === "number") {
          setLoginErrorMessage(response.statusMessage);
        } else {
          const tokenJson = instance.getCurrentUser();
          axios.create({
            headers: {
              Authorization: `Bearer ${tokenJson.accessToken}`,
            },
          });
          navigate("/profile"); //("/#");
          window.location.reload();
        }
      });
    } else {
      console.log("else");
    }
  };
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      handleLogin(usernameInput, passwordInput);
      setValidated(true);
    }
  };
  return (
    <Container>
      <Card style={{ width: "50%" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Row} controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please type in your username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Row} controlId="validationUserPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="validationRules">
            <Form.Check
              id="check-rules"
              style={{ paddingTop: "5px", paddingBottom: "5px" }}
            >
              <Form.Check.Input
                type="checkbox"
                required
                onChange={() => {
                  setRulesCheck(!rulesCheck);
                }}
              />
              <Form.Check.Label
                style={{
                  margin: "auto 0px auto",
                }}
              >
                Agree to terms and conditions
              </Form.Check.Label>
            </Form.Check>
            {rulesCheck && isErrorMessageEnabled ? (
              <></>
            ) : isErrorMessageEnabled ? (
              <Alert style={alertStyle} variant="danger">
                You must agree before submitting.
              </Alert>
            ) : (
              <></>
            )}
            <Form.Control.Feedback type="invalid">
              sasdadssa
            </Form.Control.Feedback>
          </Form.Group>
          {loginErrorMessage.length > 0 ? (
            <Alert style={alertStyle} variant="warning">
              {loginErrorMessage}
            </Alert>
          ) : (
            <></>
          )}
          <Button type="submit" onClick={() => setIsErrorMessageEnabled(true)}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
{
  /* <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row> */
}
