import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero introduction and image', () => {
  render(<App />);
  const introText = screen.getByText(/hello, i'm/i);
  expect(introText).toBeInTheDocument();

  const heroImage = screen.getByAltText(/hero/i);
  expect(heroImage).toBeInTheDocument();
});
