import { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";
import { Link } from "react-router-dom";
import UserItem from "../../components/UserItem/UserItem";
import "./UserListPage.css";

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function getUsers() {
      const users = await usersAPI.getAll();
      setUsers(users);
    }
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="user-container">
          <div className="title">
            <h1>User List Page</h1>
          </div>
          <div className="user-list">
            <ul>
              {users.map((u, idx) => (
                <UserItem user={u} key={idx} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
