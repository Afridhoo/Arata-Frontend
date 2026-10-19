import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {
  BusMarker,
  IconDestination,
  IconHotel,
  IconStartLocation,
  MapView,
  MarkerCords,
} from "../../features/tours/components/TourComponents/MapHandler";
import { useRef, useState } from "react";
import { FiMaximize, FiX } from "react-icons/fi";
import ListLocations from "./Components/ListLocations";
import { DrawerForBusLocation } from "@/components/DrawerForBusLocation";
import {
  LucideCamera,
  LucideHotel,
  LucideRoute,
  LucideUsers2,
} from "lucide-react";
import DisplayUser from "@/components/DisplayUser";
import { DrawerSimpelUse } from "@/components/DrawerSimpelUse";
import { formatMarkerCoords } from "@/components/Maps/FormatMarker";
import { DrawerGuide } from "@/components/DrawerGuide";

export default function RenderMapAllTrip({
  TourActiveTrip,
  LineRoad,
  setToursActiveClick,
  handleGetGuide,
  GuideUser,
  toursActiveClick,
  groupLocation,
}) {
  const [changePosition, setChangePosition] = useState(0);
  const [isFullMap, setIsFullMap] = useState(null);
  const [tripRuteClick, setTripRuteClick] = useState(null);
  const [lineBus, setLineBus] = useState(null);

  const refClauster = useRef();
  const refStartLocation = useRef({});

  const refListLocations = useRef({});

  const { _id: stateTour, name, locations } = toursActiveClick || {};

  const { coordinatesBus, coordinatesListLoc } = LineRoad || {};

  const { destination, hotel } = locations || {};
  const concatVal = [...(destination || []), ...(hotel || [])];
  const getListLocations = concatVal?.find((e) => e.status === "ongoing");

  const getStartLocation = TourActiveTrip?.flatMap(
    (el) => el.startLocation,
  ).map((loc, idx) => ({ ...loc, id: TourActiveTrip[idx]._id }));

  const getTour = (idTour) => TourActiveTrip?.find((x) => x._id === idTour);

  function handleStartLocActive(idTour) {
    const getDataTour = getTour(idTour);

    const { _id: newTour, startLocation } = getDataTour || {};
    const { coordinates } = startLocation || [];

    const cheking = stateTour === newTour;

    if (!cheking) handleGetGuide({ getIdActive: idTour });

    setChangePosition(coordinates);
    setToursActiveClick(getDataTour);
  }

  //  Don't Use Coords For Get Coordinates !!
  function handleLocActive(coords, locId) {
    const getAllLoc = TourActiveTrip?.flatMap((s) =>
      [...s.locations.destination, ...s.locations.hotel].map((x) => ({
        ...x,
        idTour: s._id,
      })),
    );

    const getValidCoords = getAllLoc.find((s) => s._id === locId);
    const { coordinates, idTour } = getValidCoords || {};

    const getDataTour = getTour(idTour) || {};
    const checklastClick = concatVal.find((s) => s._id === locId);

    if (!checklastClick && !toursActiveClick) {
      handleGetGuide({ getIdActive: idTour });
      setToursActiveClick(getDataTour);
    }

    if (coordinates) setChangePosition(coordinates);

    const getRefLoc = refListLocations.current[locId];
    if (getRefLoc) getRefLoc.openPopup();
  }

  function handleRefStartLocations(tourId) {
    const getStartLocActive = refStartLocation.current[tourId];

    const getClausterActive =
      refClauster.current.getVisibleParent(getStartLocActive);

    if (!getClausterActive) return handleStartLocActive(tourId);

    if (typeof getClausterActive.spiderfy === "function") {
      getClausterActive.spiderfy();
    } else getStartLocActive.openPopup();
  }

  function handleSpiderfyClausterActive(e) {
    const layer = e.layer;
    const childClauster = layer.getAllChildMarkers();

    const getCoords = childClauster
      ?.flatMap((el) => el.options)
      .find((loc) => loc.tourId);

    if (getCoords) {
      const { tourId } = getCoords;
      const cheking = tourId === stateTour;

      if (!cheking) {
        handleGetGuide({ getIdActive: tourId });
        handleStartLocActive(tourId);
      }
    }
  }

  function getLineClick(wayPoint) {
    const [start, end] = wayPoint;

    const getRoad = coordinatesBus?.line.slice(start, end + 1);
    const [lat, lng] = getRoad[getRoad?.length - 1];
    setChangePosition([lng, lat]);
    setTripRuteClick(wayPoint);
    setLineBus(getRoad);
  }

  return (
    <div
      className={`overflow-hidden h-130 md:w-full  md:h-full ${
        isFullMap
          ? "fixed inset-0 z-[20]  rounded-none"
          : "relative z-[1]  rounded-xl border border-gray-200"
      }`}
    >
      <div
        className={`w-full  ${isFullMap ? "md:h-full" : "h-[650px]"} border border-emerald-100 rounded-2xl overflow-hidden shadow-2xl bg-slate-50 `}
      >
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[-2.5489, 118.0149]}
          zoom={5}
          zoomControl={false}
        >
          <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />

          {lineBus && (
            <Polyline
              positions={lineBus}
              key={JSON.stringify(lineBus)}
              color="#000000"
              weight={6}
              opacity={0.8}
              dashArray="8,8"
            />
          )}

          {coordinatesBus && (
            <>
              <BusMarker
                position={groupLocation.groupLocation}
                destLocation={groupLocation.destinationLocation}
                date={groupLocation.uploadAt}
                desc={name}
              />
              <Polyline
                positions={coordinatesBus.line}
                key={JSON.stringify(coordinatesBus.line)}
                color="#f97316"
                weight={5}
                opacity={0.9}
                dashArray="10,6"
              />
            </>
          )}

          {coordinatesListLoc && (
            <Polyline
              positions={coordinatesListLoc.line}
              key={JSON.stringify(coordinatesListLoc.line)}
              color="#3b82f6"
              weight={4}
              opacity={0.8}
              dashArray="8, 8"
            />
          )}

          <MarkerClusterGroup
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            ref={refClauster}
            onClick={(e) => handleSpiderfyClausterActive(e)}
          >
            {TourActiveTrip?.map((el, idx) => {
              const { startLocation, _id } = el;
              const { coordinates: cordStart, description } = startLocation;
              const { destination, hotel } = el.locations;

              const getHandleGuide = destination?.map((el) => ({
                ...el,
                guideReady: GuideUser?.getGuide
                  ?.filter((g) =>
                    g.destHandle.find((dest) => dest._id === el._id),
                  )
                  ?.map((s) => ({ identity: s.guideIdentity })),
              }));

              return (
                <div key={idx}>
                  <Marker
                    position={[cordStart[1], cordStart[0]]}
                    icon={IconStartLocation}
                    ref={(e) => {
                      refStartLocation.current[_id] = e;
                    }}
                    tourId={_id}
                    startloc={cordStart}
                  >
                    <Popup>Lokasi Tujuan {description}</Popup>
                  </Marker>

                  {changePosition && <MapView coordinates={changePosition} />}

                  <MarkerCords
                    value={formatMarkerCoords(getHandleGuide)}
                    ref={refListLocations}
                    icon={IconDestination}
                    isActiveTripTour={true}
                    handleCLickMaps={handleLocActive}
                  />
                  <MarkerCords
                    value={formatMarkerCoords(hotel)}
                    ref={refListLocations}
                    icon={IconHotel}
                    isActiveTripTour={true}
                    handleCLickMaps={handleLocActive}
                  />
                </div>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      <div
        className={`bg-white/90 left-2 md:left-6 md:bottom-10 bottom-1 absolute z-[9999] backdrop-blur-sm rounded-xl border border-emerald-100 shadow-xl p-2 md:p-4 flex flex-col max-h-60 overflow-y-auto`}
      >
        <ListLocations
          handleClickStart={handleRefStartLocations}
          headerText={"Pemantauan Status Lokasi Wisata"}
          subText={"Pantau Perjalanan Lokasi Aktif"}
          valueRender={getStartLocation}
          idTourActive={stateTour}
        />
      </div>

      <span
        onClick={() => {
          isFullMap ? setIsFullMap(null) : setIsFullMap(true);
        }}
        className={`bg-white/90 ${isFullMap ? "left-7 md:left-9" : "left-8 md:left-10"} top-15  md:top-10 hidden md:absolute z-[9999] backdrop-blur-sm rounded-xl border border-emerald-100 shadow-xl p-4  max-h-60 `}
      >
        {isFullMap ? <FiX /> : <FiMaximize />}
      </span>

      <div className="z-[9999]  max-w-full overflow-x-auto cursor-pointer absolute top-10  right-1  ">
        <div className="grid gap-3">
          <span className="flex gap-2">
            {LineRoad && (
              <DrawerForBusLocation
                buttonText={"Rute Perjalanan"}
                icon={<LucideRoute />}
                Line={LineRoad}
                handleWayPoints={getLineClick}
                title={getListLocations?.description}
                noPadding={true}
                isActive={tripRuteClick}
              />
            )}
            {GuideUser && GuideUser?.getUser && (
              <DisplayUser
                UserBooking={GuideUser?.getUser}
                icon={<LucideUsers2 size={12} />}
                nameTour={toursActiveClick?.name}
              />
            )}
            {GuideUser && GuideUser?.getGuide && (
              <DrawerGuide
                title={toursActiveClick?.name}
                guide={GuideUser?.getGuide}
              />
            )}
          </span>
          <span className="flex gap-2">
            {destination && (
              <DrawerSimpelUse
                setValue={handleLocActive}
                icon={<LucideCamera />}
                isActiveTripTour={true}
                noPt={true}
                RenderValue={destination}
                title={"List Lokasi Wisata"}
                description={"Perjalanan Yang Akan Di Ikuti Oleh Rombongan"}
                buttonText={"Lihat Wisata"}
                isActiveCoordinates={changePosition}
              />
            )}
            {hotel && (
              <DrawerSimpelUse
                setValue={handleLocActive}
                icon={<LucideHotel />}
                isActiveTripTour={true}
                noPt={true}
                RenderValue={hotel}
                title={"List Penginapan"}
                description={"Tempat Istirahat Rombongan Selama Tour Berjalan"}
                buttonText={"Lihat Akomodasi"}
                isActiveCoordinates={changePosition}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
