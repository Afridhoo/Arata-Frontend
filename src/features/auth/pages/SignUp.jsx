import { useForm } from "react-hook-form";
import { UseSignUp } from "../hooks/useAuth";

import { chekingUseForm } from "../../../utils/chekingUseForm";

import { SignUpShadcn } from "../components/SignUpShadcn";
import { toast } from "sonner";
import NewLoading from "@/components/loading/NewLoading";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const { mutate: SignUp, isPending } = UseSignUp();

  if (isPending) return <NewLoading />;

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
          <SignUpShadcn register={register} />
        </form>
      </div>
    </div>
  );
}
