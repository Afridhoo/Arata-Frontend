import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import destinationIcon from "../../../../assets/svg/MapsSvg/destination.svg";
import destinationActiveIcon from "../../../../assets/svg/MapsSvg/destinationActive.svg";
import hotelIcon from "../../../../assets/svg/MapsSvg/hotels.svg";
import hotelActiveIcon from "../../../../assets/svg/MapsSvg/hotelsActive.svg";
import startLocation from "../../../../assets/svg/MapsSvg/startLocation.svg";
import bus from "../../../../assets/svg/MapsSvg/bus.png";
import yellowBus from "../../../../assets/svg/MapsSvg/yellowBus.png";
import calculateBearing from "../../../../utils/calcBearingIconMap";
import { formatDateId } from "../../../../utils/convertDate";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import AvatarSimpleUse from "@/components/AvatarSimpleUse";
import BadgePerStatusLocations from "@/components/BadgePerStatusLocations";

export function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.coordinates?.[1], loc.coordinates?.[0]]),
    );

    map.fitBounds(bounds);
  }, []);

  return null;
}

export const IconDestination = L.icon({
  iconUrl: destinationIcon,
  iconSize: [60, 60],
});

export const IconDestinationActive = L.icon({
  iconUrl: destinationActiveIcon,
  iconSize: [60, 60],
});

export const IconStartLocation = L.icon({
  iconUrl: startLocation,
  iconSize: [60, 60],
});

export function BusMarker({ position, desc, date, destLocation }) {
  const [lng, lat] = position;
  const [lngStart, latStart] = destLocation;

  const bearing = calculateBearing(lat, lng, latStart, lngStart);

  const busIcon = L.divIcon({
    html: `<img src=${yellowBus} style="transform: rotate(${bearing - 30}deg ); width: 50px; height: 50px;" />`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [32, 32],
  });
  return (
    <Marker position={[lat, lng]} icon={busIcon}>
      <Popup>
        <span>
          <p>Lokasi Tujuan {desc}</p>
          <p>{` Di Update Terakhir Kali ${formatDateId(date)}`}</p>
        </span>
      </Popup>
    </Marker>
  );
}

export const IconHotel = L.icon({
  iconUrl: hotelIcon,
  iconSize: [60, 60],
});

export const IconHotelsActive = L.icon({
  iconUrl: hotelActiveIcon,
  iconSize: [60, 60],
});

export function MapView({ coordinates }) {
  const map = useMap();

  if (!coordinates) return;
  map.flyTo([coordinates?.[1], coordinates?.[0]], 16, {
    duration: 0.4,
    easeLinearity: 0.5,
  });

  return null;
}

export function MarkerCords({
  value,
  handleCLickMaps,
  icon,
  ref,
  isActiveTripTour,
}) {
  return value.map((el, idx) => {
    return (
      <Marker
        key={idx}
        position={[el.lat, el.lon]}
        icon={icon}
        ref={(e) => {
          ref.current[el.id] = e;
        }}
        eventHandlers={{
          click: (e) => {
            const { lat, lng } = e.latlng;
            handleCLickMaps([lng, lat], el.id);
          },
        }}
      >
        <Popup>
          {<PopUpDisplay value={el} isActiveTripTour={isActiveTripTour} />}
        </Popup>
      </Marker>
    );
  });
}

export function PopUpDisplay({ value, isActiveTripTour }) {
  const { date, image, status, description, categories, address, guideReady } =
    value;

  const { from, to } = date || {};

  return (
    <div className="flex flex-col gap-1 w-[200px] relative">
      {image && (
        <img src={image} className="w-full h-24 object-cover rounded-md mb-1" />
      )}

      <div className="grid gap-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {description || ""}
        </h3>
        {date && (
          <BadgeSimpleUse
            desc={`${formatDateId(from, true)} - ${formatDateId(to, true)}`}
            variant={"outline"}
          />
        )}
      </div>

      {status && isActiveTripTour && (
        <BadgePerStatusLocations status={status} style={"absolute top-1"} />
      )}
      {categories?.categoriesTour && (
        <BadgeSimpleUse
          desc={categories?.categoriesTour || ""}
          variant={"outline"}
          style={"mt-2"}
        />
      )}

      <p className="text-xs text-gray-500 ">{address || ""}</p>
      {guideReady && (
        <span className="text-xs text-gray-500  pt-2 border-t">Pemandu : </span>
      )}
      {guideReady &&
        guideReady?.map((g) => {
          const {
            ratingsAverage,

            isActiveHandle,
            identity,
          } = g;

          const { name, photo } = identity || {};

          return (
            <div className="flex items-center gap-2 ">
              <AvatarSimpleUse
                photo={photo}
                isActive={isActiveHandle}
                size={"default"}
              />

              <BadgeSimpleUse
                desc={`${name || ""}  ${ratingsAverage ? `⭐ ${ratingsAverage}/5` : ""}`}
              />
            </div>
          );
        })}
    </div>
  );
}

export function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lng, lat]);
    },
  });
  return null;
}
