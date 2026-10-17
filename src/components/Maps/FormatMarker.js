export const formatMarkerCoords = (value) =>
  value?.map((el) => ({
    ...el,
    guideReady: el?.guideReady?.map((g) => ({
      ...g,
      isActiveHandle: el.status === "ongoing",
    })),
    id: el._id,
    lat: el.coordinates[1],
    lon: el.coordinates[0],
  }));
