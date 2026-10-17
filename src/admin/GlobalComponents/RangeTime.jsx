import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RangeTime({ schedule, _id, setTime, time, text }) {
  function handlePlusTime(value) {
    const { _id, value: number } = value;
    const { index } = number;

    const getTimeState = time?.find((e) => e._id === _id);
    const { schedule: list } = getTimeState;
    const getTimeUpdate = list?.find((e) => e.index === index);
    const { defaultIdx } = getTimeUpdate;

    const formatNewTime = list?.map((e) =>
      e?.index === index ? { ...e, defaultIdx: defaultIdx + 1 } : e,
    );

    setTime((t) =>
      t?.map((e) => (e._id === _id ? { ...e, schedule: formatNewTime } : e)),
    );
  }

  function handleAddTime(value) {
    const { index, value: valueTime, _id, idxTime, labelTime } = value;

    const getTime = time?.find((e) => e._id === _id);
    const { schedule: list } = getTime;

    const valuePush = { valueTime, idxTime, labelTime };

    const formatTimeIsRady = list?.map((el) => {
      const checkNested = el.nestedTime?.some(
        (e) => e.idxTime === idxTime && e.labelTime === labelTime,
      );

      const checkIdx = el.index === index;

      return {
        ...el,

        nestedTime:
          checkNested && checkIdx
            ? el.nestedTime?.map((e) =>
                e.idxTime === idxTime && e.labelTime === labelTime
                  ? { ...e, ...valuePush }
                  : e,
              )
            : checkIdx
              ? [...el.nestedTime, valuePush]
              : el.nestedTime,
      };
    });

    setTime((t) =>
      t?.map((e) => (e._id === _id ? { ...e, schedule: formatTimeIsRady } : e)),
    );
  }

  function handleText(data) {
    const { _id, idxTime, index } = data;

    const getTime = time.find((s) => s._id === _id);

    if (!getTime.text)
      return setTime((s) =>
        s.map((x) => (x._id === _id ? { ...x, text: [data] } : x)),
      );

    const { text } = getTime || [];
    const check = text.find((s) => s.idxTime === idxTime && s.index === index);

    if (check) {
      const formatText = text?.map((s) =>
        s.idxTime === idxTime && s.index === index ? data : s,
      );
      setTime((s) =>
        s.map((x) => (x._id === _id ? { ...x, text: formatText } : x)),
      );
    } else {
      setTime((s) =>
        s.map((x) => (x._id === _id ? { ...x, text: [...x.text, data] } : x)),
      );
    }
  }

  return (
    <div>
      {schedule?.map((e, i) => {
        return (
          <Field key={i}>
            <div className="p-4 pl-0 flex items-center gap-4 ">
              <div className="flex items-center gap-3 ">
                {Array.from({ length: e?.defaultIdx })?.map((_, index) => (
                  <>
                    <span>
                      <FieldLabel htmlFor="time-picker-optional">
                        Jam Mulai
                      </FieldLabel>

                      <Input
                        type="time"
                        className="appearance-none bg-background"
                        defaultValue={
                          e.nestedTime?.find(
                            (s) =>
                              s.idxTime === index &&
                              s.labelTime === "startTime",
                          )?.valueTime
                        }
                        onChange={(data) =>
                          handleAddTime({
                            value: data.target.value,
                            index: i,
                            idxTime: index,
                            labelTime: "startTime",
                            _id,
                          })
                        }
                      />
                    </span>
                    <span>
                      <FieldLabel htmlFor="time-picker-optional">
                        Jam Selesai
                      </FieldLabel>
                      <Input
                        type="time"
                        defaultValue={
                          e.nestedTime?.find(
                            (s) =>
                              s.idxTime === index && s.labelTime === "endTime",
                          )?.valueTime
                        }
                        className="appearance-none bg-background"
                        onChange={(data) =>
                          handleAddTime({
                            value: data.target.value,
                            index: i,
                            idxTime: index,
                            labelTime: "endTime",
                            _id,
                          })
                        }
                      />
                    </span>
                    <span>
                      <FieldLabel htmlFor="time-picker-optional">
                        Keterangan
                      </FieldLabel>
                      <Input
                        type={"text"}
                        defaultValue={
                          text.find((s) => s.index === i && s.idxTime === index)
                            ?.value
                        }
                        onChange={(text) =>
                          handleText({
                            value: text.target.value,
                            index: i,
                            idxTime: index,
                            _id,
                          })
                        }
                        className={"w-[150px]"}
                      />
                    </span>
                  </>
                ))}
              </div>

              <Button
                variant="secondary"
                className={"cursor-pointer mt-4"}
                onClick={() => handlePlusTime({ value: e, _id })}
              >
                +
              </Button>
            </div>
          </Field>
        );
      })}
    </div>
  );
}
