import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";
import * as commentsAPI from "../../utilities/comments-api";
import * as userAPI from "../../utilities/users-service";
import * as usersAPI from "../../utilities/users-api";
import CommentForm from "../../components/CommentForm/CommentForm";
import TaskIndex from "../../components/TaskIndex/TaskIndex";
import "./ProjectShowPage.css";
import Button from "@mui/material/Button";

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
  console.log(teamMembers);

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
  console.log(teamMembers);
  return (
    <>
      <div className="container">
        <div className="p-container">
          <div className="title">
            <h1>{project.name}</h1>
          </div>
          <div className="project-card">
            <div className="project-details">
              <div>
                <p>Created By: {projectUser.name}</p>
              </div>
              <div>
                <p>Date Created: {formatDate(project.dateCreated)}</p>
              </div>
              <div>
                <p>Team Members: {project.teamMembers}</p>
              </div>
            </div>
            <div className="crud-btns">
              <Link to={`/projects/${projectId}/edit`}>
                <button>Update</button>
              </Link>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Project
              </button>
            </div>
            <div className="task-comment">
              <div className="task-container">
                <TaskIndex project={project} />

                <Link
                  to={{
                    pathname: `/projects/${projectId}/tasks/create`,
                    state: { projectId: project._id },
                  }}
                >
                  <button>Create Task</button>
                </Link>
              </div>
              <div className="comment-container">
                <CommentForm
                  user={user}
                  projectId={project}
                  onSubmit={addComment}
                />
                <div className="comment-list">
                  <ul>
                    {comments.map(
                      (c, idx) =>
                        project._id == c.project &&
                        (user._id == c.user ? (
                          <div
                            className="comments"
                            style={{
                              backgroundColor: idx % 2 ? "white" : "lightgray",
                            }}
                          >
                            <li key={idx}>
                              <Link to={`/comments/${c._id}`}>
                                <p>{c.text}</p>
                              </Link>
                            </li>
                          </div>
                        ) : (
                          <p key={idx}>{c.text}</p>
                        ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div> */}
          {/* <h1>{project.name}</h1>
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
                    <p>{c.text}</p>
                  </Link>
                </li>
              ) : (
                <p key={idx}>{c.text}</p>
              ))
          )}
        </ul>
      </div>
    </>
  );
} */}
