import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders Vite + React title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Vite \+ React/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders initial count', () => {
    render(<App />);
    const countElement = screen.getByText('count is 0');
    expect(countElement).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<App />);
    const buttonElement = screen.getByText(/count is 0/i);
    fireEvent.click(buttonElement);
    const countElement = screen.getByText('count is 1');
    expect(countElement).toBeInTheDocument();
  });

  it('input test', () => {
    render(<App />);
    const input = screen.getByTestId('inputTest');
    const inputValue = screen.getByTestId('input-res');

    expect(inputValue).toHaveTextContent('Input text:');
    expect(input).not.toHaveValue();
    fireEvent.input(input, {
      target: { value: 'bla bla test' },
    });
    expect(inputValue).toHaveTextContent('Input text: bla bla test');
    expect(input).toHaveValue('bla bla test');
  });
});
