import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentEditForm from "../../components/CommentEditForm/CommentEditForm";
import * as commentsAPI from "../../utilities/comments-api";

const CommentEditPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    async function getformDetails() {
      try {
        const formDetails = await commentsAPI.getById(id);
        setComment(formDetails);
      } catch (error) {
        console.error("Error fetching form details:", error);
      }
    }
    getformDetails();
  }, [id]);

  const handleEdit = async (formData) => {
    const updatedComment = await commentsAPI.getById(id, formData);
    setComment(updatedComment);
  };

  if (!comment) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Edit Comment</h2>
      <CommentEditForm comment={comment} onSubmit={handleEdit} />
    </>
  );
};

export default CommentEditPage;