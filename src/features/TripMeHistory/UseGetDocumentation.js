import { useQuery } from "@tanstack/react-query";
import { GetMeDocId, GetMeDocumentation } from "./DocumentationServices";

export function UseGetMeDocumentation({ enabled }) {
  return useQuery({
    queryKey: ["documentationMe"],
    queryFn: GetMeDocumentation,
    enabled: enabled,
    retry: false,
  });
}

export function UseGetMeDocId(id) {
  return useQuery({
    queryKey: ["documentationMe", id],
    queryFn: () => GetMeDocId({ id }),
    enabled: !!id,
    retry: false,
  });
}
