
import { act } from '@testing-library/react';
import { useTodosStore } from "./useTodosStore";

describe("useTodosStore", () => {
  beforeEach(() => {
    // Сброс состояния перед каждым тестом
    const store = useTodosStore.getState();
    store.todos = [];
    store.filter = "all";
  });

  it("should add a todo", () => {
    const { addTodo } = useTodosStore.getState();

    act(() => {
      addTodo("Test Task");
    });

    const updatedTodos = useTodosStore.getState().todos;
    expect(updatedTodos).toHaveLength(1);
    expect(updatedTodos[0].text).toBe("Test Task");
    expect(updatedTodos[0].completed).toBe(false);
  });

  it("should toggle a todo", () => {
    const { addTodo, toggleTodo } = useTodosStore.getState();

    act(() => {
      addTodo("Test Task");
    });

    const todos = useTodosStore.getState().todos;

    act(() => {
      toggleTodo(todos[0].id);
    });

    const updatedTodos = useTodosStore.getState().todos;
    expect(updatedTodos[0].completed).toBe(true);
  });

it("should filter todos by active and completed", () => {
  const { addTodo, toggleTodo, setFilter } = useTodosStore.getState();

  act(() => {
    addTodo("Task 1");
    addTodo("Task 2");
  });

  const todos = useTodosStore.getState().todos;

  act(() => {
    toggleTodo(todos[0].id);
    setFilter("active");
  });

  const filteredTodos = useTodosStore
    .getState()
    .todos.filter((todo) =>
      useTodosStore.getState().filter === "active"
        ? !todo.completed
        : todo.completed
    );

  if (useTodosStore.getState().filter === "active") {
    expect(filteredTodos).toHaveLength(1);
    expect(filteredTodos[0].text).toBe("Task 2");
  } else if (useTodosStore.getState().filter === "completed") {
    expect(filteredTodos).toHaveLength(1);
    expect(filteredTodos[0].text).toBe("Task 1");
  }
});

  it("should clear completed todos", () => {
    const { addTodo, toggleTodo, clearCompleted } = useTodosStore.getState();

    act(() => {
      addTodo("Task 1");
      addTodo("Task 2");
    });

    const todos = useTodosStore.getState().todos;

    act(() => {
      toggleTodo(todos[0].id);
      clearCompleted();
    });

    const updatedTodos = useTodosStore.getState().todos;
    expect(updatedTodos).toHaveLength(1);
    expect(updatedTodos[0].text).toBe("Task 2");
  });

  it("should count active todos", () => {
    const { addTodo, activeCount } = useTodosStore.getState();

    act(() => {
      addTodo("Task 1");
      addTodo("Task 2");
    });

    const todos = useTodosStore.getState().todos;

    act(() => {
      todos[0].completed = true;
    });

    const count = activeCount();
    expect(count).toBe(1);
  });
});
