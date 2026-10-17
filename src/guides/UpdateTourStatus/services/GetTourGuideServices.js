import { callAxiosApi } from "@/Api/Axios";

export async function GetGuideTour() {
  const response = await callAxiosApi.get(`guide/getTourGuides`);

  return response.data.data;
}

export async function getDestinationHandle({ idValue }) {
  const { idTour, idDestination } = idValue;

  const response = await callAxiosApi.get(
    `guide/getDestinationHandle/${idTour}/${idDestination}`,
  );

  return response.data.data;
}

export async function UpdateDestinationHandle({ val }) {
  const response = await callAxiosApi.post(
    `guide/updateDestinationHandle`,
    val,
  );

  return response.data;
}

export async function GetSameGuide({ value }) {
  const response = await callAxiosApi.post(`guide/getSameGuide`, { value });

  return response.data.data;
}
