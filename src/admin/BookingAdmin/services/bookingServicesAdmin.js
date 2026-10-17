import { callAxiosApi } from "@/Api/Axios";

export async function UpdateBooking({ value, idBooking }) {
  const booking = await callAxiosApi.patch(`booking/${idBooking}`, { value });

  return booking;
}

export async function GetAllBooking({ page, filter }) {
  const bookings = await callAxiosApi.get(`booking`, {
    params: { page, ...filter },
  });

  return bookings.data.data.bookings;
}

export async function GetStatsBooking() {
  const stats = await callAxiosApi.get(`booking/getRevenue`);

  return stats.data.data;
}
