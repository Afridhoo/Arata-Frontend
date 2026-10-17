import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";

export function EmptySimpleUse({
  mt = 40,
  title,
  icon,
  desc,
  btnText,
  link,
  onClick,
}) {
  const navigate = useNavigate();

  return (
    <Empty className={`mt-${mt}`}>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{desc}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {onClick && (
          <Button className={"cursor-pointer"} onClick={onClick} size="sm">
            {btnText}
          </Button>
        )}

        {link && (
          <Button
            className={"cursor-pointer"}
            onClick={() => navigate(link)}
            size="sm"
          >
            {btnText}
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
