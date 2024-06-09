import React, { useState } from "react";

export default function Header() {
  const [task, setTask] = useState("");
  const [type, setType] = useState("default");
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    if (task.trim() === "") {
      alert("You should add a task before submitting");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      text: task,
      type:
        type !== "default"
          ? `list-group-item list-group-item-action list-group-item-${type}`
          : "list-group-item list-group-item-action",
    };

    setTasks([...tasks, newTask]);
    setTask(""); // Clear input field after adding task
    setType("default"); // Reset select to default value
  }

  function handleCheckboxChange(taskId) {
    // Show a confirmation dialog to the user
    const userConfirmed = confirm("Are you sure you want to remove this task?");
    
    // If the user clicked "OK", proceed to remove the task
    if (userConfirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  }

  return (
    <>
      <div className="header">
        <img
          src="../toDoLogo.png"
          alt="Logo"
          className="logo header-component"
        />
        <form onSubmit={addTask} className="header-component">
          <input
            className="enter-task"
            type="text"
            placeholder="Enter your new task here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            className="task-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="default" disabled selected>
              Choose the type of your task...
            </option>
            <option value="default">Default</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="danger">Danger</option>
            <option value="warning">Warning</option>
          </select>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
      </div>
      <div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className={task.type}>
              <input
                type="checkbox"
                className="form-check-input me-1"
                id={`checkbox-${task.id}`}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <label
                className="form-check-label stretched-link"
                htmlFor={`checkbox-${task.id}`}
              >
                {task.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
