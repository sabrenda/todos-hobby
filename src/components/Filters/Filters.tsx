import { cn } from "../../shared/lib/utils";
import { useTodosStore } from "../../shared/store/useTodosStore";
import React from "react";

interface FilterButtonProps {
  label: string;
  filterType: "all" | "active" | "completed";
  currentFilter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  filterType,
  currentFilter,
  setFilter,
}) => (
  <button
    onClick={() => setFilter(filterType)}
    className={cn(
      "px-3 py-1 border rounded max-sm:text-[10px]",
      currentFilter === filterType
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-100"
    )}
  >
    {label}
  </button>
);

export const Filters: React.FC = () => {
  const setFilter = useTodosStore((state) => state.setFilter);
  const filter = useTodosStore((state) => state.filter);
  const clearCompleted = useTodosStore((state) => state.clearCompleted);
  const filteredCount = useTodosStore((state) => state.filteredCount());

  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto mt-4 text-sm text-gray-600">
      <div className="flex w-full gap-2 items-center justify-between">
        <span className="text-gray-500 w-24 text-[10px]">
          {filteredCount} item{filteredCount !== 1 ? "s" : ""}
        </span>
        <FilterButton
          label="All"
          filterType="all"
          currentFilter={filter}
          setFilter={setFilter}
        />
        <FilterButton
          label="Active"
          filterType="active"
          currentFilter={filter}
          setFilter={setFilter}
        />
        <FilterButton
          label="Completed"
          filterType="completed"
          currentFilter={filter}
          setFilter={setFilter}
        />
        <button
          onClick={clearCompleted}
          className="px-3 max-sm:text-[10px] py-1 text-red-500 border border-red-500 rounded hover:bg-red-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
