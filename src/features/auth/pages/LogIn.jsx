import { useForm } from "react-hook-form";

import { chekingUseForm } from "../../../utils/chekingUseForm";
import { UseSignIn } from "../hooks/useAuth";

import { LoginShadcn } from "../components/LoginShadcn";

export default function LogIn() {
  const { register, handleSubmit } = useForm();
  const { mutate: SignIn, isPending } = UseSignIn();

  function onSubmit(value) {
    const chekingIpt = chekingUseForm(value);
    if (!chekingIpt) return;
    SignIn(value);
  }

  return (
    <div className="flex    flex-col items-center justify-center gap-6 bg-muted p-6 md:p-20">
      <div className="flex w-full  max-w-sm flex-col gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginShadcn register={register} isPending={isPending} />
        </form>
      </div>
    </div>
  );
}
