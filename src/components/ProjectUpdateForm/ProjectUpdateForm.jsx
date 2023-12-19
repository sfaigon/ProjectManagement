import { useState } from "react";
import * as projectsAPI from "../../utilities/projects-api";
import { useNavigate } from "react-router-dom";

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

  const handleEditSubmit = async (e) => {
    e.preventDefualt();
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
          type="text"
          name="dateCreated"
          value={formData.dateCreated}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Team Members:</label>
        <input
          type="text"
          name="teamMembers"
          value={formData.teamMembers}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Tasks:</label>
        <input
          type="text"
          name="tasks"
          value={formData.tasks}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Comments:</label>
        <input
          type="text"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default UpdateProjectForm;
