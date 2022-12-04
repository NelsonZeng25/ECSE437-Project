import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

// declare which API requests to mock
const server = setupServer(
  rest.post('http://localhost:8080/student/add', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('http://localhost:8080/student/getAll', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: "John", address: "Test Street" },
      { id: 2, name: "Bob", address: "Test Street 2" },
      { id: 3, name: "Joe", address: "Test Street 3" },
    ]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

test('Students are rendered on mount', async () => {
  render(<App />);
  await screen.findByText(/John/i);
  expect(screen.getByText(/John/i)).toBeInTheDocument();
  expect(screen.getByText(/Bob/i)).toBeInTheDocument();
  expect(screen.getByText(/Joe/i)).toBeInTheDocument();
});

test('Name textfield returns an error when empty', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await waitFor(() => {
    expect(screen.getByText('Name cannot be empty')).toBeInTheDocument();
  });
});

test('Address textfield returns an error when empty', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await waitFor(() => {
    expect(screen.getByText('Address cannot be empty')).toBeInTheDocument();
  });
});

test('Inputs are reset and no errors are present after submitting with proper inputs', async () => {
  render(<App />);

  server.use(
    rest.get('http://localhost:8080/student/getAll', (req, res, ctx) => {
      return res(ctx.json([
        { id: 1, name: "John", address: "Test Street" },
        { id: 2, name: "Bob", address: "Test Street 2" },
        { id: 3, name: "Joe", address: "Test Street 3" },
        { id: 444, name: "Tristan", address: "Cool street" },
      ]));
    })
  );

  const nameInput = screen.getByPlaceholderText('John doe');
  const addressInput = screen.getByPlaceholderText('845 Sherbrooke St W, Montreal, Quebec H3A 0G4');

  fireEvent.change(nameInput, { target: { value: 'Tristan' } });
  fireEvent.change(addressInput, { target: { value: 'Cool street' } });
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await screen.findByText(/444/i);

  expect(nameInput.value).toBe('');
  expect(addressInput.value).toBe('');
  expect(screen.queryByText('Name cannot be empty')).not.toBeInTheDocument();
  expect(screen.queryByText('Address cannot be empty')).not.toBeInTheDocument();
});