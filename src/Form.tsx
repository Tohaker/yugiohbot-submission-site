import {
  ChangeEventHandler,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import axios from "axios";

import { Preview } from "./Preview";
import { Modal } from "./Modal";
import {
  ButtonWrapper,
  Container,
  ConfirmButton,
  FileBrowser,
  FocusWrapper,
  HeaderImage,
  RejectButton,
  Title,
  UploadButton,
} from "./Form.styles";

import headerImage from "./assets/logo-trans.png";
import { SUBMISSION_URL } from "./constants";

enum SelectedPart {
  FILE_SELECT,
  PREVIEW,
  UPLOAD,
}

const getSignedURL = async () => {
  const { data } = await axios.post<string>(SUBMISSION_URL);

  return data;
};

const submitForm = async (file: File) => {
  try {
    const url = await getSignedURL();

    await axios.put(url, file, { headers: { "Content-Type": file.type } });
    return true;
  } catch (error) {
    console.error("Error submitting image: ", error);
    return false;
  }
};

export const SubmissionForm = () => {
  const fileSelectRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const fileBrowserRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [modalText, setModalText] = useState({ body: "", restart: "" });
  const [isModalOpen, setModalOpen] = useState(false);

  const reducer: Reducer<{ selected: SelectedPart }, { type: SelectedPart }> = (
    state,
    action
  ) => {
    switch (action.type) {
      case SelectedPart.FILE_SELECT:
        fileSelectRef.current?.scrollIntoView({ behavior: "smooth" });

        if (fileBrowserRef.current) fileBrowserRef.current.value = "";
        setImage(null);
        setPreview("");
        return { selected: SelectedPart.FILE_SELECT };

      case SelectedPart.PREVIEW:
        previewRef.current?.scrollIntoView({ behavior: "smooth" });
        return { selected: SelectedPart.PREVIEW };
      case SelectedPart.UPLOAD:
        uploadRef.current?.scrollIntoView({ behavior: "smooth" });
        return { selected: SelectedPart.UPLOAD };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    selected: SelectedPart.FILE_SELECT,
  });

  useEffect(() => {
    if (fileSelectRef.current)
      fileSelectRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    if (!image || !(await submitForm(image))) {
      setModalText({
        body: "Your photo couldn't be uploaded. Ensure the image is less than 10MB in size, or try again later.",
        restart: "Choose image again",
      });
    } else {
      setModalText({
        body: `Successfully uploaded your photo: ${image.name}`,
        restart: "Upload another image",
      });
    }
    setLoading(false);
    setModalOpen(true);
  }, [image]);

  const onFileSelected: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    target.files && setPreview(URL.createObjectURL(target.files[0]));
    setImage(target?.files?.[0] || null);
    dispatch({ type: SelectedPart.PREVIEW });
  };

  return (
    <Container>
      <HeaderImage src={headerImage} alt="Yu-Gi-Oh Bot 3000 logo" />
      <FocusWrapper
        focussed={state.selected === SelectedPart.FILE_SELECT}
        ref={fileSelectRef}
      >
        <Title htmlFor="file">Upload Image</Title>
        <label className="file">
          <input
            type="file"
            name="image"
            id="file"
            onChange={onFileSelected}
            ref={fileBrowserRef}
          />
          <FileBrowser />
        </label>
      </FocusWrapper>
      <FocusWrapper
        focussed={state.selected === SelectedPart.PREVIEW}
        ref={previewRef}
      >
        <Preview image={preview} />
        Does your image look good in the card preview,
        <br />
        or would you like to try a different file?
        <ButtonWrapper>
          <ConfirmButton
            onClick={() => dispatch({ type: SelectedPart.UPLOAD })}
          >
            Looks good
          </ConfirmButton>
          <RejectButton
            onClick={() => dispatch({ type: SelectedPart.FILE_SELECT })}
          >
            Go back
          </RejectButton>
        </ButtonWrapper>
      </FocusWrapper>
      <FocusWrapper
        focussed={state.selected === SelectedPart.UPLOAD}
        ref={uploadRef}
      >
        <UploadButton onClick={submit} disabled={loading}>
          Upload
        </UploadButton>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          restart={() => {
            setModalOpen(false);
            dispatch({ type: SelectedPart.FILE_SELECT });
          }}
          message={modalText.body}
          restartMessage={modalText.restart}
        />
      </FocusWrapper>
    </Container>
  );
};
