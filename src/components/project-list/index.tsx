import styled from "@emotion/styled";
import React from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
import { SearchPanel } from "./search-panel";
import { Row } from "../lib";

export interface Param {
  name: unknown;
  personId: unknown;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const ProjectListPage = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();

  const debouncedParam = useDebounce(param, 1000);

  const { isLoading, error, data: list, retry } = useProjects(debouncedParam);

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        projectButton={props.projectButton}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
