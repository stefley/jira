import { useState } from "react";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "hooks";
import { useProject } from "utils/projects";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { Button } from "antd";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, data: list } = useProject(useDebounce(param, 1000));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};
// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;
