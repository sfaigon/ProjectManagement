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
import UpdateProjectPage from "../ProjectUpdatePage/ProjectUpdatePage";
import CommentDetailPage from "../CommentDetailPage/CommentDetailPage";
import CommentEditPage from "../CommentEditPage/CommentEditPage"
import TaskCreatePage from "../TaskCreatePage/TaskCreatePage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/projects/:id/edit" element={<UpdateProjectPage />} />
            <Route
              path="/projects/:id"
              element={<ProjectShowPage user={user} />}
            />
            <Route path="/projects/create" element={<ProjectCreatePage />} />
            <Route path="/projects" element={<ProjectListPage user={user} />} />
            <Route path="/tasks" element={<TaskPage user={user} />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage user={user} />} />
            <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
            <Route path="/comments/:id" element={<CommentDetailPage />}  />
            <Route path="/comments/:id/edit" element={<CommentEditPage />}  />
            <Route path="/projects/:projectId/tasks/create" element={<TaskCreatePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
