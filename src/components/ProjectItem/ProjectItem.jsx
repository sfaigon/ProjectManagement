import { Link } from "react-router-dom";

export default function ProjectItem({ project, idx }) {
  return (
    <>
      <div
        className="project-item-container"
        style={{ backgroundColor: idx % 2 ? "white" : "lightgray" }}
      >
        <Link to={`/projects/${project._id}`}>
          <div className="project-item">
            <ul>{project.name}</ul>
            <ul>{project.dateCreated}</ul>
            <ul>{project.user.name}</ul>
          </div>
        </Link>
      </div>
    </>
  );
}
