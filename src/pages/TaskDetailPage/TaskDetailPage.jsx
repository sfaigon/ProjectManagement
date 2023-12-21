import {useEffect, useState} from 'react';
import * as tasksAPI from '../../utilities/tasks-api'
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as usersAPI from "../../utilities/users-api";
import TaskEditForm from '../../components/TaskEditForm/TaskEditForm';

export default function TaskDetailPage({ user }) {
  const [task, setTask] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskMembers, setTaskMembers] = useState([]);

  useEffect (function () {
    async function fetchNames() {
      const names = task.users.map(async (userId) => {
        const user = await usersAPI.getById(userId);
        return user.name; 
      });
      const team = await Promise.all(names);
      setTaskMembers(team);
    }
    fetchNames();
  }, [task.users]); 
  console.log(taskMembers)
  console.log(task.users)
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

  const handleDelete = async () => {
    try {
      await tasksAPI.deleteTask(id);
      navigate('/tasks'); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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
        <p><strong>Task Members:</strong> {taskMembers.join(', ')}</p>

        {((task.users == user._id)||user._id == task.user) && (
        <>
        <Link to={`/tasks/${id}/edit`}>
          <button>Edit Task</button>
        </Link>
        <button onClick={handleDelete}>Delete Task</button>
        </>
        )}
        </>
    )
  }