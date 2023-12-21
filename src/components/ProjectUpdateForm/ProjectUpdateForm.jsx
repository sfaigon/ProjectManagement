import { useState, useEffect } from "react";
import * as projectsAPI from "../../utilities/projects-api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as usersAPI from "../../utilities/users-api";

const UpdateProjectForm = ({ project, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    dateCreated: project.dateCreated,
    teamMembers: project.teamMembers,
    tasks: project.tasks,
    comments: project.comments,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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


  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateProject = await projectsAPI.updateProject(
        project._id,
        formData
      );
      onSubmit(updateProject);

      navigate(`/projects/${updateProject._id}`);
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Date Created:</label>
        <input
          type="date"
          name="dateCreated"
          value={formData.dateCreated}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Team Members:</label>
      
         <Select
        name="teamMembers"
        onChange={handleChanges}
        isMulti
        options={users.map((u) => ({ value: u._id, label: u.name }))}
      />
      </div>
     
      
      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default UpdateProjectForm;
