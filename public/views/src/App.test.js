import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
 // console.log("Test App");
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
