import { useState, useEffect } from "react";
import { createProject } from "../../utilities/project-service";
import * as projectsAPI from "../../utilities/projects-api";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import { Link } from "react-router-dom";

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
      <h1>Project List Page</h1>
      <Link to="/projects/create">Create Project</Link>
      <ul>
        {projects.map((p, idx) => (
          <ProjectItem project={p} idx={idx} key={idx} />
        ))}
      </ul>
    </>
  );
}
