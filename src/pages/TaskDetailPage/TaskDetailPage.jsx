import {useEffect, useState} from 'react';
import * as tasksAPI from '../../utilities/tasks-api'
import { useParams } from 'react-router-dom';

export default function TaskDetailPage() {
  const [task, setTask] = useState(null);
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
        <p><strong>Date Assigned:</strong> {formatDate(task.dateAssigned)}</p>
        <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
        <p><strong>Stage:</strong> {task.stage}</p>
        </>
    )
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}