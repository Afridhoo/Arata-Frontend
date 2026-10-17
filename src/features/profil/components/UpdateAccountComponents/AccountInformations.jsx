import { useForm } from "react-hook-form";
import InputUseForm from "../../../../components/InputUseForm";
import { FiMail, FiPhone, FiSave, FiUser } from "react-icons/fi";
import ButtonCta from "../../../../components/ButtonCta";
import { MdPictureInPicture } from "react-icons/md";

export default function AccountInformations({ User, onSubmit }) {
  const { register: registerInfo, handleSubmit: handleSubmitInfo } = useForm({
    defaultValues: {
      name: User?.name || "",
      email: User?.email || "",
      phone: User?.telphone || "",
    },
  });

  return (
    <form
      onSubmit={handleSubmitInfo(onSubmit)}
      className="space-y-5 p-6 sm:p-7"
    >
      <InputUseForm
        label={"Nama Lengkap"}
        Icon={FiUser}
        placeholder={"Masukan Nama Lengkap"}
        type={"text"}
        {...registerInfo("name")}
      />

      <InputUseForm
        label={"Alamat Email"}
        Icon={FiMail}
        placeholder={"example@gmail.com"}
        type={"text"}
        {...registerInfo("email")}
      />

      <InputUseForm
        label={"Nomor Telphone"}
        Icon={FiPhone}
        placeholder={"Ubah Nomor Telphone"}
        type={"number"}
        defaults={User?.telphone}
        {...registerInfo("telphone")}
      />

      <InputUseForm
        label={"Photo Profil"}
        Icon={MdPictureInPicture}
        type={"file"}
        {...registerInfo("photo")}
      />

      <div className="flex justify-end border-t border-neutral-100 pt-5">
        <ButtonCta text={"Simpan Perubahan"} Icon={FiSave} type={"submit"} />
      </div>
    </form>
  );
}
