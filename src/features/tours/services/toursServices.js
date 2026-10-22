import { callAxiosApi } from "@/Api/Axios";

export async function GetTours({ limit, filter }) {
  const response = await callAxiosApi.get(`tours`, {
    params: { limit, ...filter },
  });

  const format = {
    tour: response.data.data.value || [],
    favorite: response.data.data.getFavorite || [],
    categories: response.data.data.getCategories || [],
  };

  return format;
}

export async function GetToursById({ id }) {
  const response = await callAxiosApi.get(`tours/${id}`);

  return response.data.data;
}

export async function GetTourHomePage() {
  const response = await callAxiosApi.get(`tours/tourHomePage`);

  return response.data.data;
}
