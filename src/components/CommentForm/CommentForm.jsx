import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";

const CommentForm = ({ onSubmit, projectId, user }) => {
  const [formData, setFormData] = useState({
    text: "",
    user: user._id,
    project: projectId._id,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
      project: projectId._id,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newComment = await commentsAPI.createComment(formData);
    onSubmit(newComment);

    setFormData({
      text: " ",
      user: user._id,
      project: projectId._id,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        />
        <button>Leave Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
