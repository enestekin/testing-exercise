import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '@/components/AddTodo';

describe('AddTodo', () => {
  it('should call onAdd with the input value when the form is submitted', async () => {
    const mockOnAdd = jest.fn();

    render(<AddTodo onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New Todo');
    await userEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith('New Todo');
    expect(input).toHaveValue('');
  });
});
