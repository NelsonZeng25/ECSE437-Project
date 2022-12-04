import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

// declare which API requests to mock
const server = setupServer(
  rest.get('/student/add', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('/student/getAll', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: "John", address: "Test Street" },
      { id: 2, name: "Bob", address: "Test Street 2" },
      { id: 3, name: "Joe", address: "Test Street 3" },
    ]));
  }),
);

test('App renders AppBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/ECSE 437/i);
  expect(linkElement).toBeInTheDocument();
});

test('App renders StudentForm', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Student/i);
  expect(linkElement).toBeInTheDocument();
});

test('Name textfield returns an error when empty', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Student/i);
  expect(linkElement).toBeInTheDocument();
});