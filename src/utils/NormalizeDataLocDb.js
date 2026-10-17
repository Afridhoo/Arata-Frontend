import calcDistanceDuration from "@/utils/calcDistanceDuration";


export const NormalizeDataLineRoad = (value) => {
  if (!value.coordinatesListLoc) return [];
  const { coordinatesListLoc } = value;

  const { segment } = coordinatesListLoc;
  const { distance, duration, steps } = segment || {};

  const allDuration = calcDistanceDuration({ distance, duration });
  const valSteps = steps?.map((el) => ({
    address: el.instruction,
    coordinates: el.way_points,
    description: el.name,
    label: calcDistanceDuration({
      distance: el.distance,
      duration: el.duration,
    }),
  }));

  return { allDuration, valSteps };
};
