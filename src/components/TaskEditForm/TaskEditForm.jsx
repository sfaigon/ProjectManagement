import { useState } from 'react';

const TaskEditForm = ({ task, onSubmit }) => {
    const [formData, setFormData] = useState({
      title: task.title,
      dateAssigned: task.dateAssigned,
      deadline: task.deadline,
      description: task.description,
      stage: task.stage,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedTask = await tasksAPI.updateTask(task._id, formData);
        onSubmit(updatedTask);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };

    return (
    <form onSubmit={handleEditSubmit}>
    <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

     <label>Date Assigned:</label>
      <input
        type="date"
        name="dateAssigned"
        value={formData.dateAssigned}
        onChange={handleInputChange}
        required
      />

      <label>Deadline:</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      ></textarea>
    
        <label>Stage:</label>
        <select
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
        >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        </select>

        <button onClick={handleEditSubmit}>Save Changes</button> 
        </form>
    )
}

export default TaskEditForm;