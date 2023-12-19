import { useState } from "react";

const defaultDate = new Date();

const CommentForm = ({ onSubmit, projectId }) => {
  const [formData, setFormData] = useState({
    text: "",
    dateCreated: defaultDate,
  });

  const handleChange = (evt) => {
    const { text, value } = evt.target;
    setFormData({
      ...formData,
      [text]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onsubmit(formData);

    setFormData({
      text: "",
      dateCreated: defaultDate,
      user: user._id,
      project: projectId,
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
      </form>
    </>
  );
};
