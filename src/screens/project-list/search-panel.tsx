import React from "react";
import { Form, Input, Select } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface ISearchPanel {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: ISearchPanel["param"]) => void;
}
export const SearchPanel = ({ param, users, setParam }: ISearchPanel) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          style={{ width: 120 }}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
