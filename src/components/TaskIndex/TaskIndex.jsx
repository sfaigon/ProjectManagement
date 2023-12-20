import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../TaskForm/TaskForm";
import { Link } from "react-router-dom";

export default function TaskIndex({ project }) {
  const [tasks, setTasks] = useState([]);

  useEffect(function () {
    async function getTasks() {
      const tasks = await tasksAPI.getAll();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <>
      <h1>Tasks for {project.name} </h1>
      <ul>
        {tasks.map(
          (task, index) =>
            project._id == task.project && (
              <li key={index}>
                <Link to={`/tasks/${task._id}`}>
                  <p>{task.title}</p>
                </Link>
              </li>
            )
        )}
      </ul>
    </>
  );
}
