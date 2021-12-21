import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "hooks";
import React from "react";
import { SearchPanel } from "screens/kanban/search-panel";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanab } from "./creat-kanban";
import { KanbanCoulmn } from "./kanban-column";
import { TaskModal } from "./task-modal";
import { useProjectInUrl, useTasksSearchParams } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans();
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskLoading || kanbanLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanCoulmn key={kanban?.id} kanban={kanban} />
          ))}
          <CreateKanab />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  margin-right: 2rem;
`;
