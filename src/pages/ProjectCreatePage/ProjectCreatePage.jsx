import { redirect, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { createProject } from "../../utilities/project-service";

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    console.log("submitting");
    await createProject(formData);
    navigate("/projects");
  };

  return (
    <>
      <h1>Project Create Page</h1>
      <ProjectForm onsubmit={handleSubmit} />
    </>
  );
}
