import { useState } from "react";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import {
  HandleNewGroupCreate,
  HandleGroupView,
  HandleGroupsListView,
} from "../content/profileViewsHandlers";
import { IGroupGet } from "../../typings/GroupProps";

export default function Profile() {
  const [isGroupCreateVisible, setGroupCreateVisible] =
    useState<boolean>(false);
  const [choosenGroupId, setChoosenGroupId] = useState<number>(-1);
  const [groupData, setGroupData] = useState<IGroupGet[]>([]);

  const handleDataFromChild = (data: any) => {
    setGroupData(data);
  };
  const handleIndexFromChild = (index: number) => {
    setChoosenGroupId(index);
  };
  const handleIsVisibleFromChild = (isCreateVisible: boolean) => {
    setGroupCreateVisible(isCreateVisible);
  };
  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Col>
          {isGroupCreateVisible ? (
            <HandleNewGroupCreate />
          ) : choosenGroupId >= 0 ? (
            <HandleGroupView {...groupData[choosenGroupId]} />
          ) : (
            <></>
          )}
        </Col>
        <Col style={{ backgroundColor: "grey" }}>
          <HandleGroupsListView
            onDataReceived={handleDataFromChild}
            onIndexReceived={handleIndexFromChild}
            onVisibleStateReceived={handleIsVisibleFromChild}
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Card>
            <p>testas onclick'ams</p>
            <ListGroup>
              {groupData.length > 0 ? (
                groupData.map((item, i) =>
                  item.isVisible == true ? (
                    <ListGroup.Item
                      key={i}
                      className="d-flex justify-content-between align-items-start"
                      action
                    >
                      {item.groupName}
                    </ListGroup.Item>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <p>No data available.</p>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

/* PVZ
<ListGroup variant="flush">
  <ListGroup.Item className="d-flex justify-content-between align-items-start">
    Group 1
    <Badge bg="primary" pill>
      14
    </Badge>
  </ListGroup.Item>
  <ListGroup.Item active>Group 2 - active</ListGroup.Item>
  <ListGroup.Item disabled>Group 3 - disabled</ListGroup.Item>
  <ListGroup.Item action href="#">
    Group 4 - action href="/#"
  </ListGroup.Item>
  <ListGroup.Item
    action
    href="#newGroup"
    onClick={() => setGroupCreateVisible(!isGroupCreateVisible)}
  >
    Create new group
  </ListGroup.Item>
</ListGroup>
*/
