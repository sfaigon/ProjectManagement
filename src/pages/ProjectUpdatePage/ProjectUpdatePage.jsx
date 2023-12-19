import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateProjectForm from "../../components/ProjectUpdateForm/ProjectUpdateForm";
import * as projectsAPI from "../../utilities/projects-api";

export default function UpdateProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function getformDetails() {
      try {
        const formDetails = await projectsAPI.getById(id);
        setProject(formDetails);
      } catch (error) {
        console.error("Error fetching form details:", error);
      }
    }
    getformDetails();
  }, [id]);

  const handleEdit = async (formData) => {
    const updatedProject = await projectsAPI.getById(id, formData);
    setProject(updatedProject);
  };

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Update Project</h2>
      <UpdateProjectForm project={project} onSubmit={handleEdit} />
    </>
  );
}
