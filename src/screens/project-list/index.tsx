import { useState } from "react";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "hooks";
import { useProject } from "utils/projects";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Button } from "antd";
import { Row } from "components/lib";

export const ProjectListScreen = (props: { projcetButton: JSX.Element }) => {
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, data: list, retry } = useProject(useDebounce(param, 1000));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projcetButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List
        projectButton={props.projcetButton}
        refresh={retry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};
// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;
