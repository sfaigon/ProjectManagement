import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">
        <Button variant="text" className="nav-btn">
          Home
        </Button>
      </Link>
      &nbsp; | &nbsp;
      <Link to="/projects">
        <button className="nav-btn">Projects</button>
      </Link>
      &nbsp; | &nbsp;
      <Link to="/tasks">
        <button className="nav-btn">Tasks</button>
      </Link>
      &nbsp; | &nbsp;
      <Link to="/users">
        <button className="nav-btn">Users</button>
      </Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        <button className="nav-btn">Log Out</button>
      </Link>
    </nav>
  );
}
