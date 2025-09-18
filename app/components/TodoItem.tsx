import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border ${
        todo.completed ? 'bg-gray-50' : ''
      }`}
      data-testid="todo-item"
    >
      <button
        aria-label={`Toggle ${todo.text}`}
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
        }`}
        data-testid="todo-checkbox"
      >
        {todo.completed && <Check size={14} />}
      </button>

      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
        }`}
        data-testid="todo-text"
      >
        {todo.text}
      </span>

      <button
        aria-label={`Delete ${todo.text}`}
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
        data-testid="delete-button"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
