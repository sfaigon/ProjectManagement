import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";
import * as commentsAPI from "../../utilities/comments-api";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function ProjectShowPage({ user }) {
  const location = useLocation();
  const projectId = location.pathname.slice(10);
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  useEffect(function () {
    async function fetchProject() {
      const fetchedProject = await projectsAPI.getOne(projectId);
      setProject(fetchedProject);
      console.log(fetchedProject.user.name);
    }

    fetchProject();
  }, []);

  const [comments, setComments] = useState([]);

  function addComment(newComment) {
    setComments([...comments, newComment]);
  }

  useEffect(function () {
    async function getComments() {
      const comments = await commentsAPI.getAll();
      setComments(comments);
    }
    getComments();
  }, []);

  const handleDelete = async () => {
    try {
      await projectsAPI.deleteProject(projectId);
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (!projectId) {
    return <p>No Project Info</p>;
  }

  return (
    <>
      <div>
        <h1>{project.name}</h1>
      </div>
      <div>
        <p>Created By: {project.user}</p>
      </div>
      <div>
        <p>Date Created: {project.dateCreated}</p>
      </div>
      <div>
        <p>Team Members: {project.teamMembers}</p>
      </div>
      <div>
        <p>Tasks: {project.tasks}</p>
      </div>
      <div>
        <p>Comments: {project.comments}</p>
      </div>
      <Link to={`/projects/${projectId}/edit`}>
        <button>Update</button>
      </Link>
      <button onClick={handleDelete}>Delete Project</button>

      <CommentForm user={user} projectId={project} onSubmit={addComment} />
      <ul>
        {comments.map(
          (c) =>
            project._id == c.project && (
              <li>
                <p>
                  {c.text} : {c.user} : {c.project}
                </p>
              </li>
            )
        )}
      </ul>
    </>
  );
}
