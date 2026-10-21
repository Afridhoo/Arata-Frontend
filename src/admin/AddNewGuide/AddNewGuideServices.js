import { callAxiosApi } from "@/Api/Axios";

export async function searchUser({ page, filter }) {
  const response = await callAxiosApi.get(`users/getUser`, {
    params: { page, ...filter },
  });

  return response.data.data;
}

export async function UpdateRoleUser({ value }) {
  const response = await callAxiosApi.post(`guide`, value);

  return response.data;
}
