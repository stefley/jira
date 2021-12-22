import styled from "@emotion/styled";
import { List, Popover, Typography, Divider, Button } from "antd";
import { useProjectModal } from "screens/project-list/util";
import { useProject } from "utils/projects";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { data: projects, isLoading, refetch } = useProject();
  const { open } = useProjectModal();
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
      <ButtonNoPadding onClick={open} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover
      placement="bottom"
      content={content}
      onVisibleChange={() => refetch()}
    >
      <span>项目</span>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
