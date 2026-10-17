import { callAxiosApi } from "@/Api/Axios";

export async function UpdateUserBooking({ value }) {
  const response = await callAxiosApi.patch(`guide`, value);

  return response.data;
}

export async function UpdateDocumentation({ value }) {
  const response = await callAxiosApi.patch(
    `guide/updateDocumentationGuide`,
    value,
  );

  return response.data;
}

export async function DeleteDocumentation({ value }) {
  const response = await callAxiosApi.patch(
    `guide/deleteDocumentationGuide`,
    value,
  );

  return response.data;
}
