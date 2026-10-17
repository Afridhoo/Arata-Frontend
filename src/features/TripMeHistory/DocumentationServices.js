import { callAxiosApi } from "@/Api/Axios";

export async function GetMeDocumentation() {
  const response = await callAxiosApi.get(`documentation/getDocMe`);

  return response.data.data;
}

export async function GetMeDocId({ id }) {
  const response = await callAxiosApi.get(`documentation/getDocMe/${id}`);

  return response.data.data;
}
