
export default function Qris({ name, totalPriceIDR }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-sm mx-auto mt-8 transition-all hover:shadow-xl">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran QRIS</h2>
        <p className="text-sm text-gray-500">Pindai kode QR di bawah ini menggunakan aplikasi e-wallet atau m-banking Anda.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200 mb-6 flex justify-center items-center">
        <img
          className="w-56 h-56 object-contain rounded-lg shadow-sm mix-blend-multiply"
          src={`/src/assets/img/payment/Qris.jpeg`}
          alt="QR Code QRIS"
        />
      </div>

      <div className="w-full bg-blue-50 rounded-xl p-4 mb-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 font-medium">Nama Tour</span>
          <span className="text-sm text-gray-900 font-semibold text-right max-w-[150px] truncate" title={name}>
            {name || '-'}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-blue-100 pt-3">
          <span className="text-sm text-gray-600 font-medium">Total Tagihan</span>
          <span className="text-lg text-blue-600 font-bold">{totalPriceIDR || 'Rp 0'}</span>
        </div>
      </div>
      
      <div className="w-full mt-4 text-center">
        <p className="text-xs text-gray-400">Pastikan nominal dan nama merchant sesuai sebelum melanjutkan pembayaran.</p>
      </div>
    </div>
  );
}
