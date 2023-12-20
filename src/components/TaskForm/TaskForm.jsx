import { useState } from "react";
import * as tasksAPI from "../../utilities/tasks-api";

// default date for form fields
const defaultDate = new Date();

const TaskForm = ({ onSubmit, projectId }) => {
  // Manage form fields
  const [formData, setFormData] = useState({
    title: "",
    dateAssigned: defaultDate,
    deadline: defaultDate,
    description: "",
    stage: "In Progress",
    project: projectId._id,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      project: projectId._id,
    });
  };

  // const formatDate = (dateString) => {
  //   const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
  //   return new Date(dateString).toLocaleDateString('en-GB', options);
  // };

  // Handles form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

  // const formattedFormData = {
  //     ...formData,
  //     dateAssigned: formatDate(formData.dateAssigned),
  //     deadline: formatDate(formData.deadline),
  //   };

  const newTask = await tasksAPI.createTask(formData);
    onSubmit(newTask);

    // Reset form fields after submission
    setFormData({
        title: '',
        dateAssigned: defaultDate,
        deadline: defaultDate,
        description: '',
        stage: 'To Do',
        project: projectId._id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        // value={formData.title}
        onChange={handleInputChange}
        required
      />

      <label>Date Assigned:</label>
      <input
        type="date"
        name="dateAssigned"
        // value={formData.dateAssigned}
        onChange={handleInputChange}
        required
      />

      <label>Deadline:</label>
      <input
        type="date"
        name="deadline"
        // value={formData.deadline}
        onChange={handleInputChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        // value={formData.description}
        onChange={handleInputChange}
        required
      ></textarea>

      <label>Stage:</label>
      <select name="stage" value={formData.stage} onChange={handleInputChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
