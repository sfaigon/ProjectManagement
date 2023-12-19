import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import TaskPage from "../TaskPage/TaskPage";
import ProjectListPage from "../ProjectListPage/ProjectListPage";
import ProjectCreatePage from "../ProjectCreatePage/ProjectCreatePage";
import UserListPage from "../UserListPage/UsersListPage";
import WelcomePage from "../WelcomePage/WelcomePage";
import ProjectShowPage from "../ProjectShowPage/ProjectShowPage";
import TaskDetailPage from "../TaskDetailPage/TaskDetailPage";
import TaskEditPage from "../TaskEditPage/TaskEditPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/projects/:id" element={<ProjectShowPage />} />
            <Route path="/projects/create" element={<ProjectCreatePage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
           </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
