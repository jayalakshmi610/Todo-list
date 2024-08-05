import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";

const API_URL = "https://667d8b82297972455f658def.mockapi.io/todo/ToDo";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Favourites");

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

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await axios.post(API_URL, {
          task: newTask,
          category: selectedCategory,
          state: false,
        });
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTaskCompletion = async (task) => {
    const updatedTask = { ...task, state: !task.state };
    try {
      await axios.put(`${API_URL}/${task.id}`, updatedTask);
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? updatedTask : t
      );
      setTasks(updatedTasks);
      if (!task.state) {
        setPopupMessage("Congrats! You have done a great job!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleEditTask = (taskId) => {
    setIsEditing(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask(taskToEdit.task);
  };

  const handleSaveTask = async (task) => {
    const updatedTask = { ...task, task: editTask };
    try {
      await axios.put(`${API_URL}/${task.id}`, updatedTask);
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? updatedTask : t
      );
      setTasks(updatedTasks);
      setIsEditing(null);
      setEditTask("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Favourites":
        return "bg-red-500 rounded-full";
      case "Groceries":
        return "bg-green-500 rounded-full";
      case "Study":
        return "bg-orange-500 rounded-full";
      case "Sports":
        return "bg-violet-500 rounded-full";
      case "Work":
        return "bg-blue-500 rounded-full";
      default:
        return "bg-gray-500 rounded-full";
    }
  };

  const countTasks = (tasks) => {
    const completed = tasks.filter((task) => task.state).length;
    const pending = tasks.filter((task) => !task.state).length;
    return { completed, pending };
  };

  const { completed, pending } = countTasks(tasks);

  const filteredTasks = tasks.filter(
    (task) => task.category === selectedCategory
  );

  return (
    <div className="flex">
      <Navbar setSelectedCategory={setSelectedCategory} />
      <div className="mx-auto w-full bg-orange-200 font-bold flex text-center items-center flex-col gap-5">
        <div className="w-full  backdrop-blur-lg px-5 py-5 rounded-md">
          <div className="mb-5">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-1/2 px-2 py-1 border rounded-md bg-gray-300"
              placeholder="Add a new task"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1 border rounded-md ml-2"
            >
              <option value="Favourites">Favourites</option>
              <option value="Study">Study</option>
              <option value="Groceries">Groceries</option>
              <option value="Sports">Sports</option>
              <option value="Work">Work</option>
            </select>
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-2 py-1 font-medium rounded-md ml-2"
            >
              Add
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="bg-green-500 text-white px-3 py-1 rounded-md">
              Completed: {completed}
            </button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded-md">
              Pending: {pending}
            </button>
          </div>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="mb-2 flex items-center justify-between w-full px-5"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.state}
                  onChange={() => toggleTaskCompletion(task)}
                  className="mr-2 w-6 h-6 rounded-lg"
                  style={{
                    accentColor: task.state ? "green" : "initial",
                    borderColor: "red",
                    borderWidth: "5px",
                  }}
                />
                {isEditing === task.id ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className={`px-2 py-1 border rounded-md ${
                      task.state ? "line-through text-red-500" : ""
                    }`}
                  />
                ) : (
                  <span
                    className={`ml-2 ${
                      task.state ? "line-through text-red-500" : "text-black"
                    }`}
                  >
                    {task.task}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {isEditing === task.id ? (
                  <button onClick={() => handleSaveTask(task)} className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a2.113 2.113 0 112.99 2.99L7.219 19.11a2.113 2.113 0 01-1.098.589l-4.165.826a.528.528 0 01-.617-.617l.826-4.165a2.113 2.113 0 01.589-1.098L16.862 3.487z"
                      />
                    </svg>
                  </button>
                )}
                <button onClick={() => handleDeleteTask(task)} className="ml-2">
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
                      stroke="red"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
                <button
                  className={`ml-2 text-white px-2 py-1 rounded-md ${getCategoryColor(
                    task.category
                  )}`}
                >
                  {task.category}
                </button>
              </div>
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="popup-message fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
