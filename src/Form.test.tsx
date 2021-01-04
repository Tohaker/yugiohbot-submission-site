import { fireEvent, render, screen, act } from '@testing-library/react';

describe('Submission Form', () => {
  let Form: ({ setPreview }: { setPreview: () => void }) => JSX.Element;
  const mockAxios = {
    post: jest.fn(),
  };
  jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mock('axios', () => mockAxios);

    Form = require('./Form').SubmissionForm;
  });

  it('should render the form', async () => {
    const mockSetPreview = jest.fn();
    render(<Form setPreview={mockSetPreview} />);

    expect(await screen.findByText('?')).toBeInTheDocument();
    expect(await screen.findByLabelText('Upload Image')).toBeInTheDocument();
    expect(await screen.findByText('✔')).toBeInTheDocument();
  });

  describe('given the axios request succeeds', () => {
    beforeEach(() => {
      mockAxios.post.mockResolvedValue(true);
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it('should POST the submitted image', async () => {
      const mockSetPreview = jest.fn();
      render(<Form setPreview={mockSetPreview} />);

      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });
      const imageInput = await screen.findByLabelText('Upload Image');
      const submit = await screen.findByText('✔');

      Object.defineProperty(imageInput, 'files', { value: [file] });
      fireEvent.change(imageInput);
      expect(mockSetPreview).toBeCalledWith('chucknorris.png');

      await act(async () => {
        fireEvent.click(submit);
      });

      expect(mockAxios.post).toBeCalledWith(
        'https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_submission',
        expect.any(FormData),
        {}
      );

      const message = await screen.findByTestId('message');
      expect(message.innerHTML).toBe(
        'Successfully uploaded your photo: chucknorris.png'
      );
    });
  });

  describe('given the axios request fails', () => {
    beforeEach(() => {
      mockAxios.post.mockRejectedValue(false);
      global.URL.createObjectURL = jest.fn((file: File) => file.name);
    });

    it('should report a failure to the user', async () => {
      const mockSetPreview = jest.fn();
      render(<Form setPreview={mockSetPreview} />);

      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });
      const imageInput = await screen.findByLabelText('Upload Image');
      const submit = await screen.findByText('✔');

      Object.defineProperty(imageInput, 'files', { value: [file] });
      fireEvent.change(imageInput);
      expect(mockSetPreview).toBeCalledWith('chucknorris.png');

      await act(async () => {
        fireEvent.click(submit);
      });

      const message = await screen.findByTestId('message');
      expect(message.innerHTML).toBe(
        'Something went wrong, please try again later.'
      );
    });
  });
});
