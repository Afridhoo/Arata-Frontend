import { useEffect, useState } from "react";
import { FiCheckCircle, FiSearch } from "react-icons/fi";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
  Polygon,
} from "react-leaflet";
import {
  FitBounds,
  IconDestination,
  IconDestinationActive,
  IconHotel,
  IconHotelsActive,
  MapView,
  MarkerCords,
  PopUpDisplay,
} from "../../../../features/tours/components/TourComponents/MapHandler";
import {
  UseGetLocation,
  UseGetLocationDestination,
} from "../../hooks/useTourAdmin";
import ListLocations from "./ListLocations";
import LocationListTour from "./LocationListTour";
import {
  displayResultSearch,
  handleCoords,
} from "../../../utils/FormatMapView";
import TabsLocation from "./TabsLocation";
import { useRef } from "react";

import { DrawerLocationsAdmin } from "@/components/DrawerForLocationsAdmin";
import { toast } from "sonner";
import { SpinnerBtn } from "@/components/SpinnerBtn";

export default function MapsContainer({
  saveLocationsFinal,
  valueLocationsFinal,
  setMapsActive,
  setStartLocations,
}) {
  const {
    mutate: insertSearch,
    data: listLocationSearch,
    isPending,
  } = UseGetLocation();
  const { mutate: insertDestination, data: resultLocationSearch } =
    UseGetLocationDestination();

  const refLocations = useRef({});

  const [position, setPosition] = useState();
  const [search, handleSearch] = useState("");
  const [saveLocation, setSaveLocation] = useState([]);
  const [polygone, setPolygone] = useState();
  const [tabs, setTabs] = useState("destination");
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    if (!search) return;
    const time = setTimeout(() => insertSearch({ search }), 2000);
    return () => clearTimeout(time);
  }, [search]);

  const { destinations, hotels } = resultLocationSearch || {};

  const concatValue = [...(valueLocationsFinal || []), ...(saveLocation || [])];
  const filterBy = concatValue?.filter((el) => el?.typeLocation === tabs);

  function handleSaveLocationsFinal() {
    const getValue = (val) =>
      concatValue?.filter((el) => el.typeLocation === val);
    const hotels = getValue("hotel");
    const destinations = getValue("destination");

    saveLocationsFinal([...(hotels || []), ...(destinations || [])]);
    setMapsActive(null);
  }

  const cordsDestination = handleCoords(destinations);
  const cordsHotels = handleCoords(hotels);

  const cordsListLocation = listLocationSearch?.map((el) => ({
    coordinates: [el?.lon, el?.lat],
    name: el?.name,
  }));

  function handleSetLocationTour(value) {
    const resultSearch = displayResultSearch(value);
    const { latlng, polygon, startLocation } = resultSearch;
    setStartLocations(startLocation);
    setPolygone(polygon);
    insertDestination({ latlng });
  }

  function handleCLickMaps(latlng, place_id = undefined) {
    setPosition(latlng);
    setIsActive(place_id);

    const getRefActive = refLocations.current[place_id];
    if (getRefActive) getRefActive.openPopup();
  }

  function handlePushLocations(value, typeLocations) {
    const { geometry, properties } = value;

    const { coordinates } = geometry;
    const { place_id: idLoc } = properties;
    const cheking = concatValue?.find((e) => e.properties.place_id === idLoc);

    if (cheking)
      return toast.error(
        `Lokasi ${cheking?.properties?.name} Sudah Ada Di Dalam List`,
      );

    const format = { geometry, properties, typeLocation: typeLocations };

    handleCLickMaps(coordinates, idLoc);
    setSaveLocation((saveLocation) => [...saveLocation, format]);

    toast.success("Berhasil Menambahkan Lokasi");
  }

  function handleDeleteLocation(id) {
    const cheking = saveLocation.length > 0;

    const handleDelete = (val) =>
      val((loc) => loc.filter((el) => el.properties.place_id !== id));

    if (cheking) handleDelete(setSaveLocation);
    else handleDelete(saveLocationsFinal);
  }

  const getLineMaps = concatValue?.map((el) => [
    el.geometry.coordinates[1],
    el.geometry.coordinates[0],
  ]);

  return (
    <div className="fixed inset-0 z-[9] w-full h-full rounded-none">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />

        <GeoJSON data={polygone} key={JSON.stringify(polygone)} />

        {getLineMaps.length > 0 && (
          <>
            <Polyline positions={getLineMaps} />
            <Polygon positions={getLineMaps} color="red" />
          </>
        )}

        {position && <MapView coordinates={position} />}

        {concatValue &&
          handleCoords(concatValue)?.map((el, idx) => (
            <Marker
              key={idx}
              position={[el.lat, el.lon]}
              ref={(e) => {
                refLocations.current[el.id] = e;
              }}
              icon={
                el.typeLocation === "hotel"
                  ? IconHotelsActive
                  : IconDestinationActive
              }
            >
              <Popup>
                <PopUpDisplay value={el} />
              </Popup>
            </Marker>
          ))}

        {cordsDestination && (
          <MarkerCords
            value={cordsDestination}
            icon={IconDestination}
            handleCLickMaps={handleCLickMaps}
            ref={refLocations}
          />
        )}

        {cordsHotels && (
          <MarkerCords
            value={cordsHotels}
            icon={IconHotel}
            ref={refLocations}
            handleCLickMaps={handleCLickMaps}
          />
        )}

        {cordsListLocation && (
          <div>
            <FitBounds locations={cordsListLocation} />
            {cordsListLocation?.map((el, idx) => (
              <Marker
                key={idx}
                position={[el.coordinates[1], el.coordinates[0]]}
              >
                <Popup>{el.name}</Popup>
              </Marker>
            ))}
          </div>
        )}
      </MapContainer>

      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl px-3.5 py-2.5 w-72 transition-all focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
        <FiSearch className="w-4.5 h-4.5  flex-shrink-0" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Cari lokasi start tour..."
          className="w-full text-sm bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-0 p-0"
        />
      </div>

      <div className="absolute top-4 right-4 z-[1000] w-[400px] max-h-[220px] bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl overflow-hidden flex flex-col">
        {/* Panel Header */}
        <div className="px-3 py-2 border-b border-gray-100 bg-emerald-50/80 gap-2 flex justify-between items-center">
          <span className="text-[11px] font-semibold  uppercase tracking-wider">
            Hasil Pencarian
          </span>

          <SpinnerBtn
            disabled={isPending}
            text={isPending  ? "Mencari Lokasi" : "Simpan Lokasi"}
            
            handleClick={handleSaveLocationsFinal}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <ListLocations
            location={listLocationSearch}
            handleCLickMaps={handleCLickMaps}
            handleSetLocationTour={handleSetLocationTour}
          />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[1000] w-[400px] h-[300px]  bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl overflow-hidden flex flex-col">
        <TabsLocation setTabs={setTabs} tabs={tabs} />

        <div className="flex-1 overflow-y-auto p-2">
          <LocationListTour
            handleClickMaps={handleCLickMaps}
            locationTour={filterBy}
            tab={tabs}
            handleDeleteLocation={handleDeleteLocation}
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
              handleCheckDestination={handleCLickMaps}
              handleSaveLocation={handlePushLocations}
              isActiveClick={isActive}
            />
          )}
          {hotels && (
            <DrawerLocationsAdmin
              value={hotels}
              status={"hotel"}
              textRender={"Hotel"}
              handleCheckDestination={handleCLickMaps}
              handleSaveLocation={handlePushLocations}
              isActiveClick={isActive}
            />
          )}
        </div>
      </div>
    </div>
  );
}
