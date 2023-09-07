import React, { useState } from "react";
import { Button, Form, InputGroup, Row, Card } from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiTextAlignJustifyFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import moment from "moment";
import { IGroupGet } from "../../typings/GroupProps";
import { CreateGroup } from "../pagesServices/profileServices";

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
