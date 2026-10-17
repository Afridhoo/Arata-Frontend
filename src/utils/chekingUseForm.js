import { toastError } from "@/components/UseToastSimple";

export function chekingUseForm(value, type) {
  const Arrtype = ["SignUp", "ForgotPassword", "UpdatePassword"];

  const valueArr = Object.values(value);

  if (valueArr.includes("")) {
    toastError({ title: "Silahkan Isi Semua Input" });

    return false;
  }

  if (Arrtype.includes(type)) {
    const { confirmPassword, newPassword } = value;

    if (confirmPassword !== newPassword) {
      toastError({ title: "Password Tidak Sama Silahkan Cek Ulang" });

      return false;
    }
  }
  return true;
}
