import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import { LucideInfo } from "lucide-react";
import { Link } from "react-router-dom";
import { UseLoginByGoogle } from "../hooks/useAuth";

export function SignUpShadcn({ register }) {
  const { mutate: LoginByGoogle } = UseLoginByGoogle();

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <div className="p-6 md:p-8">
            <FieldGroup>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Selamat Datang</CardTitle>
                <CardDescription>
                  Silahkan isi semua Input untuk Daftar Akun
                </CardDescription>
              </CardHeader>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Afridho@example.com"
                  {...register("email")}
                  autoComplete="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="text">Nama Lengkap</FieldLabel>
                <Input
                  id="text"
                  type="text"
                  placeholder="Rizaa Afridho"
                  {...register("name")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tel">Telphone</FieldLabel>
                <Input id="tel" type="number" {...register("telphone")} />
                <FieldDescription className=" flex  items-center  gap-1 text-[13px] text-gray-400">
                  <LucideInfo size={10} />
                  Pastikan Anda Memasukan Nomor Aktif
                </FieldDescription>
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      {...register("password")}
                      type="password"
                      autoComplete="new-password"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      {...register("confirmPassword")}
                      type="password"
                      autoComplete="new-password"
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button className={"cursor-pointer"} type="submit">
                  Buat Akun
                </Button>
              </Field>
              <FieldSeparator>Atau Lanjutkan Dengan</FieldSeparator>
              <Field>
                <GoogleLogin
                  onSuccess={(res) =>
                    LoginByGoogle({ credential: res.credential })
                  }
                />
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Sudah Ada Akun? <Link to={"/login"}>Login</Link>
      </FieldDescription>
    </div>
  );
}
