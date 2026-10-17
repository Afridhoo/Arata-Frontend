import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function HoverCardUse({ Render, RenderText }) {

  return (
    <HoverCard >
      <HoverCardTrigger delay={10} closeDelay={100} render={Render}  />
      <HoverCardContent className="flex max-w-sm w-fit py-2 px-2 flex-col gap-0.5 ">
        {/* <div className="font-semibold">@nextjs</div> */}
        <div className="mt-1 text-xs text-muted-foreground font-semibold">{RenderText}</div>
        {/* <div className="mt-1 text-xs text-muted-foreground">
          Joined December 2021
        </div> */}
      </HoverCardContent>
    </HoverCard>
  );
}
