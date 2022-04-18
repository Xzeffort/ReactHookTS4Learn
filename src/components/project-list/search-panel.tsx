import React from "react";
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
        <input
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
        <select
          value={param.personId}
          onChange={(evt) => {
            setParam({
              ...param,
              personId: evt.target.value,
            });
          }}
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
