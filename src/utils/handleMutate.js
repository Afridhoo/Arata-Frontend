import { toast } from "@/components/ui/toast";

export default function handleMutate({
  mutate,
  value,
  loading,
  sucsess,
  error,
}) {
  return toast.promise(mutate({ value }), {
    loading: loading,
    success: sucsess,
    error: error,
  });
}
