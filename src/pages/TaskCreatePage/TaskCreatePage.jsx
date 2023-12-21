import TaskForm from '../../components/TaskForm/TaskForm';
import * as tasksAPI from "../../utilities/tasks-api";
import { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

export default function TaskCreatePage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    function addTask(newTask) {
        setTasks([...tasks, newTask]);
    }
  
    useEffect(function() {
        async function getTasks() {
            const tasks = await tasksAPI.getById(projectId);
            setTasks(tasks);
        }
        getTasks();
    }, []);
    return (
        <>
        <h1> Create Task </h1>
        <TaskForm projectId={projectId} onSubmit={addTask} /> 
        </>
    )
}