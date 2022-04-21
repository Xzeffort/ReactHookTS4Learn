import React from "react";
import { Table } from "antd";
import { Project, User } from "./index";
import dayjs from "dayjs";

interface ProjectList {
  users: User[];
  list: Project[];
}

export const List: React.FC<ProjectList> = ({ users, list }) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "负责人",
          key: "person",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          key: "time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
