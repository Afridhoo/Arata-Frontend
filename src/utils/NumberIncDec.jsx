import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { toast } from "sonner";

export default function NumberIncDex({ numUser, slot, setNumUser }) {
  function handlePlus() {
    if (numUser >= slot) return toast.error("Anda Melebihi Batas Booking");

    setNumUser((user) => user + 1);
  }
  function handleMin() {
    if (numUser <= 1) return;
    setNumUser((user) => user - 1);
  }

  function handleOnChange(value) {
    if (value < 1) return setNumUser(0);

    if (value > slot) return toast.error("Anda Melebihi Batas Booking");

    setNumUser(value);
  }

  return (
    <div className={"flex items-center    gap-2 justify-center"}>
      <FaMinusCircle className="cursor-pointer" onClick={handleMin} />

      <input
        type="number"
        onChange={(e) => handleOnChange(Number(e.target.value))}
        value={numUser}
        className="p-2  w-[100px] text-center   border-1   rounded-4xl justify-center"
      />

      <FaPlusCircle className="cursor-pointer" onClick={handlePlus} />
    </div>
  );
}
