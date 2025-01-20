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
