import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";
import { Link } from "react-router-dom";
import "./TaskPage.css";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  useEffect(function () {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  return (
    <>
      <div className="container">
        <div className="tasklist-container">
          <div className="title">
            <h1>My Tasks</h1>
          </div>
          <div className="task-page-list">
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="task">
                  <Link to={`/tasks/${task._id}`}>
                    <strong>{task.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
