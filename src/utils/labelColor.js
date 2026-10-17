export const labelColor = (status) => {
  let color;
  if (status === "confirmed") color = "bg-blue-100 text-blue-800";
  else if (status === "pending") color = "bg-amber-100 text-amber-800";
  else if (status === "finished") color = "bg-emerald-100 text-emerald-800";
  else if (status === "cancelled") color = "bg-red-200 text-red-800";
  return color;
};
