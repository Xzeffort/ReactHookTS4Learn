import React from "react";
import { Project, User } from ".";

interface ProjectList {
  users: User[];
  list: Project[];
}

export const List: React.FC<ProjectList> = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
        </tr>
        <tr>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.personId + project.name}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};