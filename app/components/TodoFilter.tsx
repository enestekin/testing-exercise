interface FilterProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  todoCount: { total: number; active: number; completed: number };
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  todoCount,
}: FilterProps) {
  const filters: Array<{ key: 'all' | 'active' | 'completed'; label: string }> =
    [
      { key: 'all', label: 'All' },
      { key: 'active', label: 'Active' },
      { key: 'completed', label: 'Completed' },
    ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-t border-gray-200">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-3 py-1 rounded text-sm ${
              currentFilter === filter.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            data-testid={`filter-${filter.key}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        {todoCount.active} active, {todoCount.completed} completed
      </div>
    </div>
  );
}
