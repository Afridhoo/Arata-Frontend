export default function calcDistanceDuration({distance = 0 , duration = 0}) {
  

  const distanceKm = distance / 1000;

  const totalMinutes = Math.round(duration / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let formattedDuration;

  if (hours === 0) {
    formattedDuration = `${minutes} menit`;
  } else if (minutes === 0) {
    formattedDuration = `${hours} jam`;
  } else {
    formattedDuration = `${hours} jam ${minutes} menit`;
  }

  

  return {
    distance: `${distanceKm.toFixed(1)} km`,
    duration: formattedDuration,
  };


}