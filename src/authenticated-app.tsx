import styled from "@emotion/styled";
import React from "react";
import { ProjectListPage } from "./components/project-list";
import { useAuth } from "./context/auth-context";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Menu, Dropdown, Button, Space } from "antd";
import { Row } from "./components/lib";

export const AuthenticatedApp: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
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
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </Container>
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
