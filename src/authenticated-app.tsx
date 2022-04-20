import React from "react";
import { ProjectListPage } from "./components/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>注销</button>
      <ProjectListPage />
    </div>
  );
};
