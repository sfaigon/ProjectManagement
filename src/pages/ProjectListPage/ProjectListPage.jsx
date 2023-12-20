import { useState, useEffect } from "react";
import * as projectsAPI from "../../utilities/projects-api";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import { Link } from "react-router-dom";
import "./ProjectListPage.css";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  function addProject(newProject) {
    setProjects([...projects, newProject]);
  }

  useEffect(function () {
    async function getProjects() {
      const projects = await projectsAPI.getAll();
      setProjects(projects);
    }
    getProjects();
  }, []);
  return (
    <>
      <div className="plp-container">
        <h1>Project List Page</h1>
        <Link to="/projects/create">
          <button>Create Project</button>
        </Link>
        <div className="project-container">
          <div className="plp-label">
            <ul>Project Name</ul>
            <ul>Date Created</ul>
            <ul>Created By</ul>
          </div>
          <ul className="project-list">
            {projects.map((p, idx) => (
              <ProjectItem project={p} idx={idx} key={p._id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
