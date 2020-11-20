import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Helper function
import getSimpleLabs from "./helpers/getSimpleLabs";

// import Container from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
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

  // When gtasBSTR and coursesBSTR get updated, this function fires
  useEffect(() => {
    if (gtasBSTR != null && coursesBSTR != null) {
      const sched = getSimpleLabs(gtasBSTR, coursesBSTR);
      for (let i = 0; i < sched.length; i++) {
        console.log("-------------------------------------------------------------------------");
        console.log("GTA Name: " + sched[i].Student);
        for(let j = 0; j < sched[i].labs.length; j++){
          console.log("Lab:");
          console.log(sched[i].labs[j]);
        }
    
        for(let j = 0; j < sched[i].duplicates.length; j++){
          console.log("These two labs happen at the same time (Duplicates):");
          console.log(sched[i].duplicates[j]);
        }
    
      }
    }

  }, [gtasBSTR, coursesBSTR])

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
  }

  // Update coursesBSTR state
  const coursesReadHandler = (e) => {
    setCoursesBSTR(e.target.result);
  }

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
            <Form.File id="gta-file" label="List of GTAs" onChange={gtasFileHandler}></Form.File>
          </Form.Group>
        </Row>
        <Row style={{ marginBottom: 70 }}>
          <Form.Group>
            <Form.File id="gta-file" label="List of courses" onChange={coursesFileHandler}></Form.File>
          </Form.Group>
        </Row>

        <Button variant="primary" type="button" onClick={uploadHandler}>
          Upload
        </Button>
      </FormContainer>
    </AppContainer>
  );
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
