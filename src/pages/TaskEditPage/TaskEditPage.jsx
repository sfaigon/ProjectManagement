import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskEditForm from '../../components/TaskEditForm/TaskEditForm';
import * as tasksAPI from '../../utilities/tasks-api'

const TaskEditPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function getformDetails() {
        try {
            const formDetails = await tasksAPI.getById(id)
            setTask(formDetails);
        }catch (error) {
            console.error('Error fetching form details:', error);
        }
    }
    getformDetails();
  }, [id]);

  const handleEdit = async (formData) => {
    const updatedTask = await tasksAPI.getById(id, formData);
    setTask(updatedTask);
    // Handle the edit logic using tasksAPI.editTask(id, formData)
  };

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Edit Task</h2>
      <TaskEditForm task={task} onSubmit={handleEdit} />
    </>
  );
};

export default TaskEditPage;