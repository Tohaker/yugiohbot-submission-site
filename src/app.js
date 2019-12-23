import React from "react";
import styled from "styled-components";
import SubmissionForm from "components/submissionForm";

const Container = styled.div`
  text-align: center;
`;

const App = () => {
  return (
    <Container>
      <SubmissionForm />
    </Container>
  );
};

export default App;
