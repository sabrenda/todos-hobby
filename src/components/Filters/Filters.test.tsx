import { render, screen, fireEvent } from "@testing-library/react";
import { useTodosStore } from "../../shared/store/useTodosStore";
import { Filters } from "./Filters";

describe("Filters Component (direct Zustand store)", () => {
  beforeEach(() => {
    // Сбрасываем Zustand store перед каждым тестом
    const store = useTodosStore.getState();
    store.todos = [];
    store.filter = "all";
    store.setFilter = jest.fn(store.setFilter);
    store.clearCompleted = jest.fn(store.clearCompleted);
  });

  it("should render all filter buttons and active count", () => {
    const store = useTodosStore.getState();
    store.todos = [
      { id: "1", text: "Task 1", completed: false },
      { id: "2", text: "Task 2", completed: true },
      { id: "3", text: "Task 3", completed: false },
    ];

    render(<Filters />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("should set filter to 'all' when All button is clicked", () => {
    render(<Filters />);

    const allButton = screen.getByText("All");
    fireEvent.click(allButton);

    const store = useTodosStore.getState();
    expect(store.setFilter).toHaveBeenCalledTimes(1);
    expect(store.setFilter).toHaveBeenCalledWith("all");
  });

  it("should set filter to 'active' when Active button is clicked", () => {
    render(<Filters />);

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    const store = useTodosStore.getState();
    expect(store.setFilter).toHaveBeenCalledTimes(1);
    expect(store.setFilter).toHaveBeenCalledWith("active");
  });

  it("should set filter to 'completed' when Completed button is clicked", () => {
    render(<Filters />);

    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    const store = useTodosStore.getState();
    expect(store.setFilter).toHaveBeenCalledTimes(1);
    expect(store.setFilter).toHaveBeenCalledWith("completed");
  });
});
