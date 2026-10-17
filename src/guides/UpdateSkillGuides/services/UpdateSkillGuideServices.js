import { callAxiosApi } from "@/Api/Axios";

export async function TourSkill() {
  const response = await callAxiosApi.get(`tours/getAllCategoriesTour`);

  return response.data;
}

export async function UpdateSkil({ skillGuide }) {
  const response = await callAxiosApi.patch(`guide/addNewSkill`, {
    skillGuide,
  });

  return response;
}

export async function GetMeGuide() {
  const response = await callAxiosApi.get(`guide`);

  return response.data.data;
}

export async function DeleteOneSkill({ idSkillDelete }) {
  const response = await callAxiosApi.patch(`guide/deleteOneSkill`, {
    idSkillDelete,
  });

  return response.data;
}
