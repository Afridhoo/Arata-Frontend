

export function ApiPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        const latlng = [coords.longitude, coords.latitude];

        resolve(latlng);
      },

      (err) => reject(err.message),
    );
  });
}

export function getCoordinatesMe(saveCoords) {
  return ApiPosition()
    .then((el) => saveCoords(el))
    .catch((err) => saveCoords(err));
}
