import { callAxiosApi } from "@/Api/Axios";

export async function SignUp(value) {
  const signUp = await callAxiosApi.post(`users/signup`, value);

  return signUp.data;
}

export async function SignOut() {
  const response = await callAxiosApi.post(`users/logOut`);

  return response;
}

export async function SignIn(value) {
  const signIn = await callAxiosApi.post(`users/login`, value);

  return signIn;
}

export async function GetMe() {
  try {
    const GetAccountMe = await callAxiosApi.get(`users/getAccount`);

    return GetAccountMe.data.data.value;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 500)
      return null;
    throw error;
  }
}

export async function UpdatePassword(value) {
  const update = await callAxiosApi.patch(`users/updatePassword`, value);

  return update;
}

export async function LoginByGoogle({ credential }) {
  const response = await callAxiosApi.post(`users/loginByGoogle`, {
    credential,
  });

  return response;
}
