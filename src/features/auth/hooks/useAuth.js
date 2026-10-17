import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  GetMe,
  LoginByGoogle,
  SignIn,
  SignOut,
  SignUp,
  UpdatePassword,
} from "../services/authServices";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function UseSignUp() {
  return useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      toast.success("Berhasil Register");
    },
    onError: () => {
      toast.error("Gagal Register");
    },
  });
}

export function UseSignIn() {
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: SignIn,
    onSuccess: () => {
      toast.success("Berhasil Login");
      query.invalidateQueries({ queryKey: ["User"] });
      query.invalidateQueries({ queryKey: ["StatsUser"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}

export function UseSignOut() {
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: SignOut,
    onSuccess: () => {
      toast.success("Berhasil Logout");
      query.resetQueries()
      navigate("/");
    },
    onError: () => {
      toast.error("Gagal Logout");
    },
  });
}

export function UseGetMe() {
  return useQuery({
    queryKey: ["User"],
    queryFn: GetMe,

    retry: false,
  });
}

export function UseUpdatePassword() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: UpdatePassword,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["User"] });
      toast.success("Berhasil Mengupdate Password");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}

export function UseLoginByGoogle() {
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: LoginByGoogle,

    onSuccess: () => {
      toast.success("Berhasil Login");
      query.invalidateQueries({ queryKey: ["User"] });
      query.invalidateQueries({ queryKey: ["StatsUser"] });
      navigate("/");
    },

    onError: () => {
      toast.error("Gagal Login Menggunakan Google");
    },
  });
}
