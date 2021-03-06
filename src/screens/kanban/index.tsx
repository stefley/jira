import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drap-dnd-drop";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "hooks";
import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SearchPanel } from "screens/kanban/search-panel";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanab } from "./creat-kanban";
import { KanbanCoulmn } from "./kanban-column";
import { TaskModal } from "./task-modal";
import {
  useKanabsQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans();
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskLoading || kanbanLoading;

  const onDragEnd = useDragpEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnContainer>
            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanCoulmn key={kanban?.id} kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanab />
          </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragpEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanabsQueryKey());
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return;
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) return;
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }

      // task排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) return;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask.id === toTask.id) return;
        const type = source.index > destination.index ? "after" : "before";
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type,
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const ColumnContainer = styled(DropChild)`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  margin-right: 2rem;
`;
