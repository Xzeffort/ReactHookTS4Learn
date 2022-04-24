import React from "react";
import { Form, Input, Select } from "antd";
import { Project, User } from ".";
import { UserSelect } from "../user-select";

interface Props {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: Props["param"]) => void;
}

export const SearchPanel: React.FC<Props> = ({ users, param, setParam }) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
