import React from "react";
import { submitForm } from "api/storage";
import styled from "styled-components";

const Form = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Input = styled.input`
  height: calc(10px + 3vmin);
  font-size: calc(10px + 2vmin);
  margin: 1vmin 5vmin;

  input {
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  font-size: calc(10px + 2vmin);
  background-color: white;
`;

const SubmissionForm = () => {
  const titleRef = React.useRef(null);
  const fileRef = React.useRef(null);
  const effectRef = React.useRef(null);

  const submit = async () => {
    const title = titleRef.current.value || "";
    const image = fileRef.current.files[0];
    const effect = effectRef.current.value || "";

    // TODO: Show loading icon
    await submitForm(image, title, effect);
  };

  return (
    <Form>
      <label>
        Card Title:
        <Input type="text" name="title" ref={titleRef} />
      </label>
      <label>
        Card Image:
        <Input type="file" name="image" ref={fileRef} />
      </label>
      <label>
        Card Effect:
        <Input type="text" name="effect" ref={effectRef} />
      </label>
      <SubmitButton onClick={submit}>Submit for evaluation</SubmitButton>
    </Form>
  );
};

export default SubmissionForm;
