import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiTextAlignJustifyFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import moment from "moment";
import { IGroupGet } from "../../typings/GroupProps";
import { CreateGroup } from "../pagesServices/profileServices";
import { GetAllGroupsByOwnership } from "../pagesServices/profileServices";
interface HandleGroupsListViewProps {
  onDataReceived: (data: any) => void;
  onVisibleStateReceived: (isCreateVisible: boolean) => void;
  onIndexReceived: (index: number) => void;
}
export function HandleGroupsListView(props: HandleGroupsListViewProps) {
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
  const sendDataToParent = () => {
    props.onVisibleStateReceived(isGroupCreateVisible);
    props.onIndexReceived(choosenGroupId);
    props.onDataReceived(groupData);
  };
  useEffect(() => {
    sendDataToParent();
  }, [isGroupCreateVisible, choosenGroupId, groupData]);
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
    sendDataToParent();
  };

  return (
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
              <Badge key={i} bg="dark" pill>
                0
              </Badge>
            </ListGroup.Item>
          ))
        ) : (
          <p>No data available.</p>
        )}
        <ListGroup.Item
          key="10"
          action
          href="#newGroup"
          onClick={() => setGroupCreateVisible(!isGroupCreateVisible)}
        >
          Create new group
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
export function HandleNewGroupCreate() {
  const [groupNameInput, setGroupNameInput] = useState<string>("");
  const [groupDescriptionInput, setGroupDescriptionInput] =
    useState<string>("");
  const [isErrorMessageEnabled, setIsErrorMessageEnabled] =
    useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      var response: any = await CreateGroup(
        groupNameInput,
        groupDescriptionInput
      );
      if (response.status === 201) window.location.reload();
      event.preventDefault();
    }
  };
  return (
    <Card>
      <h5>New group creation</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Row} style={{ padding: "10px" }}>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setGroupNameInput(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Row} style={{ padding: "10px" }}>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Description"
                onChange={(e) => setGroupDescriptionInput(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        {/* {groupNameInput.length > 0 ? (
          <Alert style={alertStyle} variant="warning">
            {loginErrorMessage}
            {groupNameInput}
          </Alert>
        ) : (
          <></>
        )} */}
        <Button
          type="submit"
          onClick={() => {
            setIsErrorMessageEnabled(true);
          }}
        >
          Login
        </Button>
      </Form>
    </Card>
  );
}
export function HandleGroupView(props: IGroupGet) {
  const {
    creationDate,
    groupDescription,
    groupId,
    groupName,
    groupOwnerId,
    isVisible,
  } = props;
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  };
  return (
    <Card>
      <h5>New group creation</h5>
      <Row>
        <div className="group-view-main">
          <h5 style={{ verticalAlign: "center" }}>
            <HiOutlineUserGroup />
            {groupName}
          </h5>
          <h5>
            <PiTextAlignJustifyFill />
            {groupDescription}
          </h5>
          <h5>
            <BsCalendar2DateFill />
            {moment(creationDate).format("YYYY-MM-DD")}
          </h5>
          <h5>
            <GrUserManager />
            {groupOwnerId}
          </h5>
        </div>
      </Row>
    </Card>
  );
}
