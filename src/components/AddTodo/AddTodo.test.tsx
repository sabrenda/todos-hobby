import { render, screen, fireEvent } from "@testing-library/react";
import { useTodosStore } from "../../shared/store/useTodosStore";
import { AddTodo } from "./AddTodo";

describe("AddTodo Component (direct Zustand store)", () => {
  beforeEach(() => {
    // Сбрасываем Zustand store перед каждым тестом
    const store = useTodosStore.getState();
    store.todos = [];
  });

  it("should render input field", () => {
    render(<AddTodo />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should update text in input field", () => {
    render(<AddTodo />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input).toHaveValue("New Task");
  });

  it("should add a todo to Zustand store and clear input when Enter is pressed", () => {
    render(<AddTodo />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    // Проверяем, что задача добавлена в Zustand store
    const todos = useTodosStore.getState().todos;
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe("New Task");
    expect(todos[0].completed).toBe(false);

    // Проверяем, что поле ввода очищено
    expect(input).toHaveValue("");
  });

  it("should not add a todo if input is empty or whitespace", () => {
    render(<AddTodo />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    // Проверяем, что задача не добавлена
    const todos = useTodosStore.getState().todos;
    expect(todos).toHaveLength(0);
  });
});
