import { useCallback, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import {
  Container,
  TitleContainer,
  Information,
  InputContainer,
  Input,
  UploadButton,
  Label,
} from './Form.styles';

type Props = {
  setPreview: (image: string) => void;
};

const helpText = 'Images must be smaller than 10MB.';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const submitForm = async (file: File) => {
  const url =
    'https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_submission';

  const data = new FormData();
  data.append(file.name, file);

  try {
    axios.post(url, data, {});
    return true;
  } catch (error) {
    console.error('Error submitting image: ', error);
    return false;
  }
};

export const SubmissionForm = ({ setPreview }: Props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>();
  const [message, setMessage] = useState('');

  const submit = useCallback(async () => {
    setLoading(true);
    if (!image || !(await submitForm(image))) {
      setMessage('Something went wrong, please try again later.');
    } else {
      setMessage(`Successfully uploaded your photo: ${image.name}`);
    }
    setLoading(false);
  }, [image]);

  return (
    <Container>
      <TitleContainer>
        <div>Upload Image</div>
        <Information data-tip data-for="uploadHelp">
          ?
        </Information>
        <ReactTooltip
          id="uploadHelp"
          place="right"
          globalEventOff={isMobile ? 'touchstart' : undefined}
        >
          <p>{helpText}</p>
        </ReactTooltip>
      </TitleContainer>
      <InputContainer>
        <Input
          type="file"
          name="image"
          onChange={({ target }) => {
            setPreview(URL.createObjectURL(target.files && target.files[0]));
            setImage(target.files && target.files[0]);
          }}
        />
        <UploadButton onClick={submit} disabled={loading}>
          ✔
        </UploadButton>
      </InputContainer>
      <Label>{message}</Label>
    </Container>
  );
};
