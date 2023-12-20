import { useState } from 'react';
import * as tasksAPI from '../../utilities/tasks-api'
import { useNavigate } from 'react-router-dom';  

const TaskEditForm = ({ task, onSubmit, projectId }) => {
    const [formData, setFormData] = useState({
      title: task.title,
      dateAssigned: task.dateAssigned,
      deadline: task.deadline,
      description: task.description,
      stage: task.stage,
      project: projectId._id,
    });
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        project: projectId._id,
      });
    };
  
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedTask = await tasksAPI.updateTask(task._id, formData);
        onSubmit(updatedTask);

        navigate(`/tasks/${updatedTask._id}`);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };

    return (
    <form onSubmit={handleEditSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Date Assigned:</label>
          <input
            type="date"
            name="dateAssigned"
            value={formData.dateAssigned}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
  
        <div>
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
        </div>
  
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    )
}

export default TaskEditForm;