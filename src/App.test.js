import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders the todo list', () => {
  const { getByText, getByPlaceholderText } = render(<TodoList />);

  const headingElement = getByText(/Todo List/i);
  expect(headingElement).toBeInTheDocument();

  const inputElement = getByPlaceholderText('Enter a new todo');
  expect(inputElement).toBeInTheDocument();

  const addButtonElement = getByText('Add Todo');
  expect(addButtonElement).toBeInTheDocument();
});

test('adds a new todo', () => {
  const { getByText, getByPlaceholderText } = render(<TodoList />);

  const inputElement = getByPlaceholderText('Enter a new todo');
  const addButtonElement = getByText('Add Todo');

  fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });
  fireEvent.click(addButtonElement);


  const todoElement = getByText('Buy groceries');
  expect(todoElement).toBeInTheDocument();
});

test('deletes a todo', () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<TodoList />);

  const inputElement = getByPlaceholderText('Enter a new todo');
  const addButtonElement = getByText('Add Todo');

  fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });
  fireEvent.click(addButtonElement);

  const deleteButtonElement = getByText('Delete');
  fireEvent.click(deleteButtonElement);

  const deletedTodoElement = queryByText('Buy groceries');
  expect(deletedTodoElement).toBeNull();
});
