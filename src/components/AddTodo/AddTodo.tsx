import { useState, FormEvent } from "react";
import { useTodosStore } from "../../shared/store/useTodosStore";

export const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const addTodo = useTodosStore((state) => state.addTodo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-center p-4"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:font-light"
        aria-label="New todo item"
        maxLength={58}
        required
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Add todo"
      >
        Add
      </button>
    </form>
  );
};
