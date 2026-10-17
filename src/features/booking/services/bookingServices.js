import { callAxiosApi } from "@/Api/Axios";

export async function InsertBooking({ value, tourId }) {
  const response = await callAxiosApi.post(`tours/${tourId}/booking`, value);

  return response;
}

export async function BookingMe() {
  const GetBookingMe = await callAxiosApi.get(`booking/meBooking`);

  return GetBookingMe.data.bookings;
}

export async function GetBookingById({ id }) {
  const GetBookingById = await callAxiosApi.get(`booking/${id}`);

  return GetBookingById.data.data;
}
export async function CancelBooking({ id }) {
  const response = await callAxiosApi.patch(`booking/cancel/${id}`, {});

  return response;
}
