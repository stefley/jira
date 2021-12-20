import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
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
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanCoulmn key={kanban?.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  margin-right: 2rem;
`;
