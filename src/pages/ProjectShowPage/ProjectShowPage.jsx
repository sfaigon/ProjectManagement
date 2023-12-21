import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";
import * as commentsAPI from "../../utilities/comments-api";
import * as userAPI from "../../utilities/users-service";
import * as usersAPI from "../../utilities/users-api";
import CommentForm from "../../components/CommentForm/CommentForm";
import TaskIndex from "../../components/TaskIndex/TaskIndex";
import Button from "@mui/material/Button";
import "./ProjectShowPage.css";

export default function ProjectShowPage({ user }) {
  const location = useLocation();
  const projectId = location.pathname.slice(10);
  const navigate = useNavigate();
  const [projectUser, setProjectUser] = useState({});
  const [project, setProject] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(
    function () {
      async function fetchNames() {
        const names = project.teamMembers.map(async (userId) => {
          const user = await usersAPI.getById(userId);
          return user.name;
        });
        const team = await Promise.all(names);
        setTeamMembers(team);
      }
      fetchNames();
    },
    [project.teamMembers]
  );

  useEffect(function () {
    async function fetchProject() {
      const fetchedProject = await projectsAPI.getById(projectId);
      const fetchedUser = await userAPI.getUserById(fetchedProject.user);
      setProject(fetchedProject);
      setProjectUser(fetchedUser);
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
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (!projectId) {
    return <p>No Project Info</p>;
  }

  async function getUserName(userId) {
    const currentUser = await usersAPI.getById(userId);
    return currentUser.name;
  }
 

  // printUser();
  return (
    <>
      <div className="container">
        <div>
          <h1>{project.name}</h1>
        </div>
        <div>
          <p>Created By: {projectUser.name}</p>
        </div>
        <div>
          <p>Date Created: {formatDate(project.dateCreated)}</p>
        </div>
        <div>
          <p>Team Members: {teamMembers.join(", ")}</p>
        </div>

        {project.user == user._id && (
          <>
            <Link to={`/projects/${projectId}/edit`}>
              <Button variant="contained">Update</Button>
            </Link>
            <Button
              className="delete-btn"
              variant="contained"
              onClick={handleDelete}
            >
              Delete Project
            </Button>
            <br />
            <Link
              to={{
                pathname: `/projects/${projectId}/tasks/create`,
                state: { projectId: project._id },
              }}
            >
              <button>Create Task</button>
            </Link>
          </>
        )}

        <TaskIndex project={project} />

        <CommentForm user={user} projectId={project} onSubmit={addComment} />
        <ul>
          {comments.map(
            (c, idx) =>
              project._id == c.project &&
              (user._id == c.user ? (
                <li key={idx}>
                  <Link to={`/comments/${c._id}`}>
                    <p>
                      {c.user.name}: {c.text}
                    </p>
                  </Link>
                </li>
              ) : (
                <p key={idx}>
                  {c.user.name}: {c.text}
                </p>
              ))
          )}
        </ul>
      </div>
    </>
  );
}
