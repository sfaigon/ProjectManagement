import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as projectsAPI from "../../utilities/projects-api";
import * as commentsAPI from "../../utilities/comments-api";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function ProjectShowPage({ user }) {
  const location = useLocation();
  const projectId = location.pathname.slice(10);

  const [showProject, setShowProject] = useState([]);
  useEffect(function () {
    async function showProject() {
      const project = await projectsAPI.getOne(projectId);
      setShowProject(project);
      
    }

    showProject();
  },[]);

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
  

  return (
    <>
      <h1>Project Show page</h1>
      <h1>{showProject.name}</h1>
      
      <CommentForm
        user={user}
        projectId={showProject}
        onSubmit={addComment}
      />
      <ul>
        {comments.map((c) => (
          showProject._id == c.project && 
          (
          <li>
            <p>{c.text} : {c.user} : {c.project}</p>
          </li>

          )
        ))}
      </ul>
    </>
  );
}
