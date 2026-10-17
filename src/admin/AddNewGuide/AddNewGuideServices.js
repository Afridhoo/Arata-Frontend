import { callAxiosApi } from "@/Api/Axios";

export async function searchUser({ valueSearch }) {
  const response = await callAxiosApi.get(`users/getUser/${valueSearch}`);

  return response.data.data;
}

export async function UpdateRoleUser({ value }) {
  const response = await callAxiosApi.post(`guide`, value);

  return response.data;
}
