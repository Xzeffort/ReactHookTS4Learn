import styled from "@emotion/styled";
import React, { useState } from "react";
import { ProjectListPage } from "./components/project-list";
import { useAuth } from "./context/auth-context";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Menu, Dropdown, Button, Space } from "antd";
import { ButttonNoPadding, Row } from "./components/lib";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ProjectScreen } from "./components/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./components/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButttonNoPadding
            type={"link"}
            onClick={() => setProjectModalOpen(true)}
          >
            创建项目
          </ButttonNoPadding>
        }
      />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListPage
                  projectButton={
                    <ButttonNoPadding
                      type={"link"}
                      onClick={() => setProjectModalOpen(true)}
                    >
                      创建项目
                    </ButttonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route
              path="*"
              element={<Navigate to="/projects" replace={true} />}
            />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButttonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButttonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Space>
      <Dropdown.Button
        overlay={
          <Menu>
            <Menu.Item key={"logout"}>
              <Button onClick={logout} type={"link"}>
                登出
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        {" "}
        Hi, {user?.name}
      </Dropdown.Button>
    </Space>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main``;
