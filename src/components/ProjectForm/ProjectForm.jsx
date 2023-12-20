import { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";
import Select from "react-select";

const defaultDate = new Date();

const ProjectForm = ({ onsubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: defaultDate,
    teamMembers: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("submitting");
    e.preventDefault();
    onsubmit(formData);

    setFormData({
      name: "",
      dateCreated: defaultDate,
      teamMembers: [],
    });
  };

  const [users, setUsers] = useState([]);

  useEffect(function () {
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
        onChange={handleChange}
        required
      />

      <label>Date Created:</label>
      <input
        type="date"
        name="dateCreated"
        value={formData.dateCreated}
        onChange={handleChange}
        required
      />

      <label>Assign To:</label>
      {/* <input
        type="select"
        name="teamMembers"
        value={formData.teamMembers}
        onChange={handleChange}
      /> */}

      {/* Select options show up */}

      <select name="teamMembers" onChange={handleChange}>
        {users.map((u, idx) => (
          <option value="u._id">{u.name}</option>
        ))}
      </select>

      {/* 
     <Select 
      isMulti
      name="teamMembers"
      options={users.map((u,idx) => (
          {value : u._id, label: u.name},
        ))}
      />

       */}

      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;
