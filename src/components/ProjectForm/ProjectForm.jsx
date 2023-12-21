import { useState, useEffect } from "react";
import Select from "react-select";
import * as usersAPI from "../../utilities/users-api";

const defaultDate = new Date();

const ProjectForm = ({ onSubmit }) => {
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

  const handleChanges = (selectedOptions) => {
    const selectedUserIds = selectedOptions.map((option) => option.value);

    setFormData({
      ...formData,
      teamMembers: selectedUserIds,
    });
  };

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

      <Select
        name="teamMembers"
        onChange={handleChanges}
        isMulti
        options={users.map((u) => ({ value: u._id, label: u.name }))}
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;
