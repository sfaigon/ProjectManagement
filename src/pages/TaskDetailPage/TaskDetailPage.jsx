import {useEffect, useState} from 'react';
import * as tasksAPI from '../../utilities/tasks-api'
import { useParams, Link } from 'react-router-dom';
import TaskEditForm from '../../components/TaskEditForm/TaskEditForm';

export default function TaskDetailPage() {
  const [task, setTask] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getTaskDetails() {
        try {
            const taskDetails = await tasksAPI.getById(id);
            setTask(taskDetails);
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    }

    getTaskDetails();
  }, [id]);

  if (!task) {
    return <p>No Task Info</p>;
  }

    return (
        <>
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Date Assigned:</strong> {task.dateAssigned}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Stage:</strong> {task.stage}</p>
        <Link to={`/tasks/${id}/edit`}>Edit Task</Link>
        </>
    )
  }