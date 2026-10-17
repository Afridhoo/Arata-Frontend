import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerBtn({ text, size, variant, disabled, handleClick }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleClick}
        variant={variant}
        disabled={disabled}
        size={size}
      >
        {disabled && <Spinner data-icon="inline-start" />}
        {text}
      </Button>
    </div>
  );
}
