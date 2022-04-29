export function distance(geo1, geo2) {
  let a = Number(geo1.lat) - Number(geo2.lat);
  let b = Number(geo1.long) - Number(geo2.long);
  return Math.sqrt(a * a + b * b).toFixed(3);
}
