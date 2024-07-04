import React from "react";

const Todo = ({ todo }) => {
  return (
    <div className="flex items-center justify-between">
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.text}</span>
      <button onClick={() => handleDelete(todo)}>Delete</button>
    </div>
  );
};

export default Todo;
