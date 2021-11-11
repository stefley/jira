import { useState } from "react";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "hooks";
import { useProject } from "utils/projects";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  const [, setParam] = useState({
    name: "",
    personId: "",
  });
  const [param] = useUrlQueryParam(["name", "personId"]);
  useDocumentTitle("项目列表");
  const debounceParam = useDebounce(param, 1000);
  const { isLoading, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};
// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;
