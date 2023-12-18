import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";

export default function ProjectShowPage({ project, idx }) {
  const [showProject, setShowProject] = useState([]);
  const { projectName } = useParams();

  useEffect(function () {
    async function showProject() {
      const project = await projectsAPI.getOne();
      setShowProject(project);
    }
    showProject();
  }, []);
  return (
    <>
      <h1>Project Show page</h1>
      <h1>{projectName}</h1>;
    </>
  );
}
