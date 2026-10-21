import { LucideX, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

export default function InputOTPForm({ control, setIsActiveOtp }) {
  return (
    <Card className="mx-auto max-w-md relative">
      <CardHeader>
        <CardTitle>Verifikasi Login Anda</CardTitle>
        <CardDescription>
          Silahkan cek kode OTP yang sudah Dikirim Ke email anda
        </CardDescription>

        <span
          onClick={() => setIsActiveOtp(false)}
          className="absolute right-5 cursor-pointer"
        >
          <LucideX size={17} />
        </span>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verfikasi OTP</FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Kirim Ulang Code
            </Button>
          </div>
          <Controller
            control={control}
            name="otpUser"
            render={({ field }) => (
              <InputOTP maxLength={6} id="otp-verification" {...field} required>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          <FieldDescription>
            Pastikan Memasukan Kode OTP yang benar
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Ada Masalah Saat Register ?
            <Link
              to={"/services"}
              className="underline pl-1 underline-offset-4 transition-colors hover:text-primary"
            >
               Hubungi Admin
            </Link>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
