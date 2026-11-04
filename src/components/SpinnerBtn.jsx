import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerBtn({
  text,
  size,
  variant,
  disabled,
  handleClick,
  type,
  classNameBtn,
}) {
  return (
    <div className="flex flex-col items-center gap-4  ">
      <Button
        className={classNameBtn}
        onClick={handleClick}
        variant={variant}
        disabled={disabled}
        size={size}
        type={type || "button"}
      >
        {disabled && <Spinner data-icon="inline-start" />}
        {text}
      </Button>
    </div>
  );
}
