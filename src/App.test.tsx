import { render, screen } from '@testing-library/react';

describe('App', () => {
  let App: () => JSX.Element;
  const mockPreview = () => <div>Preview</div>;

  beforeEach(() => {
    jest.mock('./Preview', () => ({
      Preview: mockPreview,
    }));

    App = require('./App').default;
  });

  it('renders App', async () => {
    render(<App />);
    const header = await screen.findByAltText('Yu-Gi-Oh Bot 3000 logo');
    const preview = await screen.findByText('Preview');

    expect(header).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
  });
});
