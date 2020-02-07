import React from "react";
import { submitForm } from "api/storage";
import styled from "styled-components";
import placeholder from "assets/bewd.jpg";

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  padding: 0 1vmin;
  font-size: calc(10px + 2vmin);
  text-align: left;
  color: white;
`;

const Form = styled.div`
  margin-top: 1vmin;
  display: flex;
  flex-direction: column;
  float: left;
`;

const ImagePreview = styled.div`
  margin-top: 1vmin;
  display: flex;
  flex-direction: column;
  float: left;
  padding: 0 1vmin;
`;

const Heading = styled.p`
  font-weight: bold;
  font-size: calc(10px + 3vmin);
  margin: 0;
`;

const Subheading = styled.p`
  font-weight: italic;
  font-size: calc(10px + 1vmin);
  margin: 0;
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

  // const [title, setTitle] = React.useState("");
  // const [effect, setEffect] = React.useState("");

  const [image, setImage] = React.useState();
  const [preview, setPreview] = React.useState(placeholder);

  const submit = async () => {
    setLoading(true);
    const result = await submitForm(image, "", "");
    if (!result) {
      setError("Something went wrong, please try again later.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Heading>YuGiOh Bot 3000 Submissions</Heading>
      <Subheading>Images must be under 10MB in size.</Subheading>
      <Subheading>
        They will look best with a 512px x 512px resolution.
      </Subheading>
      <ImagePreview>
        <label>Image Preview: </label>
        <img src={preview} alt="Preview" />
      </ImagePreview>
      <Form>
        {/* <label>Card Title:</label>
        <Input
          type="text"
          name="title"
          onChange={e => {
            setTitle(e.target.value);
          }}
        /> */}
        <label>Card Image:</label>
        <Input
          type="file"
          name="image"
          onChange={e => {
            setPreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
          }}
        />
        {/* <label>Card Effect:</label>
        <Input
          type="text"
          name="effect"
          onChange={e => {
            setEffect(e.target.value);
          }}
        /> */}
        <SubmitButton onClick={submit} disabled={loading} id="submit">
          Submit
        </SubmitButton>
        <label>{error}</label>
      </Form>
    </Container>
  );
};

export default SubmissionForm;
