import { cn } from "../../shared/lib/utils";
import { Todo, useTodosStore } from "../../shared/store/useTodosStore";
import { useMemo } from "react";
import "./TodoList.css";

export const TodoList = () => {
  const todos = useTodosStore((state) => state.todos);
  const filter = useTodosStore((state) => state.filter);
  const toggleTodo = useTodosStore((state) => state.toggleTodo);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <ul className="min-h-[412px] h-full overflow-y-scroll w-full max-w-lg mx-auto mt-4 pb-4" >
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => (
  <li className="flex items-center justify-between py-3 p-2 border-b last:border-none">
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="min-h-5 min-w-5 text-blue-500 border-gray-300 focus:ring-blue-400 rounded cursor-pointer"
      />
      <span
        className={cn(
          "text-gray-800 text-start",
          todo.completed ? "line-through text-gray-500/30" : ""
        )}
      >
        {todo.text}
      </span>
    </div>
  </li>
);
