import styled from "@emotion/styled";
import { useDocumentTitle } from "hooks";
import React from "react";
import { useKanbans } from "utils/kanban";
import { KanbanCoulmn } from "./kanban-column";
import { useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanCoulmn key={kanban?.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
