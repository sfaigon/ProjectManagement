import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";

export default function TaskPage() {
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
        < TaskForm /> 
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <strong>{task.title}</strong>
                    <br />
                    <span>{task.description}</span>
                </li>
            ))}
        </ul>
    </>
    )
}