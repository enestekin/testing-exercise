import { createTodo } from '@/utils/todoHelpers';
import { filterTodos } from '@/utils/todoHelpers';

describe('todoHelpers', () => {
  it('createTodo should create a new todo wuth correct properties', () => {
    const text = 'New Todo';
    const todo = createTodo(text);

    expect(todo.id).toBeDefined();
    expect(todo.text).toBe(text);
    expect(todo.completed).toBe(false);
    expect(todo.createdAt).toBeInstanceOf(Date);
  });

  it('filterTodo should return correct filtered todos', () => {
    const dummyTodos = [
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date() },
      { id: '3', text: 'Todo 3', completed: false, createdAt: new Date() },
      { id: '4', text: 'Todo 4', completed: true, createdAt: new Date() },
    ];

    expect(filterTodos(dummyTodos, 'all')).toEqual(dummyTodos);
    expect(filterTodos(dummyTodos, 'active')).toEqual([
      {
        id: '1',
        text: 'Todo 1',
        completed: false,
        createdAt: expect.any(Date),
      },
      {
        id: '3',
        text: 'Todo 3',
        completed: false,
        createdAt: expect.any(Date),
      },
    ]);
    expect(filterTodos(dummyTodos, 'completed')).toEqual([
      { id: '2', text: 'Todo 2', completed: true, createdAt: expect.any(Date) },
      { id: '4', text: 'Todo 4', completed: true, createdAt: expect.any(Date) },
    ]);
  });
});
