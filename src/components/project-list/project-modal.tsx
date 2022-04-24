import React from "react";
import { Drawer, Button } from "antd";
export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      onClose={props.onClose}
      size={"large"}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}></Button>
    </Drawer>
  );
};
