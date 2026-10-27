import { useForm } from "react-hook-form";
import { UseSignUp } from "../hooks/useAuth";

import { chekingUseForm } from "../../../utils/chekingUseForm";

import { SignUpShadcn } from "../components/SignUpShadcn";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import InputOTPForm from "../components/InputOtpForm";
import { useAuth } from "@/utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit, control } = useForm();
  const { mutate: SignUp, isSuccess } = UseSignUp();
  const { user } = useAuth();

  const navigate = useNavigate();
  const [isActiveOtp, setIsActiveOtp] = useState();

  useEffect(() => {
    if (isSuccess) setIsActiveOtp(true);
    if (user) navigate("/");
  }, [isSuccess, user]);

  function onSubmit(value) {
    const chekingIpt = chekingUseForm(value);
    if (!chekingIpt) return;

    const { password, confirmPassword } = value;

    if (password !== confirmPassword)
      return toast.error("Password Tidak Sama", {
        description: "Silahkan Pastikan Password Sama",
      });

    SignUp(value);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isActiveOtp && (
            <SignUpShadcn register={register} setIsActiveOtp={setIsActiveOtp} />
          )}

          {isActiveOtp && (
            <div className="absolute  inset-0 justify-center flex items-center     ">
              <InputOTPForm control={control} setIsActiveOtp={setIsActiveOtp} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
