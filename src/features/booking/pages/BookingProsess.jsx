import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrencyId } from "../../../utils/convertCurrency";

import { useEffect, useState } from "react";

import { UseInsertBooking } from "../hooks/useBooking";
import Header from "../components/BookingProsessComponents/Header";
import Rating from "../components/BookingProsessComponents/Rating";
import QuickFacts from "../components/BookingProsessComponents/QuickFacts";
import TotalsUsers from "../components/BookingProsessComponents/TotalsUsers";
import PaymentOptions from "../components/BookingProsessComponents/PaymentOptions";
import ChcekoutHandle from "../components/BookingProsessComponents/ChcekoutHandle";
import NewLoading from "@/components/loading/NewLoading";

export default function BookingProsess() {
  const location = useLocation();
  const { mutate: insertBooking, isSuccess, isPending } = UseInsertBooking();
  const { tour, numUser } = location.state;
  const { price: priceTour, name, _id } = tour;
  const [quantity, setQuantity] = useState(numUser);
  const [pay, setPay] = useState(null);
  const navigate = useNavigate();

  const totalPrice = formatCurrencyId(priceTour * quantity);
  const payment = ["Qris"];

  const value = {
    quantity: quantity,
    payment: pay,
    totalPrice: priceTour * quantity,
  };

  useEffect(() => {
    if (!isSuccess) return;

    if (isSuccess)
      navigate("/payment", {
        state: { value, tours: name },
        replace: true,
      });
  }, [[isSuccess]]);

  if (isPending) return <NewLoading />;

  function handleCheckout() {
    insertBooking({ value, tourId: _id });
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Image & Title */}
        <Header tour={tour} />

        <div className="p-8 sm:p-10 space-y-8">
          {/* Summary & Rating */}
          <Rating tour={tour} />

          <hr className="border-gray-200" />

          {/* Quick Facts Grid */}
          <QuickFacts tour={tour} />
          <hr className="border-gray-200" />

          {/*Inputs section */}
          <TotalsUsers
            tour={tour}
            setQuantity={setQuantity}
            totalParticipants={quantity}
          />

          {/* Pricing & Payment Options */}
          <PaymentOptions
            price={priceTour}
            totalPrice={totalPrice}
            setPay={setPay}
            payment={payment}
            pay={pay}
          />

          {/* Checkout Button */}
          <ChcekoutHandle handleCheckout={handleCheckout} pay={pay} />
        </div>
      </div>
    </div>
  );
}
