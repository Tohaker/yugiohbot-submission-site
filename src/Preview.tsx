import styled from 'styled-components';
import frame from './assets/Normal.png';
import image from './assets/bewd.jpg';

const Container = styled.div`
  display: grid;
`;

const Frame = styled.img`
  grid-area: 1/1;
  max-width: 100%;
  max-height: 100%;
`;

const Image = styled.img`
  margin-left: calc(50 / 420 * 100%);
  margin-top: calc(110 / 420 * 100%);
  width: calc(320 / 420 * 100%);
  height: calc(320 / 610 * 100%);
  grid-area: 1/1;
`;

export const Preview = () => (
  <Container>
    <Frame src={frame} alt="card frame" />
    <Image src={image} alt="submission preview" />
  </Container>
);
