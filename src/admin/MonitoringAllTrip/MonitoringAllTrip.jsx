import { UseGetSameGuide } from "../../guides/UpdateTourStatus/hooks/UseGetTourGuide";
import { UseGetLineRoad, UseGetTrip } from "./UseGetTrip";
import { useState } from "react";

import RenderMapAllTrip from "./RenderMapAllTrip";
import NewLoading from "@/components/loading/NewLoading";

export default function MonitoringAllTrip() {
  const { data: TourActiveTrip, isPending } = UseGetTrip();
  const { mutate: GetGuideUser, data: GuideUser } = UseGetSameGuide();

  const { mutate: GetRoadLine, data: LineRoad, reset } = UseGetLineRoad();

  const [toursActiveClick, setToursActiveClick] = useState(null);
  const [groupLocation, setGroupLocation] = useState(null);

  if (isPending) return <NewLoading />;

  function handleGetGuide({ getIdActive }) {
    const getTour = TourActiveTrip?.find((el) => el._id === getIdActive);

    const { locations, documentation } = getTour || {};

    const { guide, userBooking, trip } = documentation[0] || {};
    const idUserBooking = userBooking?.map((el) => el.userId);

    const { destination, hotel } = locations || {};

    const allLocCoords = [...destination, ...hotel];
    const getActiveTrip = trip?.[trip.length - 1];
    const { destinationLocation, groupLocation, uploadAt } =
      getActiveTrip || {};

    GetGuideUser({ value: { guide, idUserBooking } });

    if (getActiveTrip) {
      setGroupLocation({ groupLocation, destinationLocation, uploadAt });

      GetRoadLine({
        coordinates: allLocCoords?.map((el) => el.coordinates),
        coordsBus: [groupLocation, destinationLocation],
      });
    } else reset();
  }

  const { coordinatesBus, coordinatesListLoc } = LineRoad || {};

  return (
    <div>
      {TourActiveTrip && (
        <RenderMapAllTrip
          LineRoad={
            Object?.values({ ...coordinatesBus, ...coordinatesListLoc })
              ?.length > 0 && LineRoad
          }
          TourActiveTrip={TourActiveTrip}
          setToursActiveClick={setToursActiveClick}
          handleGetGuide={handleGetGuide}
          GuideUser={GuideUser}
          toursActiveClick={toursActiveClick}
          groupLocation={groupLocation}
        />
      )}
    </div>
  );
}
