import { useState, useEffect } from "react";
import * as projectsAPI from "../../utilities/projects-api";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import { Link } from "react-router-dom";
import "./ProjectListPage.css";
import Button from "@mui/material/Button";

export default function ProjectListPage({ user }) {
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
        <h1>Projects Created </h1>
        <Link to="/projects/create">
          <Button variant="contained">Create Project</Button>
        </Link>
        <div className="project-container">
          <div className="plp-label">
            <ul>Project Name</ul>
            <ul>Date Created</ul>
            <ul>Created By</ul>
          </div>
          <div className="project-list">
            {projects.map(
              (p, idx) =>
                p.user == user._id && (
                  <ProjectItem project={p} idx={idx} key={p._id} />
                )
            )}
          </div>
        </div>
        <h1>Projects Assigned</h1>
        <div className="project-container">
          <div className="plp-label">
            <ul>Project Name</ul>
            <ul>Date Created</ul>
            <ul>Created By</ul>
          </div>
          <div className="project-list">
            {projects.map(
              (p, idx) =>
                p.teamMembers.includes(user._id) && (
                  <ProjectItem project={p} idx={idx} key={p._id} />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
