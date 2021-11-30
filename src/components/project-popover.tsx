import styled from "@emotion/styled";
import { List, Popover, Typography, Divider, Button } from "antd";
import { useProject } from "utils/projects";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      <ButtonNoPadding
        type="link"
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
