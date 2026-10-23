import { useState } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import Scroll from "../../../../components/Scroll";

import { useNavigate } from "react-router-dom";
import NumberIncDex from "../../../../utils/NumberIncDec";
import { UseGetMe } from "../../../auth/hooks/useAuth";

import { formatCurrencyId } from "@/utils/convertCurrency";
import { toast } from "sonner";
import CtaUserNeedLogin from "@/components/CtaUserNeedLogin";
import { useIsMobile } from "@/hooks/use-mobile";

export default function BookingTour({ tour, btnDisplay }) {
  const { maxGroupSize, slot } = tour;

  const { data: User } = UseGetMe();

  let mess;

  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setIsScrolled] = useState(false);
  const [numUser, setNumUser] = useState(1);
  const checkMobile = useIsMobile();

  const navigate = useNavigate();
  const calc = maxGroupSize - slot;
  if (calc > 0 && calc < maxGroupSize) mess = `${calc} Pengguna Sudah Booking`;
  else if (slot === 0) mess = "Tour Sudah Penuh Di Booking";
  else mess = "Belum Ada Pengguna Lain Yang Booking";

  function handleBooking() {
    const { isActiveTrip } = User || {};

    if (!User)
      return toast.error("Belum Login", {
        description: "Silahkan Login Terlebih Dahulu ",
      });

    if (isActiveTrip)
      return toast.error(
        "Akun Anda Masih Ada Booking Aktif  / Sedang Berjalan",
      );

    navigate("/ProsessCheckout", {
      state: {
        tour,
        numUser,
      },
    });
  }

  return (
    <>
      {!isOpen && (
        <Scroll setIsScrolled={setIsScrolled} num={400} stop={3100} />
      )}

      <div
        className={`fixed md:bottom-0 md:left-0    top-0 md:top-auto  md:right-0 z-[9] md:bg-white/95 md:backdrop-blur-md md:border-t md:border-gray-200 transition-all duration-500 ${
          scroll ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-5xl flex-wrap mx-auto px-6 py-4 flex items-center  justify-end md:justify-between">
          <div className="hidden md:block">
            <p className="text-xs text-gray-400 font-medium">Mulai dari</p>
            <div className="flex items-baseline gap-1.5">
              <span className="md:text-xl text-sm font-bold text-gray-900">
                {formatCurrencyId(tour?.price)}
              </span>
              <span className="text-sm text-gray-400">/ orang</span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
              setIsScrolled(false);
            }}
            className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white px-2 py-2 md:px-8 md:py-3 rounded-full text-sm font-semibold transition-all duration-300"
          >
            {btnDisplay || "Pesan Sekarang"}
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => {
            setIsOpen(false);
            setIsScrolled(true);
          }}
        />
      )}

      <div
        className={`fixed top-5 md:top-0  right-0  w-[300px] h-[450px]  md:h-[600px] md:rounded-bl-2xl rounded-l-2xl  md:mt-16 md:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out overflow-y-auto flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8  flex flex-col flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="md:text-2xl text-xl font-bold text-gray-900">
                Booking Tour
              </h2>
              <p className="mt-2 text-xs md:text-sm text-gray-400">{mess}</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsScrolled(true);
              }}
              className="text-gray-300 hover:text-gray-800 p-2 rounded-full transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Price */}
          <div className="md:mb-20 mb-10  border-b border-gray-100">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
              Harga per orang
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {formatCurrencyId(tour?.price)}
              </span>
              <span className="text-gray-400 text-xs md:text-sm">/ orang</span>
            </div>
            <p className="text-sm text-orange-400 mt-2">
              Sisa {tour?.slot || maxGroupSize} slot tersedia
            </p>
          </div>

          <div className="space-y-8 md:flex-1">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">
                  Jumlah Peserta
                </label>
              </div>
              <NumberIncDex
                numUser={numUser}
                slot={tour.slot}
                setNumUser={setNumUser}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-15 md:mt-0">
            {User ? (
              <button
                onClick={handleBooking}
                className="cursor-pointer w-full bg-gray-900 hover:bg-gray-800 text-white py-2 md:py-4 rounded-xl text-sm font-semibold flex justify-center items-center gap-3 transition-all duration-300"
              >
                <span> Lanjutkan Booking</span>
                <FaArrowRight className="text-xs" />
              </button>
            ) : (
              <CtaUserNeedLogin text={"Anda Belum Login"} />
            )}
            <p className="text-center text-xs text-gray-400 mt-4">
              Anda tidak akan dikenakan biaya pada tahap ini
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
