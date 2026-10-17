import { callAxiosApi } from "@/Api/Axios";

export async function ToursBooking({ page, filter }) {
  const response = await callAxiosApi.get(`tours/getToursBooking`, {
    params: { limit: page, ...filter },
  });

  return response.data.data;
}

export async function GuideTour({ idTour }) {
  const response = await callAxiosApi.get(`tours/getGuideTour/${idTour}`);

  return response.data.data;
}

export async function UpdateDateTour({ id, value }) {
  const response = await callAxiosApi.patch(
    `tours/updateDatesTour/${id}`,
    value,
  );

  return response.data;
}
