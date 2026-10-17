import { FormProvider, get, useForm } from "react-hook-form";
import { FiMapPin } from "react-icons/fi";

import { useState } from "react";
import ListLocations from "./ListLocations";
import Popup from "../../../components/Popup";
import { toast } from "sonner";

import { differenceInDays } from "date-fns";

import SubmitBtn from "../SimpleComponentes/SubmitBtn";
import Header from "../SimpleComponentes/Header";
import NavbarPopup from "../SimpleComponentes/NavbarPopup";

export default function PopupUpdateDateGuide({
  value,
  onCancel,
  handleUpdate,
}) {
  const {
    locations,
    GetCategories,
    _id,
    guideAssigned,
    name,
    startLocation,
    imageCover,
    categories: startLocCategories,
  } = value;

  const methods = useForm({ defaultValues: { guide: [] } });
  const { register, handleSubmit, resetField } = methods;

  const { destination, hotel } = locations;

  const [dest, setDest] = useState(destination);
  const [isActiveEditGuide, setIsActiveEditGuide] = useState(null);
  const [isActivePopup, setIsActivePopup] = useState(null);

  const concatVal = [...destination, ...hotel, { _id, ...startLocation }];
  const getOldDate = concatVal
    ?.map((s) => ({ _id: s._id, date: s.date }))
    ?.filter((s) => s.date);

  

  const getOldTime = concatVal?.map((s) => s.time)?.filter((s) => s);

  const [date, setDate] = useState(getOldDate);
  const [time, setTime] = useState(getOldTime);
  const [timeStartLoc, setTimeStart] = useState(startLocation?.time || []);

  function handleSetDate(value) {
    const { date: newDate, _id } = value;

    const { from, to } = newDate || {};

    const check = date?.find((e) => e._id === _id);
    const getLengthDate = differenceInDays(new Date(to), new Date(from)) + 1;

    const formatTime = Array.from({ length: getLengthDate })?.map((_, i) => ({
      defaultIdx: 1,
      index: i,

      nestedTime: [],
    }));

    if (!check) {
      setDate((d) => [...d, value]);
      setTime((t) => [...t, { _id, schedule: formatTime }]);
      return;
    }

    setDate((t) =>
      t?.map((e) => (e._id === _id ? { ...e, date: newDate } : e)),
    );
    setTime((t) =>
      t?.map((e) => (e._id === _id ? { ...e, schedule: formatTime } : e)),
    );
  }

  const getCandidateGuide = dest.map((el) => el.candidateGuides);
  const chekingAllGuides = getCandidateGuide.every((el) => el.length > 0);
  const checkGuideAssingn = guideAssigned.length > 0;

  const formatAssGuide = guideAssigned?.map((el) => ({
    ...el,
    activeDestination: el.destinationHandle,
  }));

  function onSubmit(data) {
    if (!chekingAllGuides && !checkGuideAssingn)
      return toast.error(
        "Pemandu Tidak Tersedia di salah satu atau lebih wisata ",
      );

    const {
      destinationId,
      guide,
      startLocation: startLocationdateId,
      hotelId,
    } = data;

    const getDate = (id) =>
      date
        ?.filter((e) => id?.includes(e._id))
        ?.map((e) => ({
          ...e,
          time: time?.find((t) => t._id === e._id),
        }));

    const checkDateIsValid = (val, check) =>
      val?.length !== check?.filter((e) => e?.date)?.length;

    const getStartDate = getDate(startLocationdateId);
    const destinationDate = getDate(destinationId);
    const hotelDate = getDate(hotelId);

    const checkDestDate = checkDateIsValid(
      [...destinationId, ...hotelId],
      [...destinationDate, ...hotelDate],
    );

    if (checkDestDate && !checkGuideAssingn)
      return toast.error("Tanggal Wisata Atau Hotel Belum Dipilih", {
        description: "Pastikan Semua Tanggal Wisata dan Hotel Sudah Dipilih",
      });

    if (!getStartDate[0]?.date && !checkGuideAssingn)
      return toast.error("Tanggal Keberangkatan Tour Belum Dipilih", {
        description: "Pastikan Tanggal Keberangkatan Sudah Dipilih",
      });

    const getGuide = guide
      ?.map((el) => el.split("|"))
      ?.map((el) => ({
        idGuide: el[0],
        destination: el[1],
      }));

    const getNewDestHandle = getGuide?.map((el) => el.destination);
    const getNewGuideHandle = getGuide?.map((el) => el.idGuide);
    const checkGuideNotAdd = dest?.filter(
      (el) => !getNewDestHandle.includes(el._id),
    );
    const checkGuideDelete = guideAssigned?.filter(
      (el) => !getNewGuideHandle.includes(el._id),
    );
    const getName = checkGuideDelete?.map((el) => el.name).join(",");
    const getId = checkGuideDelete?.map((el) => el._id);
    if (!checkGuideAssingn && checkGuideNotAdd.length > 0)
      return toast.error("Anda Belum Memilih Guide Per Destinasi Wisata");

    const FormatNewGuide = Object.values(
      getGuide.reduce((acc, cur) => {
        if (!acc[cur.idGuide])
          acc[cur.idGuide] = { _id: cur.idGuide, destination: [] };
        acc[cur.idGuide].destination.push(cur.destination);
        return acc;
      }, {}),
    );

    const formatValue = {
      dateDestination: destinationDate,
      dateHotel: hotelDate,
      guide: FormatNewGuide,
      nameTour: name,
      startLocation: getStartDate[0] || null,
      timeStart: timeStartLoc,
      idDeleteGuide: isActiveEditGuide ? getId : [],
    };

    if (isActiveEditGuide && checkGuideDelete.length > 0)
      setIsActivePopup({ getName, formatValue });
    else handleUpdate(formatValue, _id);
  }

  function handleDeleteGuide() {
    const formatValue = isActivePopup.formatValue;
    handleUpdate(formatValue, _id);
  }

  function handleEditGuide() {
    const addOldGuide = destination.map((el) => ({
      ...el,
      guideAssigned: formatAssGuide.filter((guide) =>
        guide.skillGuide.includes(el.categories),
      ),
    }));

    setDest(addOldGuide);
    setIsActiveEditGuide(true);
    toast.info(
      "Guide Yang Terdaftar Sudah di Tambahkan Ke dalam list  , silahkan edit",
    );
  }

  function handleCancelEditGuide() {
    setIsActiveEditGuide(false);
    setDest(destination);
    toast.info("Batal Mengedit Guide");
    resetField("guide");
  }

  function handleStartLocTime(val) {
    const { label } = val;
    const check = timeStartLoc.some((s) => s.label === label);

    if (check) setTimeStart((s) => s.map((x) => (x.label === label ? val : x)));
    else setTimeStart((s) => [...s, val]);
  }

  return (
    <div className="fixed inset-0 z-[50]">
      {isActivePopup && (
        <Popup
          title={"Menghapus Guide Yang Sudah Di Tugaskan"}
          message={`Apakah Anda Yakin Ingin Membatalkan Tugas Pemandu Dengan Nama ${isActivePopup?.getName}`}
          onCancel={() => setIsActivePopup(null)}
          onConfirm={handleDeleteGuide}
        />
      )}

      <div className=" w-full  transform overflow-hidden rounded-2xl border  bg-white shadow-2xl transition-all flex flex-col max-h-screen">
        <NavbarPopup value={value} onCancel={onCancel} />

        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          <Header
            guideAssigned={guideAssigned}
            checkGuideAssingn={checkGuideAssingn}
            isActiveEditGuide={isActiveEditGuide}
            handleEditGuide={handleEditGuide}
            handleCancelEditGuide={handleCancelEditGuide}
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3   flex gap-12 mb-10 ">
                <div>
                  <ListLocations
                    el={{
                      ...startLocation,
                      _id,
                      categories: startLocCategories,
                    }}
                    idx={0}
                    setStartLocTime={handleStartLocTime}
                    startLocTime={timeStartLoc}
                    nameRegister={"startLocation"}
                    register={register}
                    imageStartLocation={imageCover}
                    dataCategories={GetCategories}
                    setDate={handleSetDate}
                    date={date}
                  />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <FiMapPin className="text-emerald-600" />
                Rencana Tanggal Keberangkatan Ke Hotel
              </h4>
              <div className="space-y-3  flex gap-12 flex-wrap mb-10">
                {hotel?.map((hotel, idx) => (
                  <div key={idx}>
                    <ListLocations
                      setDate={handleSetDate}
                      date={date}
                      el={hotel}
                      idx={idx}
                      setTime={setTime}
                      dataCategories={GetCategories}
                      register={register}
                      nameRegister={"hotelId"}
                      time={time}
                    />
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <FiMapPin className="text-emerald-600" />
                Rencana Tanggal Keberangkatan & Pemandu
              </h4>

              <div className="space-y-3  flex gap-12 flex-wrap ">
                {dest?.map((dest, idx) => {
                  const { candidateGuides } = dest;
                  const { guideAssigned } = dest;

                  const handleChecking = (val) => val?.length > 0;

                  const guide = [
                    ...(candidateGuides || []),
                    ...(guideAssigned || []),
                  ];

                  return (
                    <ListLocations
                      el={dest}
                      idx={idx}
                      time={time}
                      register={register}
                      nameRegister={"destinationId"}
                      textDisplay={"Destinasi Wisata"}
                      dataCategories={GetCategories}
                      setDate={handleSetDate}
                      date={date}
                      setTime={setTime}
                      displayGuide={
                        handleChecking(candidateGuides) ||
                        handleChecking(guideAssigned)
                          ? guide
                          : false
                      }
                    />
                  );
                })}
              </div>

              <SubmitBtn onCancel={onCancel} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
