import { render, screen } from '@testing-library/react';
import { Todo } from '@/types/todo';
import TodoList from '@/components/TodoList';

const mockTodos: Todo[] = [
  { id: '1', text: 'Test Todo 1', completed: false, createdAt: new Date() },
  { id: '2', text: 'Test Todo 2', completed: true, createdAt: new Date() },
];

describe('TodoList', () => {
  it('renders a list of todos', () => {
    render(
      <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={jest.fn()} />
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('shows a message when there are no todos', () => {
    render(<TodoList todos={[]} onToggle={jest.fn()} onDelete={jest.fn()} />);

    expect(
      screen.getByText('No todos yet. Add one above!')
    ).toBeInTheDocument();
  });
});
