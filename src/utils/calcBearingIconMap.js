export default function calculateBearing(startLat, startLng, endLat, endLng) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const φ1 = toRad(startLat);
  const φ2 = toRad(endLat);
  const Δλ = toRad(endLng - startLng);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);

    

  return (toDeg(θ) + 360) % 360; // hasil 0–360 derajat
}
