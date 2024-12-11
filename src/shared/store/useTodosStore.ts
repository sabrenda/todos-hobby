// src/store/useTodosStore.ts
import { create } from "zustand";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodosState = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  activeCount: () => number;
};

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  filter: "all",
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: crypto.randomUUID(), text, completed: false },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  setFilter: (filter) => set({ filter }),
  activeCount: () => get().todos.filter((todo) => !todo.completed).length,
}));

