import { useEffect } from "react";

export default function Scroll({ setIsScrolled, num, stop }) {
  return useEffect(() => {
    const handleScroll = () => {
      const val = !stop
        ? window.scrollY > num 
        : window.scrollY > num && window.scrollY < stop;
      setIsScrolled(val);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
