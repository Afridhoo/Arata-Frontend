import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateId } from "@/utils/convertDate";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import AvatarSimpleUse from "./AvatarSimpleUse";
import BadgePerStatusLocations from "./BadgePerStatusLocations";
import { eachDayOfInterval } from "date-fns";
import { useState } from "react";

export function AccordionListTourLocations({ locations }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const getValid = [...(locations || [])]?.sort(
    (a, b) =>
      new Date(a.date.from)?.getTime() - new Date(b.date.from)?.getTime(),
  );

  const getSchedule = getValid?.map((s) => ({
    _id: s._id,
    dataSchedule: s.time?.schedule?.map((z) =>
      Object.values(
        z?.nestedTime.reduce((acc, cur) => {
          const { idxTime, labelTime, valueTime } = cur;
          const getText = s.time?.text?.find(
            (q) => q?.idxTime === idxTime && z?.index === q?.index,
          );

          if (!acc[idxTime])
            acc[idxTime] = { _id: getText._id, time: [], text: getText.value };

          acc[idxTime].time.push({ labelTime, valueTime });
          return acc;
        }, {}),
      ),
    ),
  }));

  const getOnGoing = getValid?.find((e) => e?.status === "ongoing");

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>List Perjalanan Tour</CardTitle>
        <CardDescription>
          Detail Lengkap Dari Nama Lokasi Dan Tanggal Keberangkatan - Selesai
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={getOnGoing?._id}>
          {getValid.map((item, idx) => {
            const {
              _id,
              date,
              description,
              typeLocation,
              image,
              address,
              dateFinished,
              startDate,
              status,
            } = item || {};
            const { from, to } = date || {};

            const getValidSchedule = getSchedule.find(
              (s) => s._id === _id,
            )?.dataSchedule;

            const getDateRange = eachDayOfInterval({
              start: new Date(from),
              end: new Date(to),
            });

            const checkActive = activeAccordion === _id;

            return (
              <AccordionItem
                key={idx}
                value={_id}
                className={"p-2 pl-0 border-none"}
              >
                <AccordionTrigger
                  className={"flex items-center gap-6 cursor-pointer"}
                  onClick={() => setActiveAccordion(_id)}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`${checkActive ? "text-gray-700 font-bold" : "text-gray-500"} `}
                    >
                      {typeLocation === "destination" ? "Wisata" : "Akomodasi"}
                    </span>
                    <span> {description} </span>
                  </div>

                  {getOnGoing && (
                    <span>
                      <BadgeSimpleUse
                        variant={
                          getOnGoing?._id === _id ? "default" : "outline"
                        }
                        desc={`${formatDateId(from, true)} -  ${formatDateId(to, true)} `}
                      />
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent
                  className={"flex items-center gap-2 p-5 pl-0"}
                >
                  <div>
                    <AvatarSimpleUse
                      photo={image}
                      isActive={true}
                      noBage={true}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="grid max-w-[300px] gap-1">
                      <span className="font-bold text-sm text-gray-700">
                        {description}
                      </span>
                      <span className="text-gray-400 font-semibold  text-xs">
                        {address}
                      </span>
                    </div>
                    <div className="grid gap-1">
                      {dateFinished ? (
                        <BadgePerStatusLocations
                          renderText={` Mulai ${formatDateId(startDate, true)} - Selesai ${formatDateId(dateFinished)}`}
                          status={status}
                        />
                      ) : (
                        <BadgePerStatusLocations status={status} />
                      )}
                    </div>
                  </div>
                </AccordionContent>

                <AccordionContent>
                  {getValidSchedule?.map((data, idx) => {
                    return (
                      <div key={idx} className=" p-3 pl-0 pb-3  ">
                        <div className="flex items-center gap-4">
                          <span className="text-lg">
                            {formatDateId(getDateRange[idx], true, true)}
                          </span>
                          <div className="grid gap-1 items-center font-semibold">
                            <span className="font-semibold">
                              Hari {idx + 1}
                            </span>

                            <span className="font-medium text-gray-600 ">
                              {data?.length} Perjalanan
                            </span>
                          </div>
                        </div>

                        <div className="flex  items-center gap-5  border-b border-gray-200 pb-3">
                          {data?.map((x, idx) => {
                            const { time, text } = x;

                            return (
                              <div
                                key={idx}
                                className="flex gap-3 mb-3 mt-5 items-center"
                              >
                                <span className="font-semibold text-xs text-gray-500">
                                  {idx + 1}
                                </span>

                                <div className="grid gap-1 ">
                                  <span className="text-[15px]">{text}</span>

                                  <div className="flex items-center  gap-2">
                                    {time?.map((a) => (
                                      <div className="text-[13px] text-gray-600">
                                        <span>
                                          {a.labelTime === "startTime"
                                            ? "Mulai "
                                            : " Selesai "}
                                        </span>

                                        <span>{a.valueTime}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
