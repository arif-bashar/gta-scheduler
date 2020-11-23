import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

// Helper function
import getSimpleLabs from "./helpers/getSimpleLabs";
// import Container from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

// import './App.css';

function App() {
  /* These two states keep track of file input and get updated
  each time user uploads a new file */
  const [gtasFile, setGTAsFile] = useState(null);
  const [coursesFile, setCoursesFile] = useState(null);
  /* These two states store the binary string format of the files
  once upload button is pressed */
  const [gtasBSTR, setGTAsBSTR] = useState(null);
  const [coursesBSTR, setCoursesBSTR] = useState(null);

  const [sched, setSchedule] = useState(null);
  const [schedDisplay, showSchedule] = useState(null);
  // When gtasBSTR and coursesBSTR get updated, this function fires
  useEffect(() => {
    if (gtasBSTR != null && coursesBSTR != null) {
      setSchedule(getSimpleLabs(gtasBSTR, coursesBSTR));
    }
  }, [gtasBSTR, coursesBSTR]);

  // Update gtasFile state every time file gets changed
  const gtasFileHandler = (event) => {
    setGTAsFile(event.target.files[0]);
  };

  // Update coursesFile state every time file gets changed
  const coursesFileHandler = (event) => {
    setCoursesFile(event.target.files[0]);
  };

  // Update gtasBSTR state
  const gtasReadHandler = (e) => {
    setGTAsBSTR(e.target.result);
  };

  // Update coursesBSTR state
  const coursesReadHandler = (e) => {
    setCoursesBSTR(e.target.result);
  };

  // Handler for upload button
  const uploadHandler = () => {
    const gtasReader = new FileReader();
    const coursesReader = new FileReader();

    // Handler for when the file readers load the files
    gtasReader.onload = gtasReadHandler;
    coursesReader.onload = coursesReadHandler;

    // Read these files as binary strings for xlsx usage
    gtasReader.readAsBinaryString(gtasFile);
    coursesReader.readAsBinaryString(coursesFile);
  };

  const lab = function (item) {
    console.log(item);
    let students = new Set();
    for (let stud of item) {
      students.add({
        key: stud.Student,
        classes: [],
      });
    }
    sched.map((item, index) => {
      item.labs.map((thing, position) => {
        let temp = (
          <Card
            key={position}
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginRight: 10,
              marginBottom: "1rem",
            }}
          >
            <Card.Title>{thing.Course}</Card.Title>
            <Card.Subtitle>
              {"CRN: " + thing.CRN + "   |   Student: " + item.Student}
            </Card.Subtitle>
            <Card.Text>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>TH</th>
                    <th>F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{thing.Days.M ? thing.Begin + "-" + thing.End : ""}</td>
                    <td>{thing.Days.T ? thing.Begin + "-" + thing.End : ""}</td>
                    <td>{thing.Days.W ? thing.Begin + "-" + thing.End : ""}</td>
                    <td>{thing.Days.R ? thing.Begin + "-" + thing.End : ""}</td>
                    <td>{thing.Days.F ? thing.Begin + "-" + thing.End : ""}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
          </Card>
        );
        students.forEach((student) => {
          if (student.key === item.Student) {
            student.classes.push(temp);
          }
        });
      });
    });
    return students;
  };

  const dropDownItems = (schedules) => {
    let items = [];
    schedules.forEach((item, index) => {
      items.push(
        <Nav.Item onClick={() => showSchedule(item)} key={index}>
          <Nav.Link eventKey={item.key}>{item.key}</Nav.Link>
        </Nav.Item>
      );
      console.log(item.key);
    });
    return items;
  };

  if (sched) {
    let schedules = lab(sched);
    let dropDowns = dropDownItems(schedules);
    console.log(schedules);
    return (
      <ScheduleView style={{ height: schedDisplay ? "100%" : "100vh" }}>
        <GTASide>
          <Row>
            <Col sm={3}>
              <NumberContainer style={{ background: "#547aff" }}>
                2
              </NumberContainer>
            </Col>
            <Col>
              <FormTitle style={{ color: "white" }}>Select GTA</FormTitle>
            </Col>
          </Row>
          <Row>
            <GTAContainer>
              <Nav fill variant="pills" className="flex-column">
                {dropDowns}
              </Nav>
            </GTAContainer>
          </Row>
        </GTASide>
        <ScheduleSide>
          <ScheduleContainer>
            {schedDisplay ? schedDisplay.classes : null}
          </ScheduleContainer>
        </ScheduleSide>
      </ScheduleView>
    );
  }

  if (!sched) {
    return (
      <AppContainer>
        <FormContainer>
          <Row style={{ marginBottom: 70 }}>
            <Col sm={2}>
              <NumberContainer>1</NumberContainer>
            </Col>
            <Col sm={10}>
              <FormTitle>Upload your files</FormTitle>
              <FormSubtitle>Files should be in .xlsx format</FormSubtitle>
            </Col>
          </Row>
          <Row style={{ marginBottom: 60 }}>
            <Form.Group>
              <Form.File
                id="gta-file"
                label="List of GTAs"
                onChange={gtasFileHandler}
              ></Form.File>
            </Form.Group>
          </Row>
          <Row style={{ marginBottom: 70 }}>
            <Form.Group>
              <Form.File
                id="gta-file"
                label="List of courses"
                onChange={coursesFileHandler}
              ></Form.File>
            </Form.Group>
          </Row>

          <Button variant="primary" type="button" onClick={uploadHandler}>
            Upload
          </Button>
        </FormContainer>
      </AppContainer>
    );
  }
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-x: none;
  background: #333b51;
  justify-content: center;
  align-items: center;
`;

const ScheduleView = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: none;
  overflow-x: none;
  background: #333b51;
  justify-content: center;
  align-items: center;
`;

const GTASide = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20vw;
  height: 100vh;
  overflow-y: none;
  overflow-x: none;
  background: #333b51;
  justify-content: center;
  padding-left: 60px;
  padding-right: 60px;
`;

const GTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 410px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: none;
  background: #414b67;
  margin-top: 20px;
`;

const ScheduleSide = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: none;
  overflow-x: none;
  background: #333b51;
  justify-content: center;
  align-items: center;
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 90%;
  height: 90%;
  overflow-y: scroll;
  overflow-x: none;
  background: #98afff;
  border-radius: 10px;
  justify-content: space-between;
  padding: 20px 20px;
`;

const FormContainer = styled.form`
  min-width: 0%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 15px;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 65px;
  padding-right: 65px;
  padding-bottom: 70px;
  padding-top: 70px;
`;

const NumberContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #a9bcff;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 700;
`;

const FormTitle = styled.h4`
  color: #585858;
  font-weight: 700;
`;

const FormSubtitle = styled.h5`
  color: #7b7b7b;
  font-weight: 300;
`;

export default App;
