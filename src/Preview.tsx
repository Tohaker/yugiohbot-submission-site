import { useEffect, useRef } from 'react';
import border from './assets/Normal.png';
import placeholder from './assets/bewd.jpg';
import { Container, Canvas } from './Preview.styles';

type Props = {
  image?: string;
};

export const Preview = ({ image }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let count = 2;
    const context = canvasRef.current?.getContext('2d');
    const frame = new Image();
    const img = new Image();

    const render = () => {
      if (--count > 0) return;

      context?.drawImage(frame, 0, 0);
      context?.drawImage(img, 50, 110, 320, 320);
    };

    frame.onload = render;
    img.onload = render;

    frame.src = border;
    img.src = image || placeholder;
  }, [image]);

  return (
    <Container>
      <div>Preview</div>
      <Canvas
        ref={canvasRef}
        width="420"
        height="610"
        data-testid="card preview"
      />
    </Container>
  );
};
