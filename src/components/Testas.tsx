import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";

export class Testas extends Component {
  static displayName = Testas.name;

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Card>
          <h3>Welcome to Travel-Guru!</h3>
          <hr />
          <p className="card-text">
            Please Sign Up for full website experience!
          </p>
          <Col xs={8} md="auto" className="text-center">
            <Card.Link
              href="/register"
              className="btn btn-primary col-6 col-md-3"
            >
              Testas
            </Card.Link>
          </Col>
        </Card>
      </div>
    );
  }
}
