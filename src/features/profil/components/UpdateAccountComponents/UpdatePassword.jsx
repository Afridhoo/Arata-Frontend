import { useForm } from "react-hook-form";
import InputUseForm from "../../../../components/InputUseForm";
import { RiLockPasswordLine, RiShieldKeyholeLine } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import ButtonCta from "../../../../components/ButtonCta";

export default function UpdatePassword({ onSubmit, hiddenPassword }) {
  const { register: registerPw, handleSubmit: handleSubmitPw } = useForm();

  return (
    <form onSubmit={handleSubmitPw(onSubmit)} className="space-y-5 p-6 sm:p-7">
      {/* Password Saat Ini */}
      <InputUseForm
        label={"Password Saat Ini"}
        Icon={RiLockPasswordLine}
        placeholder={"Masukan Password Saat ini"}
        type={hiddenPassword ? "text" : "password"}
        {...registerPw("password")}
      />

      {/* Password Baru */}
      <InputUseForm
        label={"Password Baru"}
        Icon={MdLockReset}
        placeholder={"Masukan Password Baru"}
        type={hiddenPassword ? "text" : "password"}
        {...registerPw("newPassword")}
      />

      {/* Konfirmasi Password */}
      <InputUseForm
        label={"Konfirmasi Password"}
        Icon={RiShieldKeyholeLine}
        placeholder={"Konfirmasi Password Baru"}
        type={hiddenPassword ? "text" : "password"}
        {...registerPw("confirmPassword")}
      />

      <div className="flex justify-end border-t border-neutral-100 pt-5">
        <ButtonCta text={"Update Password"} Icon={FiSave} type={"submit"} />
      </div>
    </form>
  );
}
