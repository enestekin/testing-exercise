import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '@/components/TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
    createdAt: new Date(),
  };
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
  });

  it('should render the todo text', () => {
    expect(screen.getByTestId('todo-text')).toHaveTextContent('Test Todo');
    expect(screen.getByTestId('todo-checkbox')).not.toBeChecked();
  });

  it('should call onToggle when the checkbox is clicked', async () => {
    const checkbox = screen.getByTestId('todo-checkbox');
    await userEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when the delete button is clicked', async () => {
    const deleteButton = screen.getByTestId('delete-button');
    await userEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

test('should show completed styles when the todo is completed', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockTodo = {
    id: '1',
    text: 'Completed Todo',
    completed: true,
    createdAt: new Date(),
  };

  render(
    <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
  );
  expect(screen.getByTestId('todo-text')).toHaveClass('line-through');
  expect(screen.getByTestId('todo-checkbox')).toHaveClass(
    'bg-green-500 border-green-500 text-white'
  );
});
