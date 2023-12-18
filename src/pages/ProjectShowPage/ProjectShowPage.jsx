import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";

export default function ProjectShowPage() {
  const location=useLocation();
  const projectId = location.pathname.slice(10);


  const [showProject, setShowProject] = useState(null);
  useEffect(function () {
    async function showProject() {
      const project = await projectsAPI.getOne(projectId);
      setShowProject(project);
    }
    showProject();
  }, []);
  return (
    <>
      <h1>Project Show page</h1>
      <h1>{showProject.name}</h1>
    </>
  );
}
