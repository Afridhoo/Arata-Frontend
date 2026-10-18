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

import { Link } from "react-router-dom";
import { UseLoginByGoogle } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

export function LoginShadcn({ register }) {
  const { mutate: LoginByGoogle } = UseLoginByGoogle();

  return (
    <div className="flex flex-col gap-6 ">
      <Card >
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Selamat Datang Kembali</CardTitle>
          <CardDescription>
            Silahkan Login untuk Masuk ke Akun kamu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
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
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link className="ml-auto  text-[13px] text-gray-500 hover:text-gray-800 duration-300">
                  Lupa Password ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                autoComplete="current-password"
                placeholder="****"
              />
            </Field>

            <Field>
              <Button type="submit" className={"cursor-pointer"}>
                Login
              </Button>
            </Field>

            <FieldSeparator className="mt-2  text-xs">
              Atau Lanjutkan Dengan
            </FieldSeparator>
            <Field>
              <GoogleLogin
                onSuccess={(res) =>
                  LoginByGoogle({ credential: res.credential })
                }
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <FieldDescription className="text-center">
        Belum Ada Akun? <Link to={"/signup"}>Daftar</Link>
      </FieldDescription>
    </div>
  );
}
