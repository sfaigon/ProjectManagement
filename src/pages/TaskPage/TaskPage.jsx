import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";
import { Link } from "react-router-dom";

export default function TaskPage({ user, project }) {
    const [tasks, setTasks] = useState([]);

    function addTask(newTask) {
        setTasks([...tasks, newTask]);
    }

    useEffect(function() {
        async function getTasks() {
            const tasks = await tasksAPI.getAll();
            setTasks(tasks);
        }
        getTasks();
    }, []);  
    return (
    <>
        <h1>My Tasks</h1>
        <ul>
        {tasks.map(
        (task, index) => 
            task.users.includes(user._id) && (
                <li task={task} index={index} key={task._id}>
                    <Link to={`/tasks/${task._id}`}>
                    <strong>{task.title}</strong>
                    </Link>

                </li>
            ))}
        </ul>
    </>
    )
}