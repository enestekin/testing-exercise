import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from '@/components/TodoApp';

describe('TodoApp', () => {
  it('should renders the static texts', () => {
    render(<TodoApp />);
    expect(screen.getByText('TDD Todo App')).toBeInTheDocument();
    expect(screen.getByText(/Learn TDD with Next.js/)).toBeInTheDocument();
    expect(screen.getByText(/Write unit tests/)).toBeInTheDocument();
    expect(screen.getByText(/Write integration tests/)).toBeInTheDocument();
    expect(screen.getByText(/Write E2E tests/)).toBeInTheDocument();
  });

  it('should add a new should', async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });
    const newText = 'New Todo Item';

    await userEvent.type(input, newText);
    await userEvent.click(button);

    expect(screen.getByText(newText)).toBeInTheDocument();
  });

  it('should toggle a todo', async () => {
    render(<TodoApp />);
    const todoItem = screen.getByText(/Learn TDD with Next.js/);
    const checkbox = screen.getByRole('button', {
      name: /toggle learn tdd with next\.js/i,
    });

    await userEvent.click(checkbox);
    expect(todoItem).toHaveClass('line-through');

    await userEvent.click(checkbox);
    expect(todoItem).not.toHaveClass('line-through');
  });

  it('should show only completed todos when completed filter is active', async () => {
    render(<TodoApp />);
    const todoItem = screen.getByText(/Learn TDD with Next.js/);
    const checkbox = screen.getByRole('button', {
      name: /toggle learn tdd with next\.js/i,
    });
    const completedButton = screen.getByRole('button', { name: /completed/i });
    const activeButton = screen.getByRole('button', { name: /active/i });

    await userEvent.click(checkbox);
    await userEvent.click(completedButton);
    expect(todoItem).toHaveClass('line-through');
    expect(screen.getByText(/Learn TDD with Next.js/)).toBeInTheDocument();

    await userEvent.click(activeButton);
    expect(screen.queryByText(/Learn TDD with Next.js/)).toBeNull();
  });

  it('should delete a todo', async () => {
    render(<TodoApp />);
    const deleteButton = screen.getByRole('button', {
      name: /delete learn tdd with next\.js/i,
    });

    await userEvent.click(deleteButton);
    expect(screen.queryByText(/Learn TDD with Next.js/)).toBeNull();
  });

  it('should update active and completed counts', async () => {
    render(<TodoApp />);
    const checkbox = screen.getByRole('button', {
      name: /toggle write e2e tests/i,
    });
    const deleteButton = screen.getByRole('button', {
      name: /delete learn tdd with next\.js/i,
    });

    await userEvent.click(deleteButton);
    await userEvent.click(checkbox);

    expect(screen.getByText(/2 active, 1 completed/)).toBeInTheDocument();
  });
});
