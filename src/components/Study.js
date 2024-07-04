import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://667d8b82297972455f658def.mockapi.io/todo/ToDo";

const Study = () => {
  const [tasks, setTasks] = useState([]);
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}?category=Study`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching Study tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-8 bg-violet-400">
      <div className="w-1/2 flex text-center items-center flex-col gap-5 bg-yellow-100">
        <h1 className="text-blue-600 uppercase font-semibold text-2xl py-1">
          Study Tasks
        </h1>
        <div className="w-full bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center mb-5"
            >
              <div className="flex items-center w-2/3">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={task.state}
                  readOnly
                />
                <li
                  className={`list-none text-left break-normal ${
                    task.state ? "text-red-500 line-through" : ""
                  }`}
                >
                  {task.task}
                </li>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-700 text-white-600 px-2 py-2 font-medium rounded-md"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="White"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Study;
