import { callAxiosApi } from "@/Api/Axios";

export async function GetAllReview() {
  const response = await callAxiosApi.get(`review`);

  return response;
}

export async function CreateReview({ value }) {
  const response = await callAxiosApi.post(`review`, value);

  return response.data;
}

export async function DeleteReview({ id }) {
  const response = await callAxiosApi.delete(`review/${id}`);

  return response.data;
}
