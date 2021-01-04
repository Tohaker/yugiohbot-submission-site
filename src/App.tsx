import { useState } from 'react';
import { Preview } from './Preview';
import { SubmissionForm } from './Form';
import headerImage from './assets/logo-trans.png';
import { Container, HeaderImage, Page } from './App.styles';

const App = () => {
  const [preview, setPreview] = useState('');

  return (
    <Container>
      <HeaderImage src={headerImage} alt="Yu-Gi-Oh Bot 3000 logo" />
      <Page>
        <SubmissionForm setPreview={setPreview} />
        <Preview image={preview} />
      </Page>
    </Container>
  );
};

export default App;
