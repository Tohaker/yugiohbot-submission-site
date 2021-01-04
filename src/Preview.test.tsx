import { render, screen } from '@testing-library/react';
import { Preview } from './Preview';

describe('Card Preview', () => {
  it('should render the Canvas', async () => {
    render(<Preview />);
    const canvas = await screen.findByTestId('card preview');
    expect(canvas).toBeInTheDocument();
  });
});
