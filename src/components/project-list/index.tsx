import styled from "@emotion/styled";
import React from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { Typography } from "antd";

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

export const ProjectListPage: React.FC = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  const [list, setList] = useState<Project[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<null | Error>(null);

  const client = useHttp();

  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    setLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={loading} dataSource={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
