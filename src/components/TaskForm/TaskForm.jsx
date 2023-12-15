import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    description: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Reset form fields after submission 
    setFormData({
      title: '',
      deadline: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="deadline">Deadline:</label>
      <input
        type="date"
        id="deadline"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      ></textarea>

      {/* Add other form fields as needed */}

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;