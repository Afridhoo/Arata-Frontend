import { useNavigate } from "react-router-dom";
import { DialogSimpleUse } from "./DialogSimpleUse";

export default function CtaUserNeedLogin({ text }) {
  const navigate = useNavigate();
  return (
    <DialogSimpleUse
      title={"Anda Belum Login"}
      desc={
        "Silahkan Login Dahulu ,Jika Belum Ada Akun Silahkan Daftar"
      }
      btnText={text}
      textSubmit={"Login"}
      onSucsess={() => navigate("/login")}
    />
  );
}
