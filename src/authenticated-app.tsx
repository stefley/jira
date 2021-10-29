import React from "react";
import { ProjectScreen } from "screens/project";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
// import softwareLogo from 'assets/software-logo.svg'
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";

export const AuthenticateApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Navigate to={"projects"} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas: "header" "main";
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
  height: calc(100vh - 6rem);
`;
