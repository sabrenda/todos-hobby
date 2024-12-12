import { AddTodo } from "../components/AddTodo/AddTodo";
import { Filters } from "../components/Filters/Filters";
import { TodoList } from "../components/TodoList/TodoList";
import { BackgroundBeamsWithCollision } from "../shared/ui/background-beams-with-collision";
import "./App.css";

function App() {
  return (
    <div className="flex min-w-[600px] max-sm:min-w-[400px] items-center py-10cd">
      <BackgroundBeamsWithCollision>
        <h1 className="text-[100px] font-thin text-[#e1cdcc]  mb-3">todos</h1>
        <div className="relative flex flex-col min-h-[680px] w-full max-w-xl bg-white shadow-xl p-6 items-center justify-between rounded-3xl max-sm:rounded-xl">
          <AddTodo />
          <TodoList />
          <Filters />
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default App;
