import { callAxiosApi } from "@/Api/Axios";

export async function GetTripMe() {
  const response = await callAxiosApi.get(`users/getTripMe`);

  return response.data.data;
}

export async function PostReviewGuide({ value }) {
  const response = await callAxiosApi.post(`guideReview`, { value });

  return response.data;
}

export async function DeleteReviewGuide({ id }) {
  const response = await callAxiosApi.delete(`guideReview/${id}`);

  return response.data;
}
