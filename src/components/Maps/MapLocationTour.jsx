import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  BusMarker,
  FitBounds,
  IconDestination,
  IconHotel,
  MapView,
  MarkerCords,
} from "../../features/tours/components/TourComponents/MapHandler";
import { useRef, useState } from "react";

import RenderListLocationsMap from "../../features/tours/components/TourComponents/RenderListLocationsMap";
import { BsFullscreen, BsXCircleFill } from "react-icons/bs";
import { DrawerSimpelUse } from "@/components/DrawerSimpelUse";

import { FiCamera } from "react-icons/fi";
import { FaHotel } from "react-icons/fa";
import { UseGetLineRoad } from "@/admin/MonitoringAllTrip/UseGetTrip";
import { DrawerForBusLocation } from "@/components/DrawerForBusLocation";
import { LucideRoute } from "lucide-react";
import { formatMarkerCoords } from "./FormatMarker";
import { Button } from "../ui/button";
import LabelHeader from "../LabelHeader";

export default function MapLocationTour({
  tour,
  isFullMap,
  setIsFullMap,
  coordsBus,
  dateBusUpdateLast,
  nameObjectiveLocation,
  noRenderLine,
}) {
  const { mutate: InsertLatlng, data: LineRoad } = UseGetLineRoad();
  const { startLocation, locations, isActiveTripTour, dateFinished } = tour;

  const { coordinates } = startLocation;
  const refLocations = useRef({});
  const [location, setLocationActive] = useState(null);
  const [coorLineBus, setCoordLineBus] = useState(null);
  const [getWayPoints, setWayPoints] = useState(null);

  const { destination = [], hotel = [] } = locations || {};
  const concatVal = [...destination, ...hotel];

  function handleClickMaps(coords, idLoc) {
    const getRefOn = refLocations.current[idLoc];
    setLocationActive(coords);

    if (getRefOn) getRefOn.openPopup();
  }

  function handleIsOpenFullMap() {
    setIsFullMap(true);
    if (!noRenderLine) {
      const getCoordsLoc = concatVal?.map((el) => el.coordinates);
      if (!coordsBus) InsertLatlng({ coordinates: getCoordsLoc });
      if (coordsBus)
        InsertLatlng({ coordinates: getCoordsLoc, coordsBus: coordsBus });
    }
  }

  function handleWayPoints(waypoints) {
    const { line } = LineRoad.coordinatesBus;

    const getLastLine = line?.[line?.length - 1];
    const [start, end] = waypoints;
    const getFinalWaypoints = line?.slice(start, end);

    const [lat, lng] =
      getFinalWaypoints[getFinalWaypoints.length - 1] || getLastLine;
    setLocationActive([lng, lat]);
    setCoordLineBus(getFinalWaypoints);
    setWayPoints(waypoints);
  }

  return (
    <section className="py-20 border-b border-gray-100">
      <LabelHeader title={"Rute Perjalanan"} desc={"Peta Lokasi"} />

      <div className="pt-5 flex  gap-8 items-start">
        <div
          className={` ${
            isFullMap
              ? "fixed inset-0 z-[9]  md:max-w-full md:max-h-full "
              : "relative z-[1] max-w-full w-xl h-[350px] md:h-[480px] rounded-2xl border border-gray-200"
          }`}
        >
          <MapContainer
            center={[coordinates?.[1] || 0, coordinates?.[0] || 0]}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
            {!isFullMap && (
              <span
                className="z-[9999] flex items-center gap-2 cursor-pointer absolute top-3 left-3 px-4 py-2.5 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                onClick={handleIsOpenFullMap}
              >
                <BsFullscreen className="w-3.5 h-3.5" />
                <p>Full Map</p>
              </span>
            )}

            {isFullMap && (
              <div className=" z-999  md:right-0 right-1 top-11  absolute md:top-18 md:left-10 md:p-3 ">
                <div className="flex md:p-0 p-3 gap-5 ">
                  <Button variant="outline" onClick={() => setIsFullMap(false)}>
                    <BsXCircleFill className="w-3.5 h-3.5" />
                    <p>Tutup</p>
                  </Button>

                  <div className="flex flex-wrap w-full gap-3 md:justify-normal justify-end  items-center">
                    <DrawerSimpelUse
                      setValue={handleClickMaps}
                      icon={<FiCamera />}
                      isActiveTripTour={isActiveTripTour}
                      RenderValue={destination}
                      title={"List Lokasi Wisata"}
                      description={
                        "Perjalanan Yang Akan Di Ikuti Oleh Rombongan"
                      }
                      buttonText={"Lihat Wisata"}
                      isActiveCoordinates={location}
                      isFinishTour={dateFinished}
                    />

                    <DrawerSimpelUse
                      setValue={handleClickMaps}
                      icon={<FaHotel />}
                      isActiveTripTour={isActiveTripTour}
                      RenderValue={hotel}
                      title={"List Penginapan"}
                      isActiveCoordinates={location}
                      isFinishTour={dateFinished}
                      description={
                        "Tempat Istirahat Rombongan Selama Tour Berjalan"
                      }
                      buttonText={"Lihat Hotel"}
                    />

                    {isFullMap && LineRoad?.coordinatesBus?.line && (
                      <DrawerForBusLocation
                        buttonText={"Rute Perjalanan"}
                        icon={<LucideRoute />}
                        Line={LineRoad}
                        handleWayPoints={handleWayPoints}
                        isActive={getWayPoints}
                        title={nameObjectiveLocation}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {coordsBus && (
              <BusMarker
                position={coordsBus[0]}
                destLocation={coordsBus[1]}
                date={dateBusUpdateLast}
                desc={nameObjectiveLocation}
              />
            )}

            {LineRoad?.coordinatesListLoc?.line && (
              <Polyline
                positions={LineRoad?.coordinatesListLoc?.line}
                pathOptions={{
                  color: "#374151",
                  weight: 2.5,
                  dashArray: "6,8",
                }}
              />
            )}

            {coorLineBus && (
              <Polyline
                positions={coorLineBus}
                pathOptions={{
                  color: "red",
                  weight: 10,
                }}
              />
            )}
            {coordsBus && LineRoad?.coordinatesBus?.line && (
              <Polyline
                positions={LineRoad?.coordinatesBus?.line}
                pathOptions={{
                  color: "orange",
                  weight: 5,
                  dashArray: "6,8",
                }}
              />
            )}

            <FitBounds locations={concatVal} />
            <MapView coordinates={location} />

            <MarkerCords
              value={formatMarkerCoords(destination)}
              handleCLickMaps={handleClickMaps}
              ref={refLocations}
              icon={IconDestination}
              isActiveTripTour={isActiveTripTour}
            />
            <MarkerCords
              value={formatMarkerCoords(hotel)}
              handleCLickMaps={handleClickMaps}
              ref={refLocations}
              icon={IconHotel}
              isActiveTripTour={isActiveTripTour}
            />
          </MapContainer>
        </div>

        <div className="w-full lg:w-2/5 hidden md:flex flex-col gap-8 h-[480px] overflow-y-auto">
          <RenderListLocationsMap
            title={"Wisata"}
            isFinishTour={dateFinished}
            value={destination}
            setLocationActive={handleClickMaps}
            isActiveTripTour={isActiveTripTour}
          />
          <RenderListLocationsMap
            title={"Penginapan"}
            value={hotel}
            isFinishTour={dateFinished}
            setLocationActive={handleClickMaps}
            isActiveTripTour={isActiveTripTour}
          />
        </div>
      </div>
    </section>
  );
}
