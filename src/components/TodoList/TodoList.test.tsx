import { render, screen, fireEvent } from "@testing-library/react";
import { useTodosStore } from "../../shared/store/useTodosStore";
import { TodoList } from "./TodoList";

describe("TodoList Component (direct Zustand store)", () => {
  beforeEach(() => {
    // Сбрасываем Zustand store перед каждым тестом
    const store = useTodosStore.getState();
    store.todos = [];
    store.filter = "all";
    store.toggleTodo = jest.fn(store.toggleTodo);
  });

  it("should render a list of todos", () => {
    const store = useTodosStore.getState();
    store.todos = [
      { id: "1", text: "Task 1", completed: false },
      { id: "2", text: "Task 2", completed: true },
    ];

    render(<TodoList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should filter todos by active", () => {
    const store = useTodosStore.getState();
    store.todos = [
      { id: "1", text: "Task 1", completed: false },
      { id: "2", text: "Task 2", completed: true },
    ];
    store.filter = "active";

    render(<TodoList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("should filter todos by completed", () => {
    const store = useTodosStore.getState();
    store.todos = [
      { id: "1", text: "Task 1", completed: false },
      { id: "2", text: "Task 2", completed: true },
    ];
    store.filter = "completed";

    render(<TodoList />);

    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

  it("should toggle todo completion status", () => {
    const store = useTodosStore.getState();
    store.todos = [{ id: "1", text: "Task 1", completed: false }];

    render(<TodoList />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(store.toggleTodo).toHaveBeenCalledTimes(1);
    expect(store.toggleTodo).toHaveBeenCalledWith("1");
  });
});
