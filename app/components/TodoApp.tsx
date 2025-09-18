'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { createTodo, filterTodos } from '@/utils/todoHelpers';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (text: string) => {
    const newTodo = createTodo(text);
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = filterTodos(todos, filter);
  const todoCount = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  useEffect(() => {
    const demoTodos = [
      createTodo('Learn TDD with Next.js'),
      createTodo('Write unit tests'),
      createTodo('Write integration tests'),
      createTodo('Write E2E tests'),
    ];
    setTodos(demoTodos);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              TDD Todo App
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Built with Test-Driven Development
            </p>
          </div>

          <div className="p-6">
            <AddTodo onAdd={addTodo} />

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Your Todos ({filteredTodos.length})
              </h2>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>

            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              todoCount={todoCount}
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="font-bold text-gray-800 mb-2">
            TDD Test Türleri Bu Uygulamada:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <strong>Unit Tests:</strong> createTodo(), filterTodos()
              fonksiyonları
            </div>
            <div>
              <strong>Integration Tests:</strong> AddTodo + TodoList birlikte
              çalışması
            </div>
            <div>
              <strong>E2E Tests:</strong> Kullanıcının todo ekleyip silmesi
              akışı
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
