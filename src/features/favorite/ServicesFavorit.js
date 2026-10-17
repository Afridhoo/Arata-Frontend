import { callAxiosApi } from "@/Api/Axios";

export async function CreateFavorite({ value }) {
  const response = await callAxiosApi.post(`favorite`, value);

  return response.data.message;
}
