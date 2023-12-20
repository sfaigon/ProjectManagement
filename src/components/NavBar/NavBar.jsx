import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";
import Button from "@mui/material/Button";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/projects">
        <Button variant="text" className="nav-btn">
          Projects
        </Button>
      </Link>
      &nbsp; | &nbsp;
      <Link to="/tasks">
        <Button variant="text" className="nav-btn">
          Tasks
        </Button>
      </Link>
      &nbsp; | &nbsp;
      <Link to="/users">
        <Button variant="text" className="nav-btn">
          Users
        </Button>
      </Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        <Button variant="text" className="nav-btn">
          Log Out
        </Button>
      </Link>
    </nav>
  );
}
