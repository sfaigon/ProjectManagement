import { Link } from "react-router-dom";

export default function ProjectItem({ project, idx }) {
  return (
    <>
      <Link to={`/projects/${project._id}`}>
        <li>{project.name}</li>
      </Link>
    </>
  );
}
