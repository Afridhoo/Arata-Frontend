import { Button } from "./ui/button";

export default function ButtonCta({ text, disabled = false, Icon, type }) {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={"cursor-pointer"}
      variant="outline"
    >
      <Icon className="text-base" />
      {text}
    </Button>
  );
}
