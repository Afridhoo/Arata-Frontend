"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({ value }) {
  return (
    <div className="grid grid-cols-1  gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {value?.map((el, idx) => (
        <Card key={idx} className="@container/card" size="sm">
          <CardHeader>
            <CardDescription>{el.title}</CardDescription>
            <CardTitle className="text-2xl  font-semibold tabular-nums @[250px]/card:text-3xl">
              {el.val}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {<el.icon />}
                {el.subValue}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium items-center">
              <el.footerIcon className="size-4" />
              {el.footerTitle}
            </div>
            <div className="text-muted-foreground">{el.footerDesc}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
