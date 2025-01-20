import { AddTodo } from "../components/AddTodo/AddTodo";
import { Filters } from "../components/Filters/Filters";
import { TodoList } from "../components/TodoList/TodoList";
import { BackgroundBeamsWithCollision } from "../shared/ui/background-beams-with-collision";
import "./App.css";

const App = () => {
  return (
    <div className="flex h-screen w-full items-center sm:p-5">
      <BackgroundBeamsWithCollision>
        <h1 className="text-[100px] font-thin text-[#e1cdcc] mb-3">todos</h1>
        <div className="relative h-full min-h-[400px] flex flex-col w-full max-w-xl bg-white shadow-xl p-6 items-center justify-between rounded-3xl max-sm:rounded-xl sm:mb-4">
          <AddTodo />
          <TodoList />
          <Filters />
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default App;
