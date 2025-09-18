import { Todo } from '@/types/todo';

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date(),
  };
}

export function filterTodos(
  todos: Todo[],
  filter: 'all' | 'active' | 'completed'
): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}
