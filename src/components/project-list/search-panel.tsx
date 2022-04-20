import React from "react";
import { Input, Select } from "antd";
import { Param, User } from ".";

interface Props {
  users: User[];
  param: Param;
  setParam: (param: Param) => void;
}

export const SearchPanel: React.FC<Props> = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
