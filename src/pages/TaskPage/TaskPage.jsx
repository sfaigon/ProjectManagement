import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(function() {
        async function getTasks() {
            const tasks = await tasksAPI.getAll();
            setTasks(tasks);
        }
        getTasks();
    }, []);  

    const handleTaskSubmit = async (formData) => {
        // Assuming you have a createTask function in tasksAPI
        await tasksAPI.createTask(formData);
        // After submitting, fetch the updated list of tasks
        const updatedTasks = await tasksAPI.getAll();
        setTasks(updatedTasks);
      };

    return (
    <>
        <h1>My Tasks</h1>
        < TaskForm onSubmit={handleTaskSubmit} /> 
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <strong>{task.title}</strong>
                    <br />
                    <span>{task.description}</span>
                </li>
            ))}
        </ul>
    </>
    )
}