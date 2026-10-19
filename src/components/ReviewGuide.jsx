import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

import { LucideCheck, LucideStarX, Star } from "lucide-react";
import { AvatarPlus } from "./AvatarPlus";
import { useForm } from "react-hook-form";

import { DialogUseSubmit } from "./DialogUseSubmit";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import { DialogDelete } from "./DialogDelete";
import {
  UseDeleteReviewGuide,
  UsePostReviewGuide,
} from "@/features/TripMe/UseGetTripMe";
import NewLoading from "./loading/NewLoading";
import { UseGetMe } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export default function ReviewGuide({
  guide,
  idTour,
  dataGuideIsReview,
  idBooking,
  idDoc,
  checkTourNotOnGoing,
}) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: DeleteReviewGuide, isPending } = UseDeleteReviewGuide(idDoc);
  const { mutate: InsertReviewGuide, isPending: loadPost } =
    UsePostReviewGuide(idDoc);

  const { data: dataMe } = UseGetMe();

  function handlePostReviewGuide(value) {
    const finalFormat = value?.map((el) => ({
      ...el,
      user: dataMe?._id,
      tour: idTour,
      booking: idBooking,
    }));

    InsertReviewGuide({ value: finalFormat });
  }

  const getDefaultRating = dataGuideIsReview?.map((el) => ({
    id: el.guide,
    num: el.rating,
  }));

 

  const [isActiveStar, setIsActiveStar] = useState(
    getDefaultRating?.length > 0 ? getDefaultRating : [],
  );

  const defaultCheking = getDefaultRating.length === 0;

  useEffect(() => {
    if (defaultCheking) return;
    setIsActiveStar(getDefaultRating);
  }, [dataGuideIsReview]);

  if (isPending || loadPost) return <NewLoading />;

  function handleDeleteReview(idGuide) {
    DeleteReviewGuide({ id: [idGuide, idBooking] });
  }

  function handleReview(data) {
    if (!checkTourNotOnGoing()) return;
    const getVal = Object.entries(data);
    const cheking = getVal.filter((el) => el[1]);

    const format = cheking?.map((el) => {
      const getRating = isActiveStar.find((e) => e.id === el[0])?.num;

      return {
        message: el[1],
        guide: el[0],
        rating: getRating,
        name: guide.find((e) => e?.identity?._id === el[0])?.identity?.name,
        ratingType: getRating <= 3 ? "bad" : "nice",
      };
    });

    if (format?.length !== isActiveStar?.length)
      return toast.error("Gagal Memberikan Review", {
        description: "Silahkan Isi Rating Dan Juga Review Nya",
      });

    handlePostReviewGuide(format);
    reset();
  }

  function handleClickStar(value) {
    if (!checkTourNotOnGoing()) return;
    const { id, num } = value;

    const cheking = isActiveStar?.find((el) => el.id === id);

    if (num === cheking?.num) {
      setIsActiveStar((s) => s.filter((e) => e.id !== id));
    } else {
      if (!cheking) setIsActiveStar((s) => [...s, value]);
      if (cheking)
        setIsActiveStar((s) =>
          s?.map((e) => (e.id === cheking.id ? { ...e, num: num } : e)),
        );
    }
  }

  return (
    <section className="py-10 ">
      <div className="grid gap-2 items-center">
        <div>
          <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
            <span>Data Anda Kami Privasi</span>
          </h2>
          <span className="text-[26px] font-bold ">Berikan Review Pemandu</span>
        </div>

        <div>
          {dataGuideIsReview?.length > 0 ? (
            <BadgeSimpleUse icon={<LucideCheck />} desc={"Review Diberikan"} />
          ) : (
            <BadgeSimpleUse
              icon={<LucideStarX />}
              desc={"Review Belum Diberikan"}
            />
          )}
        </div>
      </div>

      <form id="reviewGuide" onSubmit={handleSubmit(handleReview)}>
        <div className="flex  max-w-full overflow-x-auto  mt-10 items-center gap-10">
          {guide?.map((el, idxG) => {
            const { name, photo, _id } = el.identity;

            return (
              <div className="max-w-2xl" key={idxG}>
                <div
                  className={`${dataGuideIsReview.length > 0 ? "mt-14" : ""}   flex justify-center relative`}
                >
                  <AvatarPlus img={photo} />

                  {dataGuideIsReview.length > 0 &&
                    dataGuideIsReview?.find((e) => e.guide === _id) && (
                      <span className="absolute -mt-13">
                        <DialogDelete
                          text={"Hapus Review"}
                          title={`Menghapus Review Pemandu ${name}`}
                          desc={
                            "Apakah Anda Yakin Ingin Menghapus Review Yang Telah Anda Buat ?"
                          }
                          defaultVariant={"outline"}
                          onSubmit={() => handleDeleteReview(_id)}
                        />
                      </span>
                    )}
                </div>
                <span>
                  <p className=" max-w-full truncate text-center mt-2 pb-2 border-b border-gray-200">
                    
                    

                    {name}
                    
                  </p>
                </span>

                <div className="flex items-center gap-2 mt-3 justify-center">
                  <span className="text-sm hidden md:flex font-medium text-gray-500">
                    Berikan Penilaian
                  </span>
                  <span className="text-sm flex font-semibold text-gray-700">
                    {isActiveStar?.find((e) => e.id === _id)?.num || 0}/5
                  </span>
                </div>

                <div className="flex   justify-center items-center gap-1 mb-6 mt-2">
                  {[1, 2, 3, 4, 5].map((_, idx) => {
                    const checkStar =
                      idx + 1 <= isActiveStar?.find((e) => e.id === _id)?.num;
                    return (
                      <Star
                        key={idx}
                        onClick={() =>
                          handleClickStar({ num: idx + 1, id: _id })
                        }
                        size={20}
                        strokeWidth={1.8}
                        onMouseLeave={() => setIsActiveStar(isActiveStar)}
                        fill={`${checkStar ? "orange" : "white"}`}
                        className={`text-muted-foreground  hover:fill-orange-400 cursor-pointer `}
                      />
                    );
                  })}
                </div>

                <Textarea
                  placeholder="Ceritakan pemandu kami , data anda kami privasi..."
                  className="md:min-h-[100px] h-10 w-30 m-auto md:m-0 md:w-[200px] resize-none  text-center md:pt-7 border-gray-400"
                  {...register(_id)}
                  defaultValue={
                    dataGuideIsReview.length > 0
                      ? dataGuideIsReview?.find((e) => e.guide === _id)?.message
                      : ""
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="mt-10  flex justify-left">
          <DialogUseSubmit
            desc={"Apakah Anda Yakin Ingin Memberikan Review Ke Pemandu"}
            title={"Data Anda Kami Privasi"}
            formId={"reviewGuide"}
            textBtn={"Kirim Review"}
          />
        </div>
      </form>
    </section>
  );
}
