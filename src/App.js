import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";

// Helper function
import getSimpleLabs from "./helpers/getSimpleLabs";

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
  const [labsToDisplay, setLabsToDisplay] = useState(null);
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

  // Renders schedule view
  const renderSchedules = () => {
    const studentTabs = sched.map((student, index) => (
      <Nav.Item key={index} onClick={() => setLabsToDisplay(index)}>
        <Nav.Link eventKey={index}>{student.Student}</Nav.Link>
      </Nav.Item>
    ));

    let labView;
    let duplicateView;


    if (labsToDisplay != null) {

      // Render all the availability
      labView = sched[labsToDisplay].labs.map((lab, index) => (
        <Card
          key={index}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 10,
            marginBottom: "1rem",
          }}
        >
          <Card.Title>{lab.Course}</Card.Title>
          <Card.Subtitle>
            {"CRN: " +
              lab.CRN +
              "   |   Student: " +
              sched[labsToDisplay].Student}
          </Card.Subtitle>
          <Card.Body>
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
                  <td>{lab.Days.M ? lab.Begin + "-" + lab.End : ""}</td>
                  <td>{lab.Days.T ? lab.Begin + "-" + lab.End : ""}</td>
                  <td>{lab.Days.W ? lab.Begin + "-" + lab.End : ""}</td>
                  <td>{lab.Days.R ? lab.Begin + "-" + lab.End : ""}</td>
                  <td>{lab.Days.F ? lab.Begin + "-" + lab.End : ""}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ));

      // Renders the classes that happen at the same time
      duplicateView = sched[labsToDisplay].duplicates.map((labs, index) => (
            <Card
              key={index}
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                marginRight: 10,
                marginBottom: "1rem",
                background: "#FFB4B4"
              }}
            >
              <Card.Title>{labs[0].Course + " and " + labs[1].Course}</Card.Title>
              <Card.Subtitle>
                {"CRN: " +
                  labs[0].CRN + " / " + labs[1].CRN +
                  "   |   Student: " +
                  sched[labsToDisplay].Student}
              </Card.Subtitle>
              <Card.Body>
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
                      <td>{labs[0].Days.M ? labs[0].Begin + "-" + labs[0].End : ""}</td>
                      <td>{labs[0].Days.T ? labs[0].Begin + "-" + labs[0].End : ""}</td>
                      <td>{labs[0].Days.W ? labs[0].Begin + "-" + labs[0].End : ""}</td>
                      <td>{labs[0].Days.R ? labs[0].Begin + "-" + labs[0].End : ""}</td>
                      <td>{labs[0].Days.F ? labs[0].Begin + "-" + labs[0].End : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
      ));
    }

    return (
      <ScheduleView style={{ height: labsToDisplay ? "100%" : "100vh" }}>
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
                {studentTabs}
              </Nav>
            </GTAContainer>
          </Row>
        </GTASide>
        <ScheduleSide>
          <ScheduleContainer>
            {labView ? (
              labView
            ) : (
              <PlaceHolderText>Please Select a GTA</PlaceHolderText>
            )}
            <DuplicateContainer>
              {duplicateView ? duplicateView : null}
            </DuplicateContainer>
          </ScheduleContainer>
        </ScheduleSide>
      </ScheduleView>
    );
  };

  // If sched has been loaded, show the new view to the user
  if (sched) return renderSchedules();
  else {
    // Otherwise ask the user to upload their input files
    return (
      <>
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
        <FooterContainer>
          <a
            href="https://github.com/arif-bashar/gta-scheduler"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </FooterContainer>
      </>
    );
  }
}

// Styled Components
const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff7272;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: space-evenly;
  padding: 20px 20px;
`;

const DuplicateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  /* flex-flow: row wrap; */
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

const PlaceHolderText = styled.h4`
  color: white;
`;

export default App;
