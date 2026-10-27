import { callAxiosApi } from "@/Api/Axios";

export async function getTrip() {
  const response = await callAxiosApi.get(`tours/getTourActiveTrip`);

  return response.data.data;
}

export async function GetLineRoad({ coordinates, coordsBus, idLocations }) {
  const response = await callAxiosApi.post(`tours/getLineOpenRouter`, {
    coordinates,
    coordsBus,
    idLocations,
  });

  return response.data.data;
}
