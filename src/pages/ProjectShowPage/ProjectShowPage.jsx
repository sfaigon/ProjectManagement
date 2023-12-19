import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";

export default function ProjectShowPage() {
  const location = useLocation();
  const projectId = location.pathname.slice(10);
  const navigate = useNavigate();

  const [showProject, setShowProject] = useState([]);
  useEffect(function () {
    async function showProject() {
      const project = await projectsAPI.getOne(projectId);
      setShowProject(project);
    }
    showProject();
  }, []);

  const handleDelete = async () => {
    try {
      await projectsAPI.deleteProject(projectId);
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (!projectId) {
    return <p>No Project Info</p>;
  }

  return (
    <>
      <div>
        <h1>{showProject.name}</h1>
      </div>
      <div>
        <p>Date Created: {showProject.dateCreated}</p>
      </div>
      <div>
        <p>Team Members: {showProject.teamMembers}</p>
      </div>
      <div>
        <p>Tasks: {showProject.tasks}</p>
      </div>
      <div>
        <p>Comments: {showProject.comments}</p>
      </div>
      <Link to={`/projects/${projectId}/edit`}>
        <button>Update</button>
      </Link>
      <button onClick={handleDelete}>Delete Project</button>
    </>
  );
}
