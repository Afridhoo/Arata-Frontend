import { UseGetMe, UseUpdatePassword } from "../../auth/hooks/useAuth";
import { FiLock, FiEdit3, FiEyeOff, FiEye } from "react-icons/fi";
import { chekingUseForm } from "../../../utils/chekingUseForm";
import { useState } from "react";
import AccountInformations from "../components/UpdateAccountComponents/AccountInformations";
import UpdatePassword from "../components/UpdateAccountComponents/UpdatePassword";
import FormLayout from "../components/UpdateAccountComponents/FormLayout";
import { UseUpdateProfil } from "../hooks/UseUser";

import NewLoading from "@/components/loading/NewLoading";

export default function UpdateAccount() {
  const { data: User } = UseGetMe();
  const { mutate: UpdatePw, isPending: passPending } = UseUpdatePassword();
  const { mutate: UpdateProfil, isPending: profilPending } = UseUpdateProfil();

  const [eye, setEye] = useState(false);
  const IconEye = eye ? FiEye : FiEyeOff;

  if (passPending || profilPending) return <NewLoading />;

  function onSubmitInfo(values) {
    const value = new FormData();
    const arrVal = Object.entries(values);

    arrVal.forEach(([key, val]) => {
      if (key !== "photo" && val !== "") value.append(key, val);
    });
    value.append("photo", values.photo?.[0]);

    UpdateProfil({ value });
  }

  function handleSetEye() {
    setEye((eye) => !eye);
  }

  function onSubmitPw(value) {
    const chekingIpt = chekingUseForm(value, "UpdatePassword");

    if (chekingIpt) UpdatePw(value);
  }

  return (
    <div className="flex flex-wrap justify-center items-start gap-10">
      <FormLayout
        User={User}
        onSubmit={onSubmitInfo}
        Form={AccountInformations}
        Icon={FiEdit3}
      />

      <FormLayout
        User={User}
        onSubmit={onSubmitPw}
        Form={UpdatePassword}
        Icon={FiLock}
        password={true}
        hiddenPassword={eye}
        title={"Informasi Password"}
        desc={"Password Akun Anda"}
        handleHidden={handleSetEye}
        IconHidden={IconEye}
      />
    </div>
  );
}
