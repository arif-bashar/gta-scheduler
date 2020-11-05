import React from "react";
// import Container from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import styled from "styled-components";

function App() {
  const uploadHandler = () => {
    // fire upload events
  };

  return (
    <AppContainer>
      <FormContainer method="post">
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
            <Form.File id="gta-file" label="List of GTAs"></Form.File>
          </Form.Group>
        </Row>
        <Row style={{ marginBottom: 70 }}>
          <Form.Group>
            <Form.File id="gta-file" label="List of courses"></Form.File>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={uploadHandler}>
          Upload
        </Button>
      </FormContainer>
    </AppContainer>
  );
}

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
