import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

export interface Param {
  name: string;
  personId: string;
}

export interface Project {
  name: string;
  personId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const ProjectListPage: React.FC = () => {
  const [param, setParam] = useState<Param>({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  const [list, setList] = useState<Project[]>([]);

  const client = useHttp();

  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    client("projects", cleanObject(debouncedParam)).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
