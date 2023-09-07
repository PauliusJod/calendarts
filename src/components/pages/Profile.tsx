import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { HandleNewGroupCreate, HandleGroupView } from "./profilePageStages";
import { IGroupCreate, IGroupGet } from "../../typings/GroupProps";
import { GetAllGroupsByOwnership } from "../pagesServices/profileServices";

export default function Profile() {
  const [isGroupCreateVisible, setGroupCreateVisible] =
    useState<boolean>(false);
  const [choosenGroupId, setChoosenGroupId] = useState<number>(-1);
  const [groupData, setGroupData] = useState<IGroupGet[]>([]);
  useEffect(() => {
    GetAllGroupsByOwnership()
      .then((result) => {
        setGroupData(result);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);
  const setItemsInvisible = () => {
    const updatedGroupData = [...groupData];
    updatedGroupData.map((item) => {
      item.isVisible = false;
    });
    setGroupData(updatedGroupData);
    setGroupCreateVisible(false);
  };
  const handleItemClick = (index: number) => {
    setItemsInvisible();
    const updatedGroupData = [...groupData];
    updatedGroupData[index].isVisible = !updatedGroupData[index].isVisible;
    setGroupData(updatedGroupData);
    setChoosenGroupId(index);
  };
  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <>{console.log(groupData)}</>
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
          <Card style={{ width: "80%" }}>
            <ListGroup variant="flush">
              {groupData.length > 0 ? (
                groupData.map((item, i) => (
                  <ListGroup.Item
                    key={i}
                    className="d-flex justify-content-between align-items-start"
                    action
                    href={`#groupView-${i}`}
                    onClick={() => handleItemClick(i)}
                  >
                    {item.groupName}
                    <Badge bg="dark" pill>
                      0
                    </Badge>
                  </ListGroup.Item>
                ))
              ) : (
                <p>No data available.</p>
              )}
              <ListGroup.Item
                action
                href="#newGroup"
                onClick={() => setGroupCreateVisible(!isGroupCreateVisible)}
              >
                Create new group
              </ListGroup.Item>
            </ListGroup>
          </Card>
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
