import { Button } from "@/components/ui/button";
import { FaCreditCard } from "react-icons/fa";

export default function ChcekoutHandle({ handleCheckout, pay }) {
  return (
    <Button
      onClick={handleCheckout}
      disabled={!pay}
      className={`cursor-pointer flex items-center justify-center  transition-all  text-sm font-semibold p-5 rounded-full`}
    >
      <FaCreditCard className="text-sm" />
      Lanjut ke Checkout
    </Button>
  );
}
