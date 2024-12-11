import { useState } from "react";
import { useTodosStore } from "../../shared/store/useTodosStore";

export const AddTodo = () => {
  const [text, setText] = useState("");
  const addTodo = useTodosStore((state) => state.addTodo);

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:font-light"
      />
    </div>
  );
};
