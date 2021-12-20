import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from "./use-optmistic-options";
import { useProjectsSearchParams } from "./../screens/project-list/util";
import { useEffect, useCallback } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "types/project";

export const useProject = (params?: Partial<Project>) => {
  // const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(params) }),
  //   [client, params]
  // );
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [params, run, fetchProjects]);
  // return result;
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };

  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };

  // return {
  //   mutate,
  //   asyncResult,
  // };
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProjectDetail = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !id,
    }
  );
};
