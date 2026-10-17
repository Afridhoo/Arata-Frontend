import { useForm } from "react-hook-form";
import { FiType, FiDollarSign, FiClock, FiUsers } from "react-icons/fi";
import Header from "./PopUpComponentes/Header";
import InputUseForm from "../../../components/InputUseForm";
import Footer from "./PopUpComponentes/Footer";
import ImagesList from "./PopUpComponentes/ImagesList";
import ImagesCover from "./PopUpComponentes/ImagesCover";
import Description from "../../../components/Description";

import { useState } from "react";
import TriggerMap from "./PopUpComponentes/TriggerMap";
import MapsUpdate from "./MapsAdmin/MapsUpdate";
import { filterBy } from "../../utils/FormatMapView";
import { toast } from "sonner";
import { SelectOptionsSimple } from "@/components/SelectOptionsSimple";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideMapPinCheck } from "lucide-react";
import { SelectOptionsCombo } from "@/components/SelectOptionsCombo";
import NormalizeCategories from "@/utils/NormalizeCategories";
export default function PopupUpdateTours({
  value,
  onSucsess,
  onCancel,
  categories,
}) {
  const { register, handleSubmit } = useForm();

  const {
    name,
    summary,
    description,
    categories: oldCategories,
    duration,
    maxGroupSize,
    price,
    imageCover,
    _id,
    startLocation,
    locations,
    soldOut,
  } = value;

  const [startCategories, setStartCategories] = useState(oldCategories);
  const [categoriesLocation, setCategoriesLocation] = useState([]);
  const { destination, hotel } = locations;

  const [mapIsActive, setMapIsActive] = useState(null);
  const [saveLocation, setSaveLocation] = useState();

  const listHotel = filterBy(saveLocation, "hotel") || hotel;
  const listDestination = filterBy(saveLocation, "destination") || destination;
  const GetIsValidCategories = NormalizeCategories({ categories });

  const checkIsLocUpdate = (stast) =>
    saveLocation?.filter((el) => !el.image && el.typeLocation === stast);

  const renderToastErr = (text) =>
    toast.error(
      `Silahkan Isi Gambar Yang Dari ${text} Yang Baru Anda Tambahkan`,
    );

  function onSubmit(value) {
    const formData = new FormData();
    const entrsObj = Object.entries(value);

    entrsObj.forEach(([key, val]) => {
      if (!key.includes("image")) formData.append(key, val);
    });

    const { imagesDestination, imagesHotel, imageCover } = value || [];

    const idImgUpdate = { imagesDestination: [], imagesHotel: [] };
    const checkDestUpdate = checkIsLocUpdate("destination")?.length;
    const checkHotelUpdate = checkIsLocUpdate("hotel")?.length;

    if (categoriesLocation?.length < checkDestUpdate + checkHotelUpdate)
      return toast.error(
        "Anda Belum Menentukan Kategori Wisata Atau Hotel Yang Barusan Anda Tambahkan",
      );

    const chekingIdxPush = (val, check) =>
      check && idImgUpdate[val]?.length < check;

    function getImgFile(updateImage, nameFile) {
      updateImage.forEach((el) => {
        const objVal = Object.entries(el)[0];

        const getIdxVal = (idx) => objVal[idx];

        if (getIdxVal(1).length > 0) {
          formData.append(nameFile, getIdxVal(1)[0]);
          idImgUpdate[nameFile].push(getIdxVal(0));
        }
      });
    }
    getImgFile(imagesDestination, "imagesDestination");
    getImgFile(imagesHotel, "imagesHotel");

    function formatCheking(value, checkId) {
      return value?.map((el) => {
        const cheking = idImgUpdate[checkId].includes(el._id);
        return { ...el, image: (el.image = cheking ? false : el.image) };
      });
    }

    const formatLocationUpdate = {
      destination: formatCheking(listDestination, "imagesDestination")?.map(
        (el, idx) => {
          const findCate = categoriesLocation?.find(
            (c) => c.index === idx && c.type === el.typeLocation,
          );

          const getIsValidId = findCate?._id || el.categories;

          return {
            ...el,
            categories: getIsValidId,
          };
        },
      ),

      hotel: formatCheking(listHotel, "imagesHotel")?.map((el, idx) => {
        const findCate = categoriesLocation?.find(
          (c) => c.index === idx && c.type === el.typeLocation,
        );

        const getIsValidId = findCate?._id || el.categories;

        return {
          ...el,
          categories: getIsValidId,
        };
      }),
    };

    if (imageCover[0] instanceof File)
      formData.append("imageCover", imageCover?.[0]);

    formData.append("locationUpdate", JSON.stringify(formatLocationUpdate));
    formData.append(
      "categories",
      startCategories?.value?._id || startCategories,
    );

    if (chekingIdxPush("imagesDestination", checkDestUpdate))
      return renderToastErr("Lokasi Destinasi Wisata");

    if (chekingIdxPush("imagesHotel", checkHotelUpdate))
      return renderToastErr("Hotel");

    onSucsess(formData, _id);
  }

  const valueIsSoldOut = [
    { value: false, label: "Active" },
    { value: true, label: "soldOut" },
  ];

  function handleCategoriesLocations(data) {
    const { value, index, type } = data;

    const { _id } = value;

    const cheking = categoriesLocation?.some(
      (el) => el.index === index && el.type === type,
    );

    if (cheking) {
      setCategoriesLocation((t) =>
        t?.map((val) =>
          val.index === index && val.type === type ? { ...val, _id: _id } : val,
        ),
      );
    } else {
      setCategoriesLocation((t) => [...t, { _id, index, type }]);
    }
  }

  return (
    <div className="fixed inset-0 z-10 w-full flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300"
      >
        <Header onCancel={onCancel} label={"Update"} />

        <div className="p-5">
          <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Informasi Utama Tour
            </h3>
            <div className="flex mb-5  mt-5 gap-10 items-center">
              <div className="flex items-center gap-2">
                <BadgeSimpleUse
                  desc={"Status Tour"}
                  icon={<LucideMapPinCheck />}
                  variant={"default"}
                />

                <SelectOptionsSimple
                  value={valueIsSoldOut}
                  defaults={soldOut}
                  {...register("soldOut")}
                />
              </div>
              <div className="flex items-center gap-2">
                <BadgeSimpleUse
                  desc={"Kategori Utama Tour"}
                  icon={<LucideMapPinCheck />}
                  variant={"default"}
                />
                <SelectOptionsCombo
                  value={GetIsValidCategories}
                  onChange={setStartCategories}
                  idx={0}
                  defaultValue={
                    GetIsValidCategories?.find((e) => e._id === oldCategories)
                      ?.label
                  }
                />
              </div>
            </div>
            <div className=" flex   items-center   mt-10 gap-5 mb-5 flex-wrap">
              <InputUseForm
                label={"Nama Tour"}
                Icon={FiType}
                placeholder={"Nama Tour"}
                type={"text"}
                defaults={name}
                {...register("name")}
              />

              <InputUseForm
                label={"Harga Booking"}
                Icon={FiDollarSign}
                placeholder={"Harga"}
                type={"number"}
                defaults={price}
                {...register("price")}
              />

              <InputUseForm
                label={"Durasi Perjalanan"}
                Icon={FiClock}
                placeholder={"Durasi Perjalanan"}
                type={"number"}
                defaults={duration}
                {...register("duration")}
              />

              <InputUseForm
                label={"Max Group"}
                Icon={FiUsers}
                placeholder={"Total Maximal Group"}
                type={"number"}
                defaults={maxGroupSize}
                {...register("maxGroupSize")}
              />

              <Description
                defaults={summary}
                title={"Ringkasan Singkat"}
                {...register("summary")}
              />
            </div>
          </div>

          <div className="bg-gray-50/50 p-5 mt-10 rounded-2xl border border-gray-100 space-y-5">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Deskripsi & Media Cover
            </h3>
            <Description defaults={description} {...register("description")} />

            <ImagesCover imageCover={imageCover} {...register("imageCover")} />
          </div>

          {/* Section 3: Lokasi & Map */}
          <div className="bg-gray-50/50 p-5 mt-10 rounded-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Lokasi & Gambar Destinasi/Hotel
              </h3>
              <TriggerMap setMapIsActive={setMapIsActive} label={"Update"} />
            </div>

            {/* List Destinations & Destination Images */}
            <div className="mt-10 space-y-4 pt-4 border-t border-gray-200/80">
              {listDestination?.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Gambar Destinasi
                    </span>
                  </div>
                  <div className="flex items-center gap-5 flex-wrap">
                    {listDestination?.map((el, index) => (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/70 space-y-3">
                        <ImagesList
                          key={index}
                          valueLocation={el}
                          index={index}
                          {...register(
                            `imagesDestination.${index}.${el._id || index}`,
                          )}
                        />
                        <SelectOptionsCombo
                          value={GetIsValidCategories}
                          onChange={handleCategoriesLocations}
                          idx={index}
                          type={"destination"}
                          defaultValue={
                            el.image &&
                            GetIsValidCategories?.find(
                              (c) => c._id === el.categories,
                            )
                          }
                          idUpdate={el._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200/80">
              {listHotel?.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Gambar Hotel
                    </span>
                  </div>
                  <div className="flex item-center gap-5 flex-wrap">
                    {listHotel?.map((el, index) => (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/70 space-y-3">
                        <ImagesList
                          valueLocation={el}
                          key={index}
                          index={index}
                          {...register(
                            `imagesHotel.${index}.${el._id || index}`,
                          )}
                        />
                        <SelectOptionsCombo
                          value={GetIsValidCategories}
                          onChange={handleCategoriesLocations}
                          type={"hotel"}
                          idx={index}
                          defaultValue={
                            el.image &&
                            GetIsValidCategories?.find(
                              (c) => c._id === el.categories,
                            )
                          }
                          idUpdate={el._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Footer onCancel={onCancel} />
        </div>
      </form>
      {mapIsActive && (
        <div className="absolute inset-0 z-[40]">
          <Header
            onCancel={() => setMapIsActive(false)}
            NoSticky={true}
            label={"Update"}
          />

          <div>
            <MapsUpdate
              startLocation={startLocation}
              listLocation={listDestination}
              listHotel={listHotel}
              idTour={_id}
              saveLocationUpdate={setSaveLocation}
              setMapIsActive={setMapIsActive}
            />
          </div>
        </div>
      )}
    </div>
  );
}
