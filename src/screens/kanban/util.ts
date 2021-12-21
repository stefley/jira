import { useDebounce } from "hooks";
import { useProjectDetail } from "./../../utils/projects";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanabsQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "proccessId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId),
      processId: Number(param.proccessId),
      tagId: Number(param.tagId),
      name: debouncedName,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id?: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTask,
    editingTaskId,
    setEditingTaskId,
    startEdit,
    close,
    isLoading,
  };
};
