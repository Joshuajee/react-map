import { MAP, ROUTE, ORIGIN, DESTINATION } from "../constants/action-types";

export function loadMap(payload) {
  console.log("load map", payload)
  return { type: MAP, payload };
}

export function saveRoute(payload) {
  console.log("load Route", payload)
  return { type: ROUTE, payload };
}

export function saveOrigin(payload) {
  console.log("save origin", payload)
  return { type: ORIGIN, payload };
}

export function saveDestination(payload) {
  console.log("save destination", payload)
  return { type: DESTINATION, payload };
}