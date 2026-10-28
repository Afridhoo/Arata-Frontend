import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import {
  IconDestination,
  IconDestinationActive,
  IconHotel,
  IconHotelsActive,
  MapView,
  MarkerCords,
  PopUpDisplay,
} from "../../../../features/tours/components/TourComponents/MapHandler";
import LocationListTour from "./LocationListTour";
import { useEffect, useRef, useState } from "react";
import {
  UseDeleteLocationTour,
  UseGetLocation,
  UseGetLocationDestination,
} from "../../hooks/useTourAdmin";

import {
  displayResultSearch,
  formatResultSearch,
  handleCoords,
} from "../../../utils/FormatMapView";
import TabsLocation from "./TabsLocation";

import { DrawerLocationsAdmin } from "@/components/DrawerForLocationsAdmin";
import { toast } from "sonner";
import { SpinnerBtn } from "@/components/SpinnerBtn";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";

export default function MapsUpdate({
  idTour,
  startLocation,
  listLocation: oldDest,
  listHotel: oldHotel,
  saveLocationUpdate,
  setMapIsActive,
}) {
  const { mutate: DeleteLocation } = UseDeleteLocationTour();
  const { mutate: insertSearch, data: resultSearch } = UseGetLocation();
  const {
    mutate: insertDestination,
    data: listDestination,
    isPending,
  } = UseGetLocationDestination();

  const refLocations = useRef({});
  const initialValue = [...oldDest, ...oldHotel];

  const [position, setPosition] = useState();
  const [tabs, setTabs] = useState("destination");
  const [geoJson, setGeoJson] = useState();
  const [isActive, setIsActive] = useState(null);
  const [concatValue, setConcatValue] = useState(initialValue);

  useEffect(() => {
    if (!resultSearch) return;
    const formatLatlngResult = displayResultSearch(resultSearch[0]);

    const { polygon } = formatLatlngResult;
    setGeoJson(polygon);
  }, [resultSearch]);

  const [getCoordinates, setGetCoordinates] = useState(
    concatValue?.map((el) => [el.coordinates[1], el.coordinates[0]]),
  );

  const { coordinates: latlng } = startLocation;
  const { hotels, destinations } = listDestination || {};

  const cordsDestination = handleCoords(destinations, "destination");
  const cordsHotels = handleCoords(hotels, "hotel");

  const filterBy = concatValue.filter((el) => el.typeLocation === tabs);

  function handleDeleteLine(value) {
    const [lng, lat] = value.coordinates;

    setGetCoordinates((coords) =>
      coords.filter((el) => el.toString() !== [lat, lng].toString()),
    );
  }

  function handleDelete(idLocation) {
    const cheking = concatValue.find((el) => el._id === idLocation && el.image);
    const getConcatVal = concatValue.find((el) => el._id === idLocation);


    

    if (cheking) {
      DeleteLocation({ idTour, idLocation, setConcatValue });
      handleDeleteLine(cheking);
    } else {
      setConcatValue((concatValue) =>
        concatValue.filter((el) => el._id !== idLocation),
      );

      handleDeleteLine(getConcatVal);
    }
  }

  function handleCLick(latlng, placeId) {
    setPosition(latlng);
    setIsActive(placeId);

    const currentRef = refLocations.current[placeId];

    if (currentRef) currentRef.openPopup();
  }

  function handleSaveNewLocation(value, type) {
    const formatValue = formatResultSearch([value], type);
    if (!formatValue) return;

    const { coordinates, id } = formatValue[0];

    const cheking = concatValue?.some(
      (el) => el.coordinates?.toString() === coordinates?.toString(),
    );

    if (cheking) return toast.error("Lokasi Ini Sudah Ada Di Dalam List Anda");

    const newCoords = [coordinates[1], coordinates[0]];

    setGetCoordinates((getCoordinates) => [...getCoordinates, newCoords]);
    setConcatValue((concatValue) => [...concatValue, formatValue[0]]);
    handleCLick(coordinates, id);
  }

  function handleEdit() {
    const search = startLocation.description;
    insertDestination({ latlng });
    insertSearch({ search });
  }

  function handleSaveEdit() {
    saveLocationUpdate(concatValue);
    setMapIsActive(false);
  }

  return (
    <div className="w-full fixed inset-0 z-[9]  h-full border border-gray-200 ">
      <MapContainer
        center={[latlng[1], latlng[0]]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
        <MapView coordinates={position} />

        <GeoJSON data={geoJson} key={JSON.stringify(geoJson)} />
        <Polyline positions={[getCoordinates]} />
        <Polygon positions={[getCoordinates]} color="red" />

        {cordsDestination && (
          <MarkerCords
            value={cordsDestination}
            icon={IconDestination}
            handleCLickMaps={handleCLick}
            ref={refLocations}
          />
        )}

        {cordsHotels && (
          <MarkerCords
            value={cordsHotels}
            ref={refLocations}
            icon={IconHotel}
            handleCLickMaps={handleCLick}
          />
        )}

        {concatValue?.map((el, idx) => (
          <Marker
            key={idx}
            position={[el.coordinates[1], el.coordinates[0]]}
            ref={(e) => {
              refLocations.current[el._id] = e;
            }}
            icon={
              el.typeLocation === "destination"
                ? IconDestinationActive
                : IconHotelsActive
            }
            eventHandlers={{
              click: (e) => {
                const { lat, lng } = e.latlng;
                handleCLick([lng, lat], el._id);
              },
            }}
          >
            <Popup>
              <PopUpDisplay value={el} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="z-[999] absolute right-5 flex items-center gap-2 top-20">
        <SpinnerBtn
          disabled={isPending}
          text={isPending ? "Mencari Lokasi Lama" : "Update Lokasi"}
          handleClick={listDestination ? handleSaveEdit : handleEdit}
        />
        <BadgeSimpleUse
          desc={"Tutup Map"}
          style={"p-3 bg-red-400 text-white"}
          variant={"destructive"}
          handleDelete={() => setMapIsActive(null)}
        />
      </div>

      <div className="absolute bottom-4 right-4 z-[999] w-[400px] h-[300px]  bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl   flex flex-col">
        <TabsLocation setTabs={setTabs} tabs={tabs} />

        <div className="flex-1 overflow-y-auto p-2">
          <LocationListTour
            locationTour={filterBy}
            handleDeleteLocation={handleDelete}
            handleClickMaps={handleCLick}
            tab={tabs}
            isActive={isActive}
          />
        </div>
      </div>
      <div className="z-[9999] cursor-pointer absolute top-18 left-4 p-3 rounded-lg">
        <div className="flex items-center gap-5">
          {destinations && (
            <DrawerLocationsAdmin
              value={destinations}
              status={"destination"}
              textRender={"Wisata"}
              handleCheckDestination={handleCLick}
              handleSaveLocation={handleSaveNewLocation}
              isActiveClick={isActive}
            />
          )}
          {hotels && (
            <DrawerLocationsAdmin
              value={hotels}
              status={"hotel"}
              textRender={"Hotel"}
              handleCheckDestination={handleCLick}
              handleSaveLocation={handleSaveNewLocation}
              isActiveClick={isActive}
            />
          )}
        </div>
      </div>
    </div>
  );
}
