import { callAxiosApi } from "@/Api/Axios";

export async function GetHistoriesMe() {
  const response = await callAxiosApi.get(`guideHistories/getGuideHistoriesMe`);

  return response.data.data;
}

export async function GetHistoriesMeId({ id }) {
  const response = await callAxiosApi.get(
    `guideHistories/getGuideHistoriesMe/${id}`,
  );

  return response.data.data;
}
