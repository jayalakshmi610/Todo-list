import { React, useState, useEffect } from "react";
import TodoList from "../src/components/Todolist/Todolist";
import axios from "axios";

function App() {
  const API_URL = "https://667d8b82297972455f658def.mockapi.io/todo/ToDo";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-full bg-fuchsia-100">
      <div className=" container  mx-auto w-full h-screen  ps-22 flex bg-orange-100 rounded-md">
        <div className=" flex w-full rounded-xl px-10 py-10 ">
          <>
            <hr className="w-1 h-auto my-auto bg-gray-100 border-0 rounded mx-4 md:mx-auto md:my-10 dark:bg-gray-700" />
            <div className="mx-10 w-full">
              <h2 className="mx-auto font-bold text-gray-900 text-4xl text-center dark:text-white">
                All Tasks
              </h2>
              <TodoList />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
