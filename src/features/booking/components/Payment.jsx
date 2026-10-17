import { useLocation } from "react-router-dom";

import Qris from "./PaymentComponents/Qris";
import { formatCurrencyId } from "../../../utils/convertCurrency";
export default function Payment() {
  const params = useLocation();

  const { tours, value } = params.state;
  const { payment, totalPrice } = value;

  return (
    <div>
      {payment === "Qris" && (
        <Qris name={tours} totalPriceIDR={formatCurrencyId(totalPrice)} />
      )}
    </div>
  );
}
