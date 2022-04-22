import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";

export interface Param {
  name: unknown;
  personId: unknown;
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const ProjectListPage = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  const debouncedParam = useDebounce(param, 1000);

  const { isLoading, error, data: list } = useProjects(debouncedParam);

  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
