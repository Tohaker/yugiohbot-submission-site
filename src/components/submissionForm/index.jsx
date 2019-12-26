import React from "react";
import { submitForm } from "api/storage";
import styled from "styled-components";

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  text-align: left;
  color: white;
  padding: 0 8px;
`;

const Input = styled.input`
  height: calc(10px + 3vmin);
  font-size: calc(10px + 2vmin);
  margin: 1vmin 0 3vmin 0;

  input {
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  font-size: calc(10px + 2vmin);
  background-color: white;
  border-radius: 50px;
`;

const SubmissionForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [effect, setEffect] = React.useState("");
  const [image, setImage] = React.useState();

  const submit = async () => {
    setLoading(true);
    const result = await submitForm(image, title, effect);
    if (!result) {
      setError("Something went wrong, please try again later.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <label>Card Title:</label>
      <Input
        type="text"
        name="title"
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <label>Card Image:</label>
      <Input
        type="file"
        name="image"
        onChange={e => {
          setImage(e.target.files[0]);
        }}
      />
      <label>Card Effect:</label>
      <Input
        type="text"
        name="effect"
        onChange={e => {
          setEffect(e.target.value);
        }}
      />
      <SubmitButton onClick={submit} disabled={loading} id="submit">
        Submit
      </SubmitButton>
      <label>{error}</label>
    </Container>
  );
};

export default SubmissionForm;
