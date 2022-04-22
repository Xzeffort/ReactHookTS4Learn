import React from "react";
import { Table } from "antd";
import { Project, User } from "./index";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { useDocumentTitle } from "../../utils";
import { Link } from "react-router-dom";

interface ProjectList extends TableProps<Project> {
  users: User[];
}

export const List: React.FC<ProjectList> = ({
  users,
  ...props
}: ProjectList) => {
  useDocumentTitle("项目列表", false);
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          key: "name",
          dataIndex: "name",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
      {...props}
    ></Table>
  );
};
