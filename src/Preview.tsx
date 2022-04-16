import { useEffect, useRef } from "react";
import border from "./assets/Normal.png";
import placeholder from "./assets/bewd.jpg";
import { Container } from "./Preview.styles";

type Props = {
  image?: string;
};

const CARD_WIDTH = 420;
const CARD_HEIGHT = 610;

const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 320;
const IMAGE_LEFT = 50;
const IMAGE_TOP = 110;

export const Preview = ({ image }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let count = 2;
    const context = canvasRef.current?.getContext("2d");

    const frame = new Image();
    const img = new Image();

    const render = () => {
      if (--count > 0) return;

      context?.clearRect(IMAGE_LEFT, IMAGE_TOP, IMAGE_WIDTH, IMAGE_HEIGHT);
      context?.drawImage(frame, 0, 0);
      context?.drawImage(img, IMAGE_LEFT, IMAGE_TOP, IMAGE_WIDTH, IMAGE_HEIGHT);
    };

    frame.onload = render;
    img.onload = render;

    frame.src = border;
    img.src = image || placeholder;
  }, [image]);

  return (
    <Container>
      <div>Preview</div>
      <canvas
        ref={canvasRef}
        data-testid="card preview"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
      />
    </Container>
  );
};
