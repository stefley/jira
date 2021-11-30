import { Drawer, Button } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  const { projectModalOpen, onClose } = props;
  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={onClose}>
      <h1>Project modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
