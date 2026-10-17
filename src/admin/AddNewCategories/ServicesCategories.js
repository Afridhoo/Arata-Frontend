import { callAxiosApi } from "@/Api/Axios";

export async function PostCategories({ value }) {
  const response = await callAxiosApi.post(`categories`, value);

  return response.data;
}

export async function UpdateCategories({ value, id }) {
  const response = await callAxiosApi.patch(`categories/${id}`, value);

  return response.data;
}

export async function DeleteCategories({ id }) {
  const response = await callAxiosApi.delete(`categories/${id}`);

  return response.data;
}

export async function GetCategoris() {
  const response = await callAxiosApi.get(`categories`);

  return response.data.data;
}
