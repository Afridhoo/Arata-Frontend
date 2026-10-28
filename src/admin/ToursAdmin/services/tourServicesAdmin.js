import { callAxiosApi } from "@/Api/Axios";

export async function GetStatsTour() {
  const tour = await callAxiosApi.get(`tours/statsBookingTour`);
  return tour.data.data;
}

export async function GetLocation({ search }) {
  const location = await callAxiosApi.get(`tours/getLocations/${search}`);

  return location.data.data;
}

export async function GetLocationLatlng({ latlng }) {
  const location = await callAxiosApi.get(`tours/getLocation/${latlng}`);
  return location.data.data;
}

export async function UpdateTour({ value, id }) {
  const val = await callAxiosApi.patch(`tours/${id}`, value);

  return val;
}

export async function GetLocationDestination({ latlng }) {
  const location = await callAxiosApi.get(`tours/getDestination/${latlng}`);

  return location.data.data;
}

export async function InsertTour({ value }) {
  const response = await callAxiosApi.post(`tours`, value);

  return response;
}

export async function DeleteLocationTour({ idTour, idLocation }) {
  const tour = await callAxiosApi.delete(
    `tours/deleteLocation/${idTour}/location/${idLocation}`,
  );

  return tour;
}

export async function DeleteTour({ idDelete }) {
  const response = await callAxiosApi.delete(`tours/${idDelete}`);
  return response.data;
}
