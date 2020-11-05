import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';

function App() {
  const [gtaFile, setGtaFile] = useState(null)
  const [courseFile, setCourseFile] = useState(null)

  // Update gtaFile state every time file gets changed
  const gtaFileHandler = (event) => {
    setGtaFile(event.target.files[0]);
  }

  // Update courseFile state every time file gets changed
  const courseFileHandler = (event) => {
    setCourseFile(event.target.files[0]);
  }

  // Handler for upload button
  const uploadHandler = () => {
    console.log(gtaFile);
    console.log(courseFile);
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
            <Form.File id="gta-file" label="List of GTAs" onChange={gtaFileHandler}></Form.File>
          </Form.Group>
        </Row>
        <Row style={{ marginBottom: 70 }}>
          <Form.Group>
            <Form.File id="gta-file" label="List of courses" onChange={courseFileHandler}></Form.File>
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
