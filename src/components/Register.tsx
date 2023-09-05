import React, { useState, useEffect, Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
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
  Alert,
} from "react-bootstrap";
import isEmail from "validator";
import { AuthService } from "../services/authservice";
import loadingGif from "./images/loadinggif.gif";

const alertStyle = {
  margin: "5px 0px",
  padding: "2px 10px",
  color: "black",
};

export default function Register() {
  // const [validated, setValidated] = useState(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [alertsCheck, setAlertsCheck] = useState<boolean>(false);
  const [rulesCheck, setRulesCheck] = useState<boolean>(false);
  const [isErrorMessageEnabled, setIsErrorMessageEnabled] =
    useState<boolean>(false);
  const [isRegisterSuccessful, setIsRegisterSuccessful] =
    useState<boolean>(false);
  const [apiResponseErrorMessage, setApiResponseErrorMessage] =
    useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const instance = new AuthService({}, {});
  let navigate = useNavigate();

  const handleRegister = (
    username: string,
    email: string,
    password: string
  ) => {
    if (username.length <= 5 || email.length <= 6 || password.length <= 6)
      return console.log("return");
    instance.register(username, email, password).then(
      (response: any) => {
        // console.log("response: ", response);
        // console.log("response: ", response.data);
        setIsRegisterSuccessful(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      },
      (error: any) => {
        if (error.response.status == 400)
          setApiResponseErrorMessage(error.response.data);
        if (error.response.status != 400) {
          console.log("error statusCode: ", error.response.status);
          console.log("error statusMessage: ", error.response.data);
        }
      }
    );
  };
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    setAlertsCheck(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      handleRegister(usernameInput, emailInput, passwordInput);
      // setValidated(true);
    }
  };

  return (
    <Container>
      <Card style={{ width: "50%" }}>
        {!isRegisterSuccessful ? (
          //  noValidate validated={validated}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Row} controlId="validationCustomUsername">
                <div>
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
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
                  {usernameInput.length <= 5 && alertsCheck ? (
                    <Alert variant="warning" style={alertStyle}>
                      Too short!
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
              </Form.Group>

              <Form.Group as={Row} controlId="validationCustomEmail">
                <div>
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please type in your username.
                    </Form.Control.Feedback>
                  </InputGroup>
                  {emailInput.length <= 6 && alertsCheck ? (
                    <Alert variant="warning" style={alertStyle}>
                      Too short!
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
              </Form.Group>

              <Form.Group as={Row} controlId="validationUserPassword">
                <div>
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                    />
                  </InputGroup>
                  {passwordInput.length <= 6 && alertsCheck ? (
                    <Alert variant="warning" style={alertStyle}>
                      Too short!
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
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
            {/* {loginErrorMessage.length > 0 ? (
            <Alert style={alertStyle} variant="warning">
              {loginErrorMessage}
            </Alert>
          ) : (
            <></>
          )} */}
            <Button
              type="submit"
              onClick={() => setIsErrorMessageEnabled(true)}
            >
              Login
            </Button>
            {isErrorMessageEnabled && apiResponseErrorMessage.length > 0 ? (
              <Alert variant="danger" style={alertStyle}>
                {apiResponseErrorMessage}
              </Alert>
            ) : (
              <></>
            )}
          </Form>
        ) : (
          <>
            <img
              style={{ width: "30%", margin: "auto" }}
              src={loadingGif}
              alt="Loading..."
            />
            <Alert style={{ textAlign: "center" }} variant="success">
              Successful
            </Alert>
          </>
        )}
      </Card>
    </Container>
    // <div className="col-md-12">
    //   <div className="card card-container">
    //     <img
    //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    //       alt="profile-img"
    //       className="profile-img-card"
    //     />

    //     <Form
    //       onSubmit={this.handleRegister}
    //       ref={(c) => {
    //         this.form = c;
    //       }}
    //     >
    //       {!this.state.successful && (
    //         <div>
    //           <div className="form-group">
    //             <label htmlFor="username">Username</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="username"
    //               onChange={(e) => setUsername(e.target.value)}
    //               validations={[required, vusername]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="email"
    //               value={this.state.email}
    //               onChange={this.onChangeEmail}
    //               validations={[required, email]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <Input
    //               type="password"
    //               className="form-control"
    //               name="password"
    //               value={this.state.password}
    //               onChange={this.onChangePassword}
    //               validations={[required, vpassword]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <button className="btn btn-primary btn-block">Sign Up</button>
    //           </div>
    //         </div>
    //       )}

    //       {this.state.message && (
    //         <div className="form-group">
    //           <div
    //             className={
    //               this.state.successful
    //                 ? "alert alert-success"
    //                 : "alert alert-danger"
    //             }
    //             role="alert"
    //           >
    //             {this.state.message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton
    //         style={{ display: "none" }}
    //         ref={(c) => {
    //           this.checkBtn = c;
    //         }}
    //       />
    //     </Form>
    //   </div>
    // </div>
  );
}
