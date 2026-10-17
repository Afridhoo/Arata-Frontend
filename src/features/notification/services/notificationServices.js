import { callAxiosApi } from "@/Api/Axios";

export async function GetNotif() {
  const notifications = await callAxiosApi.get(`notification`);

  return notifications.data.data;
}

export async function PatchNotif({ id }) {
  const notifPatchRead = await callAxiosApi.patch(
    `notification/update/${id}`,
    {},
  );

  return notifPatchRead;
}

export async function SendCoords({ coordinates, tourId, notifId }) {
  const response = await callAxiosApi.patch(`tripTour/${tourId}`, {
    coordinates,
    notifId,
  });

  return response.data;
}
