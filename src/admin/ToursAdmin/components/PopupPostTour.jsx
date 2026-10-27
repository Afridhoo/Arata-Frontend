import { FiType, FiClock, FiUsers, FiDollarSign } from "react-icons/fi";
import InputUseForm from "../../../components/InputUseForm";
import { useForm } from "react-hook-form";
import MapsContainer from "./MapsAdmin/MapsContainer";
import { useState } from "react";
import { chekingUseForm } from "../../../utils/chekingUseForm";
import Header from "./PopUpComponentes/Header";
import Footer from "./PopUpComponentes/Footer";
import Description from "../../../components/Description";
import ImagesList from "./PopUpComponentes/ImagesList";
import TriggerMap from "./PopUpComponentes/TriggerMap";
import { formatResultSearch } from "../../utils/FormatMapView";
import { toast } from "sonner";
import { SelectOptionsCombo } from "@/components/SelectOptionsCombo";
import NormalizeCategories from "@/utils/NormalizeCategories";
import ImagesCover from "./PopUpComponentes/ImagesCover";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideMapPin } from "lucide-react";

export default function PopupPostTour({ onCancel, onSucsess, categories }) {
  const { register, handleSubmit } = useForm();
  const [saveLocation, setSaveLocation] = useState();
  const [mapIsActive, setMapIsActive] = useState(null);
  const [startLocations, setStartLocations] = useState(null);

  const [startLocCategories, setStartCategories] = useState([]);
  const [categoriesLocations, setCategoriesLocations] = useState([]);

  const getValueLocation = (val, type) =>
    val?.filter((el) => el.typeLocation === type);
  const getListLocations = formatResultSearch(saveLocation);
  const location = (val) => getValueLocation(getListLocations, val);

  const chekingLength = (...val) => val.every((el) => el?.length > 0);
  const chekingImgLength = (val, req) => {
    const cheking = val.filter((el) => el[0]).length;
    return cheking === req && true;
  };
  const GetIsValidCategories = NormalizeCategories({ categories });

  function getValue(value) {
    const checkValue = chekingUseForm(value);
    if (!checkValue) return;

    if (!chekingLength(location("hotel"), location("destination")))
      return toast.info("Silahkan Pilih Hotel Dan Juga Tempat Wisata");
    const { imagesDestination, imagesHotel, imageCover } = value || [];

    const checkimgHotel = chekingImgLength(
      imagesHotel,
      location("hotel").length,
    );
    const checkImgDest = chekingImgLength(
      imagesDestination,
      location("destination").length,
    );

    const checkImgCover = imageCover[0] instanceof File;

    if (!checkimgHotel || !checkImgDest)
      return toast.info("Silahkan Isi Semua Gambar Lokasi Wisata Dan Hotel");

    if (!checkImgCover)
      return toast.error("Gambar Utama Tour Belum Ditambahkan");

    const formData = new FormData();
    const valueArr = Object.entries(value);

    function appendListImg(key, value) {
      value.forEach((el) => formData.append(key, el[0]));
    }

    valueArr.forEach(([key, val]) => {
      if (!key.includes("image")) formData.append(key, val);
      if (key === "imagesDestination") appendListImg(key, val);
      if (key === "imagesHotel") appendListImg(key, val);
    });

    const formatLocation = {
      destination: location("destination")?.map((el, idx) => {
        const findCate = categoriesLocations?.find(
          (c) => c?.index === idx && c?.type === el?.typeLocation,
        );

        const getIsValidId = GetIsValidCategories?.find(
          (cate) => cate.label === findCate?.value?.label,
        )?._id;

        return {
          ...el,
          categories: getIsValidId,
        };
      }),
      hotel: location("hotel")?.map((el, idx) => {
        const findCate = categoriesLocations?.find(
          (c) => c?.index === idx && c?.type === el?.typeLocation,
        );

        const getIsValidId = GetIsValidCategories?.find(
          (cate) => cate.label === findCate?.value?.label,
        )?._id;

        return {
          ...el,
          categories: getIsValidId,
        };
      }),
    };

    const getIsValidId = GetIsValidCategories?.find(
      (cate) => cate.label === startLocCategories.value?.label,
    )?._id;

    const { hotel, destination } = formatLocation;

    if (
      categoriesLocations?.length < [...hotel, ...destination]?.length ||
      !getIsValidId
    )
      return toast.error("Kategori Belum Dipilih", {
        description: "Pastikan Anda Mengisi Setiap Kategori",
      });

    formData.append("startLocation", JSON.stringify(startLocations));
    formData.append("locations", JSON.stringify(formatLocation));

    formData.append("categories", getIsValidId);
    formData.append("imageCover", imageCover?.[0]);

    onSucsess(formData);
  }

  function handleDestinationCategories(data) {
    const { value, index, type } = data;

    const cheking = categoriesLocations?.some(
      (el) => el.index === index && el.type === type,
    );

    if (cheking) {
      setCategoriesLocations((t) =>
        t?.map((val) =>
          val.index === index && val.type === type
            ? { ...val, value: value }
            : val,
        ),
      );
    } else {
      setCategoriesLocations((t) => [...t, data]);
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
        <form
          onSubmit={handleSubmit(getValue)}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transform scale-100 transition-all duration-300"
        >
          <Header onCancel={onCancel} label={"Create"} />
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
            {/* Section 1: Informasi Tour & Kategori Utama */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Informasi Utama Tour & Kategori
              </h3>

              <div className="flex items-center gap-2">
                <BadgeSimpleUse
                  desc={"Kategori Utama Tour"}
                  variant={"default"}
                  icon={<LucideMapPin />}
                />

                <SelectOptionsCombo
                  value={GetIsValidCategories}
                  onChange={setStartCategories}
                  idx={0}
                />
              </div>

              <div className=" flex   items-center   mt-10 gap-5 mb-5 flex-wrap">
                <InputUseForm
                  label="Nama Tour"
                  Icon={FiType}
                  placeholder=""
                  type="text"
                  {...register("name")}
                />

                <InputUseForm
                  label="Durasi (Hari)"
                  Icon={FiClock}
                  placeholder=""
                  type="number"
                  {...register("duration")}
                />

                <InputUseForm
                  label="Maksimal Grup"
                  Icon={FiUsers}
                  placeholder="Max.Booking"
                  type="number"
                  {...register("maxGroupSize")}
                />

                <InputUseForm
                  label="Harga"
                  Icon={FiDollarSign}
                  placeholder="Harga Booking/User"
                  type="number"
                  {...register("price")}
                />
                <Description
                  title={"Ringkasan Singkat"}
                  {...register("summary")}
                  sizeSmall={true}
                />
              </div>
            </div>

            <div className="bg-gray-50/50 p-5 mt-10 rounded-2xl border border-gray-100 space-y-5">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Deskripsi & Media Cover
              </h3>
              <Description {...register("description")} />

              <ImagesCover {...register("imageCover")} />
            </div>

            {/* Section 3: Pengaturan Lokasi */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Pengaturan Lokasi Tour
                </h3>
                <TriggerMap setMapIsActive={setMapIsActive} label={"Create"} />
              </div>

              {/* Destination Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Lokasi Destinasi
                  </label>
                </div>

                {location("destination")?.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm space-y-3">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Gambar & Kategori Destinasi
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {location("destination")?.map((el, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded-xl border border-gray-200/70 space-y-3"
                        >
                          <ImagesList
                            index={index}
                            valueLocation={el}
                            {...register(`imagesDestination.${index}`)}
                          />
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-gray-500">
                              Kategori Destinasi {index + 1}
                            </label>
                            <SelectOptionsCombo
                              value={GetIsValidCategories}
                              onChange={handleDestinationCategories}
                              idx={index}
                              type={"destination"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hotel Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Lokasi Hotel
                  </label>
                </div>

                {location("hotel")?.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm space-y-3">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Gambar & Kategori Hotel
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {location("hotel")?.map((el, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded-xl border border-gray-200/70 space-y-3"
                        >
                          <ImagesList
                            index={index}
                            valueLocation={el}
                            {...register(`imagesHotel.${index}`)}
                          />
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-gray-500">
                              Kategori Hotel {index + 1}
                            </label>

                            <SelectOptionsCombo
                              value={GetIsValidCategories}
                              onChange={handleDestinationCategories}
                              idx={index}
                              type={"hotel"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer onCancel={onCancel} />
        </form>
      </div>
      {mapIsActive && (
        <div className="absolute inset-0 z-[40]">
          <MapsContainer
            saveLocationsFinal={setSaveLocation}
            valueLocationsFinal={saveLocation}
            setMapsActive={setMapIsActive}
            setStartLocations={setStartLocations}
          />
        </div>
      )}
    </div>
  );
}
