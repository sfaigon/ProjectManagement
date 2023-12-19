import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";

export default function ProjectShowPage() {
  const location = useLocation();
  const projectId = location.pathname.slice(10);
  console.log(projectId);

  const [showProject, setShowProject] = useState([]);
  useEffect(function () {
    async function showProject() {
      const project = await projectsAPI.getOne(projectId);
      setShowProject(project);
    }
    showProject();
  }, []);

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
      <Link to="/projects/:id/update">
        <button>Update</button>
      </Link>
    </>
  );
}
