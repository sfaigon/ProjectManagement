import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";
import { Link } from "react-router-dom";

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
        <ul>
            {tasks.map((task, index) => 
            task.user.includes(user._id && (
                <p> task={task} index={index} key={task._id}</p>
            )))}
      )
    </>
    )
}