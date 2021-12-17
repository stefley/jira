import { useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

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

export const useEditProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
