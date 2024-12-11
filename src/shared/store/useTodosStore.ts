import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodosState = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  activeCount: () => number;
};

export const useTodosStore = create<
  TodosState,
  [["zustand/persist", TodosState]]
>(
  persist<TodosState>(
    (set, get) => ({
      todos: [],
      filter: "all",
      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: uuidv4(), text, completed: false }],
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
    }),
    {
      name: "todos-storage",
    }
  )
);
