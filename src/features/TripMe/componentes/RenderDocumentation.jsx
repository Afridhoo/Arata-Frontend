import ArrowUpRight from "@/components/ArrowUpRight";
import { CarouselPhotoDisplay } from "@/components/CarouselPhotoDisplay";
import LabelHeader from "@/components/LabelHeader";
import { useNavigate } from "react-router-dom";

export default function RenderDocumentation({ idTour, getImgDocumentation }) {
  const navigate = useNavigate();

  function handleSeeAllDoc() {
    navigate(`/Documentation/${idTour}`);
  }
  return (
    <div className="mt-25 ">
      <div className="flex flex-wrap gap-2 md:gap-0 justify-between  items-center">
        <LabelHeader title={"Dokumentasi"} desc={"Foto Perjalanan"} />

        <div onClick={handleSeeAllDoc}>
          <h2 className="cursor-pointer hover:text-gray-800 duration-300 font-semibold uppercase tracking-wider   text-xs md:text-[15px] group text-gray-600 flex items-start  ">
            <span>Lihat Seluruh Dokumentasi</span>
            <ArrowUpRight />
          </h2>
        </div>
      </div>

      <div>
        <CarouselPhotoDisplay
          img={getImgDocumentation?.slice(0, 10)}
          isDown={true}
          RenderText={"Klik Foto Untuk Download"}
        />
      </div>
    </div>
  );
}
