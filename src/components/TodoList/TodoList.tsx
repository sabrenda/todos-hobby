import { useTodosStore } from "../../shared/store/useTodosStore";

export const TodoList = () => {
  const todos = useTodosStore((state) => state.todos);
  const filter = useTodosStore((state) => state.filter);
  const toggleTodo = useTodosStore((state) => state.toggleTodo);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul className="min-h-[512px] w-full max-w-lg mx-auto mt-4">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between py-3 p-2 border-b last:border-none"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="min-h-5 min-w-5 text-blue-500 border-gray-300 focus:ring-blue-400 rounded"
            />
            <span
              className={`text-gray-800 text-start ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
