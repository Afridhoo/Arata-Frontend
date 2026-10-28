import { toast } from "sonner";

export function chekingUseForm(value, type) {
  const Arrtype = ["SignUp", "ForgotPassword", "UpdatePassword"];

  const valueArr = Object.values(value);

  if (valueArr.includes("")) {
    toast.error("Silahkan Isi Semua Input");

    return false;
  }

  if (Arrtype.includes(type)) {
    const { confirmPassword, newPassword } = value;

    if (confirmPassword !== newPassword) {
      toast.error("Password Tidak Sama Silahkan Cek Ulang");

      return false;
    }
  }
  return true;
}
