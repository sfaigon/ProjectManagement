import React, { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";
import Select from "react-select";

const defaultDate = new Date();

const ProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: defaultDate,
    teamMembers: [],
  });

  const handleChange = (selectedOptions) => {
    const selectedUserIds = selectedOptions.map((option) => option.value);

    setFormData({
      ...formData,
      teamMembers: selectedUserIds,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      name: "",
      dateCreated: defaultDate,
      teamMembers: [],
    });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await usersAPI.getAll();
      setUsers(users);
    }

    getUsers();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>Project Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange(e)}
        required
      />

      <label>Date Created:</label>
      <input
        type="date"
        name="dateCreated"
        value={formData.dateCreated}
        onChange={(e) => handleChange(e)}
        required
      />

      <label>Assign To:</label>

      <Select
        name="teamMembers"
        onChange={handleChange}
        isMulti
        options={users.map((u) => ({ value: u._id, label: u.name }))}
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;


{/* <input
  type="select"
  name="teamMembers"
  value={formData.teamMembers}
  onChange={handleChange}
/> */}
      {/* 
     <Select 
      isMulti
      name="teamMembers"
      options={users.map((u,idx) => (
          {value : u._id, label: u.name},
        ))}
      />

       */}