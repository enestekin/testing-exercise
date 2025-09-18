import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoFilter from '@/components/TodoFilter';

describe('TodoFilter', () => {
  const mockOnFilterChange = jest.fn();
  const defaultProps = {
    currentFilter: 'all',
    onFilterChange: mockOnFilterChange,
    todoCount: { total: 5, active: 3, completed: 2 },
  } as const;

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('filters and todo count are rendered correctly', () => {
    render(<TodoFilter {...defaultProps} />);

    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
    expect(screen.getByText('3 active, 2 completed')).toBeInTheDocument();
  });

  it('calls onFilterChange when the correct value when a filter button is clicked', async () => {
    render(<TodoFilter {...defaultProps} />);

    const activeButton = screen.getByTestId('filter-active');
    await userEvent.click(activeButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');

    const completedButton = screen.getByTestId('filter-completed');
    await userEvent.click(completedButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });
});
