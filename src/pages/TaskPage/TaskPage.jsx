import { useState, useEffect } from "react";
import * as tasksAPI from "../../utilities/tasks-api";
import TaskForm from "../../components/TaskForm/TaskForm";
import { Link } from "react-router-dom";

export default function TaskPage({ user }) {
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


    async function getProjectId(taskId) {
        const oneTask = await tasksAPI.getById(taskId);
        const projectId= String(oneTask.project)
        // console.log(typeof oneTask.project)
        return projectId;
    }

    // function getString() {
    //     const newTask = getProjectId(taskId).then();
    // }

    console.log(getProjectId('65835d9b250785abe44e9b5a'));
    // console.log(getString);

    return (
    <>
        <h1>My Tasks</h1>
        <ul>
        {tasks.map(
        (task, index) => 
            task.users.includes(user._id) && (
                <li task={task} index={index} key={task._id}>
                    <Link to={`/project/${getProjectId(task._id)}/tasks/${task._id}`}>
                    <strong>{task.title}</strong>
                    </Link>

                </li>
                
            ))}
        </ul>
    </>
    )
}