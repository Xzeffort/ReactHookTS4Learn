import styled from "@emotion/styled";
import React from "react";
import { ProjectListPage } from "./components/project-list";
import { useAuth } from "./context/auth-context";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
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
          <Button onClick={(e) => e.preventDefault()} type="link">
            Hi, {user?.name}
          </Button>
        </HeaderRight>
      </Header>
      <Title>项目列表</Title>
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

const Title = styled.h2`
  padding-top: 2rem;
`;
