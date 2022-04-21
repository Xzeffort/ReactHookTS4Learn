import styled from "@emotion/styled";
import React from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

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

  const client = useHttp();

  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
