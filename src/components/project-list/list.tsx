import React from "react";
import { Table } from "antd";
import { Project, User } from ".";

interface ProjectList {
  users: User[];
  list: Project[];
}

export const List: React.FC<ProjectList> = ({ users, list }) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
