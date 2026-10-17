import { useEffect, useState } from "react";

export function UseDebaunce({ searchQuery, delay = 500 }) {
  const [debaunce, setDebaunce] = useState();

  useEffect(() => {
    const timer = setTimeout(() => setDebaunce(searchQuery), delay);
    return () => clearTimeout(timer);
  }, [debaunce, searchQuery]);

  return debaunce;
}
