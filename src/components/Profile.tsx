import * as React from "react";
import { Container, Card, Row, Col, ListGroup, Badge } from "react-bootstrap";

export default function Profile() {
  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Col>sdsda</Col>
        <Col style={{ backgroundColor: "grey" }}>
          <Card style={{ width: "80%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                Group 1
                <Badge bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item active>Group 2 - active</ListGroup.Item>
              <ListGroup.Item disabled>Group 3 - disabled</ListGroup.Item>
              <ListGroup.Item action href="/#">
                Group 4 - action href="/#"
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
