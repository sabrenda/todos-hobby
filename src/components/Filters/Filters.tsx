import { cn } from "../../shared/lib/utils";
import { useTodosStore } from "../../shared/store/useTodosStore";

export const Filters = () => {
  const setFilter = useTodosStore((state) => state.setFilter);
  const filter = useTodosStore((state) => state.filter);
  const clearCompleted = useTodosStore((state) => state.clearCompleted);
  const activeCount = useTodosStore((state) => state.activeCount());

  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto mt-4 text-sm text-gray-600">
      <div className="flex w-full gap-2 items-center justify-between">
        <span className="text-gray-500 w-24">{activeCount} items left</span>
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1 border rounded",
            filter === "all" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={cn(
            "px-3 py-1 border rounded",
            filter === "active" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          )}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={cn(
            "px-3 py-1 border rounded",
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          )}
        >
          Completed
        </button>
        <button
          onClick={clearCompleted}
          className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-100"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};
