import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";
const defaultDate = new Date();

const CommentForm = ({ onSubmit, projectId, user }) => {
  const [formData, setFormData] = useState({
    text: "",
    // dateCreated: defaultDate,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newComment = await commentsAPI.createComment(formData);
    onSubmit(newComment);

    setFormData({
      text: "",
      // dateCreated: defaultDate,
      user: user._id,
      project: projectId,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <input type="text" name="text" onChange={handleChange} required />
        <button>Leave Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
