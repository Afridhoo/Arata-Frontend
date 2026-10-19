import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AvatarSimpleUse from "./AvatarSimpleUse";
import { formatDateId } from "@/utils/convertDate";
import BadgePerStatusLocations from "./BadgePerStatusLocations";

export function AccordionLocationsInDrawer({ locations, noDesc }) {
  return (
    <Accordion className="max-w-lg ">
      {locations.map((el, idx) => {
        const { description, image, address, date, _id, status } = el || {};
        const { from, to } = date || {};

        return (
          <AccordionItem
            value={_id}
            key={_id}
            className=" border-b px-4 last:border-b-0"
          >
            <AccordionTrigger
              className={"cursor-pointer flex gap-2 items-center"}
            >
              <span className="text-gray-400 font-bold text-xs">{idx + 1}</span>

              <span>{description}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <div className="flex gap-3 pt-3">
                  <AvatarSimpleUse
                    isActive={true}
                    noBage={true}
                    photo={image}
                  />
                  <div className="grid gap-1">
                    {!noDesc && (
                      <span className="text-xs text-gray-600">{address}</span>
                    )}
                    <div className="mt-3 gap-2 flex items-center">
                      <BadgePerStatusLocations status={status} />
                      <span className=" font-semibold text-xs">
                        {formatDateId(from, true)} - {formatDateId(to, true)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
