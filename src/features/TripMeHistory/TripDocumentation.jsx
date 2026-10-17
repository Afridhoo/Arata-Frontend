import NewLoading from "@/components/loading/NewLoading";

import { UseGetMeDocumentation } from "./UseGetDocumentation";
import { formatDateId } from "@/utils/convertDate";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import ListCard from "./components/ListCard";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import { LucideMapPinMinusInside } from "lucide-react";
import { UserNotExist } from "@/components/UserNotExist";
import { useAuth } from "@/utils/AuthContext";

export default function TripDocumentation() {
  const { isUserNotLogin } = useAuth();
  const { data: Documentation, isPending } = UseGetMeDocumentation({
    enabled: isUserNotLogin,
  });

  const navigate = useNavigate();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isPending) return <NewLoading />;

  function handleSeeDetail(id) {
    navigate(`/tripMe/${id}`);
  }

  if (Documentation?.length === 0)
    return (
      <EmptySimpleUse
        title={"Anda Belum Pernah Melakukan Perjalanan Tour"}
        desc={"Silahkan Pesan Tour Terlebih Dahulu"}
        btnText={"Ke Halaman Tour"}
        icon={<LucideMapPinMinusInside />}
        link={"/tours"}
      />
    );

  return (
    <>
      <main className="min-h-screen bg-[#f5f5f7] px-5 py-10 text-[#1d1d1f] sm:px-10 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-20 max-w-2xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#6e6e73]">
              Riwayat perjalanan
            </p>
            <h1 className="text-5xl font-semibold ">Daftar Perjalanan Anda</h1>
            <p className="mt-4 text-base leading-7 text-[#6e6e73] sm:text-lg">
              Semua momen perjalanan yang pernah Anda selesaikan, tersimpan di
              satu tempat.
            </p>
          </header>

          <div className="grid grid-cols-3 gap-9 ">
            {Documentation.map((item, idx) => {
              const {
                destination = 0,
                detailBooking = [],
                getTour = {},
                guide = 0,
                hotel = 0,
                trip = 0,
                _id,
              } = item;
              const { name = "Perjalanan tanpa nama", imageCover } = getTour;
              const { bookingDate, dateFinished } = detailBooking[0] || {};

              return (
                <article
                  className="group relative overflow-hidden rounded-3xl bg-white cursor-pointer"
                  key={idx}
                  onClick={() => handleSeeDetail(_id)}
                >
                  <div className="absolute group-hover:-translate-y-1 duration-300 right-7 top-3 w-20  bg-white rounded-lg">
                    <BadgeSimpleUse
                      desc={"Lihat Detail"}
                      icon={<FiArrowUpRight />}
                      style={"group-hover:bg-gray-800 group-hover:text-white"}
                    />
                  </div>

                  <div className="aspect-[4/2] overflow-hidden bg-gray-300">
                    <img
                      className="h-full w-full object-cover "
                      src={imageCover}
                    />
                  </div>

                  <div className="p-6">
                    <div className=" border-b mt-2 border-gray-300 pb-3 mt">
                      <h2 className="font-semibold  text-xl mb-2">{name}</h2>
                      {!dateFinished && (
                        <BadgeSimpleUse
                          desc={"Perjalanan Aktif"}
                          variant={"default"}
                        />
                      )}
                    </div>
                    <div className="mt-2 p-2  grid items-center gap-5  flex-wrap  pt-5 text-sm">
                      <ListCard
                        value={`${destination} Lokasi`}
                        title={"Destinasi"}
                        title2={"Hotel"}
                        value2={`${hotel} Penginapan`}
                      />
                      <ListCard
                        value={`${guide} Orang`}
                        title={"Pemandu"}
                        title2={"Dokumentasi Diupload"}
                        value2={`${trip} momen`}
                      />
                    </div>

                    <div className="mt-5 border-t flex items-end border-gray-300 ">
                      <div className="pt-4 flex  ">
                        <span className="text-sm text-[#6e6e73] flex items-center ">
                          <BadgeSimpleUse
                            desc={"Booking"}
                            style={"bg-white text-gray-600"}
                          />
                          {formatDateId(bookingDate, true)}
                        </span>
                        <p className="border border-gray-400 ml-2"></p>
                        {dateFinished ? (
                          <span className="text-sm text-[#6e6e73] flex items-center ">
                            <BadgeSimpleUse
                              desc={"Selesai"}
                              style={"bg-white text-gray-600"}
                            />
                            {dateFinished && formatDateId(dateFinished, true)}
                          </span>
                        ) : (
                          <span className="text-sm ml-2 text-[#6e6e73] flex items-center ">
                            Berjalan
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
