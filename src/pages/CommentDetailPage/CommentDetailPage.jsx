import { useEffect, useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";
import { useParams, Link, useNavigate } from "react-router-dom";
import CommentEditForm from "../../components/CommentEditForm/CommentEditForm";

export default function CommentDetailPage() {
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCommentDetails() {
      try {
        const commentDetails = await commentsAPI.getById(id);
        setComment(commentDetails);
      } catch (error) {
        console.error("Error fetching comment details:", error);
      }
    }

    getCommentDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await commentsAPI.deleteComment(id);
      navigate(`/projects/${comment.project}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!comment) {
    return <p>No Comment Info</p>;
  }

  return (
    <>
      <h2> Your Comment </h2>
      <p>Text: {comment.text} </p>
      <Link to={`/comments/${id}/edit`} > Edit Comment </Link>
      <button onClick={handleDelete}>Delete Comment</button>
    </>
  );
}
