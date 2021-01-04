import { render, screen } from '@testing-library/react';

describe('App', () => {
  let App: () => JSX.Element;
  const mockPreview = () => <div>Preview</div>;
  const mockForm = () => <div>Submission Form</div>;

  beforeEach(() => {
    jest.mock('./Preview', () => ({
      Preview: mockPreview,
    }));
    jest.mock('./Form', () => ({
      SubmissionForm: mockForm,
    }));

    App = require('./App').default;
  });

  it('renders App', async () => {
    render(<App />);
    const header = await screen.findByAltText('Yu-Gi-Oh Bot 3000 logo');
    const form = await screen.findByText('Submission Form');
    const preview = await screen.findByText('Preview');

    expect(header).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
  });
});
