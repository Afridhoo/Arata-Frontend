import { LucideCheck, LucideStarX, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import { DialogSimpleUse } from "./DialogSimpleUse";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import { DialogDelete } from "./DialogDelete";
import {
  UseCreateReview,
  UseDeleteReview,
} from "@/features/review/hooks/useReview";
import NewLoading from "./loading/NewLoading";
import { UseGetMe } from "@/features/auth/hooks/useAuth";
import AccordionUse from "./AccordionUse";
import { DataAccordionActiveTrip } from "./DataAccordion";

export default function Review({
  idTour,
  dataIsReview,
  idBooking,
  idDoc,
  checkTourNotOnGoing,
  activeAccordion,
}) {
  const { mutate: DeleteReview, isPending } = UseDeleteReview(idDoc);
  const { mutate: InsertReview, isPending: loadPost } = UseCreateReview(idDoc);
  const { data: dataMe } = UseGetMe();

  function handlePostReview(value) {
    InsertReview({ value: value });
  }

  const { message, rating, _id } = dataIsReview || {};
  const [isActiveStar, setIsActiveStar] = useState(rating || 0);
  const [review, setReview] = useState(message || "");

  useEffect(() => {
    if (message && rating) {
      setIsActiveStar(rating);
      setReview(message);
    } else {
      setIsActiveStar(0);
      setReview("");
    }
  }, [dataIsReview]);

  if (isPending || loadPost) return <NewLoading />;

  function handleDeleteReview() {
    DeleteReview({ id: _id });
  }

  function handleReview() {
    if (!checkTourNotOnGoing()) return;
    const format = {
      tour: idTour,
      message: review,
      rating: isActiveStar,
      ratingType: isActiveStar <= 3 ? "bad" : "nice",
      user: dataMe._id,
      booking: idBooking,
    };

    handlePostReview(format);
  }

  return (
    <section className="py-10 flex gap-40 ">
      <div>
        <div>
          <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
            <span>Review Perjalanan</span>
          </h2>
          <span className="text-[26px] font-bold ">Review Perjalanan</span>
        </div>

        <div>
          {message || rating ? (
            <span className="flex items-center gap-3 mt-2">
              <BadgeSimpleUse
                icon={<LucideCheck />}
                desc={"Review Diberikan"}
              />
              <DialogDelete
                text={"Hapus Review"}
                title={"Menghapus Review Tour"}
                desc={
                  "Apakah Anda Yakin Ingin Menghapus Review Yang Telah Anda Buat ?"
                }
                defaultVariant={"outline"}
                onSubmit={handleDeleteReview}
              />
            </span>
          ) : (
            <span className="flex items-center gap-3 mt-2">
              <BadgeSimpleUse
                icon={<LucideStarX />}
                desc={"Review Belum Diberikan"}
              />
            </span>
          )}
        </div>

        <div className="max-w-full    ">
          <div>
            <div className="flex items-center gap-1 mb-6 mt-6">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <Star
                  key={idx}
                  onClick={() => setIsActiveStar(idx + 1)}
                  size={20}
                  strokeWidth={1.8}
                  onMouseLeave={() => setIsActiveStar(isActiveStar)}
                  fill={`${idx + 1 <= isActiveStar ? "orange" : "white"}`}
                  className={`text-muted-foreground  hover:fill-orange-400 cursor-pointer `}
                />
              ))}
            </div>

            <Textarea
              placeholder="Ceritakan pengalaman Anda selama perjalanan..."
              className="md:min-h-[120px] h-20 w-50 md:w-[400px] max-w-[550px]   resize-none  md:p-6 pl-2 pb-0  border-gray-400"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="mt-10 flex justify-start">
              <DialogSimpleUse
                btnText={"Kirim Review"}
                title={"Anda Yakin Ingin Mengirimkan Review Ini"}
                desc={"Review Ini Masih Bisa di edit Atau Hapus Nantinya"}
                onSucsess={handleReview}
                checkValIsFalse={[isActiveStar, review]}
                messageFalse={"Pastikan Review dan Rating Sudah di isi"}
              />
            </div>
          </div>
        </div>
      </div>
      {activeAccordion && (
        <div>
          <AccordionUse data={DataAccordionActiveTrip} noPy={true} />
        </div>
      )}
    </section>
  );
}
