import { cleanObject } from "utils";
import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { User } from "screens/project-list/search-panel";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(params) }));
  }, [params]);

  return result;
};
