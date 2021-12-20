import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "types/project";
import { User } from "types/user";

interface ISearchPanel {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
          style={{ width: 120 }}
        />
      </Form.Item>
    </Form>
  );
};
