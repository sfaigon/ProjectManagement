import { Link } from "react-router-dom";
import * as userAPI from "../../utilities/users-api";
import { useState, useEffect } from "react";

export default function ProjectItem({ project, idx }) {
  const [user, setUser] = useState({});
  useEffect(function () {
    async function fetchUser() {
      const fetchedUser = await userAPI.getById(project.user);
      setUser(fetchedUser);
    }

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <div
        className="project-item-container"
        style={{ backgroundColor: idx % 2 ? "white" : "lightgray" }}
      >
        <Link to={`/projects/${project._id}`}>
          <div className="project-item">
            <ul>{project.name}</ul>
            <ul>{formatDate(project.dateCreated)}</ul>
            <ul>{user.name}</ul>
          </div>
        </Link>
      </div>
    </>
  );
}
