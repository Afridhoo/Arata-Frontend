import L from "leaflet";

export const createCustomIcon = (text, isHotel) => {
  const bgColor = isHotel ? "bg-blue-600" : "bg-green-600";
  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `<div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white ${bgColor}">
      ${text}
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};


