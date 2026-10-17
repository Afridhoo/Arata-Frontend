

export default function BookingDetails({
  NamaTour,
  quantity,
  payment,
  totalPrice,
  price
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider  ">
        Rincian Booking
      </h4>
      <div className="rounded-xl border border-emerald-100 p-4 space-y-3 bg-emerald-50/10 ">
        <div>
          <span className="flex items-center gap-1.5 text-xs text-gray-700 ">
            
            Nama Tour
          </span>
          <span className="text-sm font-semibold text-emerald-950">
            {NamaTour}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="flex items-center gap-1.5 text-xs text-gray-700">
            
              Jumlah User
            </span>
            <span className="text-sm font-semibold text-emerald-950">
              {quantity} Orang
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1.5 text-xs text-gray-700 ">
        
              Pembayaran
            </span>
            <span className="text-sm font-medium text-emerald-950 uppercase">
              {payment}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-emerald-100 pt-2">
          <div>
            <span className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
              Harga Satuan
            </span>
            <span className="text-sm font-bold text-gray-900">
              {price}
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
              Total Harga
            </span>
            <span className="text-sm font-bold text-gray-900">
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
