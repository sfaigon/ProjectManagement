import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";
import { useNavigate } from "react-router-dom";

const CommentEditForm = ({ comment, onSubmit }) => {
  const [formData, setFormData] = useState({
    text: comment.text,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedComment = await commentsAPI.updateComment(comment._id, formData);
      onSubmit(updatedComment);

      navigate(`/comments/${updatedComment._id}`);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default CommentEditForm;
