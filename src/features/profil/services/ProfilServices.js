import { callAxiosApi } from "@/Api/Axios";

export async function GetStatsMe() {
  const response = await callAxiosApi.get(`users/getStatsMe`, {});

  return response.data.dataResult;
}

export async function UpdateProfil({ value }) {
  const response = await callAxiosApi.patch(`users/updateAccount`, value);

  return response;
}
