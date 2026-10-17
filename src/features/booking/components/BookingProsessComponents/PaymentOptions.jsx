import { formatCurrencyId } from "@/utils/convertCurrency";
import { FaMoneyBillWave } from "react-icons/fa";

export default function PaymentOptions({
  price,
  totalPrice,
  setPay,
  payment,
  pay,
}) {
  return (
    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-indigo-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-green-600 font-medium">Harga per Orang</p>
          <p className="text-2xl font-bold text-green-800">
            {formatCurrencyId(price)}
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-green-600 font-medium">Total Harga</p>
          <p className="text-3xl font-extrabold text-green-900">{totalPrice}</p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
          <FaMoneyBillWave className="text-green-500" />
          <span>Metode Pembayaran</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {payment.map((el) => (
            <button
              onClick={() => setPay(el)}
              key={el}
              className={`cursor-pointer px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm border ${
                pay === el
                  ? "bg-gray-600 text-white border-gray-800 "
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
