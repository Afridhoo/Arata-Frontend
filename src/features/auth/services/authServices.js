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
  const GetAccountMe = await callAxiosApi.get(`users/getAccount`);

  return GetAccountMe.data.data.value;
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
