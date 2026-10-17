import { useState } from "react";
import { formatCurrencyId } from "../../../../utils/convertCurrency";

export default function Dp({ name, totalPriceIDR, DpTotal }) {
  const totalDp = DpTotal * 0.5;
  const [numPayment, setNumPayment] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const paymentType = [
    { type: "BRI", Num: 1111 },
    { type: "BCA", Num: 2222 },
    { type: "SeaBank", Num: 333 },
  ];

  const selectedBank = paymentType.find((p) => p.Num == numPayment);

  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-sm mx-auto mt-8 transition-all hover:shadow-xl">
      <div className="w-full mb-5 border-b border-gray-100 pb-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Down Payment (DP)
        </h2>
        <p className="text-sm text-gray-500">
          Pembayaran awal untuk mengamankan pesanan tour Anda.
        </p>
      </div>

      <div className="space-y-3 mb-6 px-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Nama Tour</span>
          <span
            className="text-sm text-gray-900 font-semibold text-right max-w-[150px] truncate"
            title={name}
          >
            {name || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">
            Total Harga Keseluruhan
          </span>
          <span className="text-sm text-gray-500 font-medium line-through decoration-gray-400">
            {totalPriceIDR}
          </span>
        </div>
      </div>

      <div className="mb-6 px-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Metode Pembayaran
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedBank ? selectedBank.type : "-- Pilih Bank --"}</span>
            <svg
              className={`fill-current h-4 w-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
              <ul className="max-h-48 overflow-y-auto">
                {paymentType.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-b-0 border-gray-50 flex justify-between items-center"
                    onClick={() => {
                      setNumPayment(item.Num);
                      setIsOpen(false);
                    }}
                  >
                    <span className="font-medium">{item.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {selectedBank && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
              Nomor Pembayaran ({selectedBank.type})
            </p>
            <p className="text-xl font-bold tracking-widest text-gray-800 font-mono">
              {numPayment}
            </p>
          </div>
        )}
      </div>

      <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-5 mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
            Total DP yang harus dibayar
          </span>
          <span className="text-[10px] text-blue-600 bg-blue-200 px-2 py-0.5 rounded-full font-semibold">
            50%
          </span>
        </div>
        <div className="mt-1">
          <span className="text-2xl text-blue-700 font-bold">
            {formatCurrencyId(totalDp)}
          </span>
        </div>
      </div>

      <div className="w-full mt-4 flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xs text-gray-500 leading-relaxed">
          DP dihitung dari setengah harga total. Sisa pembayaran dapat dilunasi
          nanti sesuai ketentuan.
        </p>
      </div>
    </div>
  );
}
