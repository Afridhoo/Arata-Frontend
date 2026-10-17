import { cn } from "cn";
import { LoaderIcon } from "lucide-react";

function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}


export default function NewLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="size-6 animate-spin"
      />
    </div>
  );
}
