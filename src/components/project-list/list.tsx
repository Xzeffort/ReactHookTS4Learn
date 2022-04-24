import React from "react";
import { Table, Dropdown, Menu, Space } from "antd";
import { Project, User } from "./index";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "../pin";
import { useEditProject } from "../../utils/project";

interface ProjectList extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}

export const List: React.FC<ProjectList> = ({
  users,
  ...props
}: ProjectList) => {
  const { mutate } = useEditProject();
  const update = (id: number) => (pin: boolean) =>
    mutate({ id: id, pin: pin }).then(props.refresh);
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={update(project.id)}
              ></Pin>
            );
          },
        },
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
        {
          render(value, project) {
            return (
              <Space>
                <Dropdown.Button
                  overlay={
                    <Menu>
                      <Menu.Item key={"edit"}>{props.projectButton}</Menu.Item>
                    </Menu>
                  }
                ></Dropdown.Button>
              </Space>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
