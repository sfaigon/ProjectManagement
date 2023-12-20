import { Link } from "react-router-dom";
import projectUser from "../../pages/ProjectShowPage/ProjectShowPage";

export default function ProjectItem({ project, idx }) {
  return (
    <>
      <div className="project-item">
        <Link to={`/projects/${project._id}`}>
          <ul>{project.name}</ul>
          <ul>{project.dateCreated}</ul>
          <ul>{projectUser.name}</ul>
        </Link>
      </div>
    </>
  );
}
