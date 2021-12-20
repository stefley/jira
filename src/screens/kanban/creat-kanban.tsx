import { Input } from "antd";
import Column from "antd/lib/table/Column";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { ColumnContainer } from ".";
import { useKanabsQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanab = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanabsQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <ColumnContainer>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </ColumnContainer>
  );
};
