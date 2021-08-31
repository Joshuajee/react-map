import { MAP, ROUTE, ORIGIN, DESTINATION, DISTANCE, TIME } from "../constants/action-types";

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

export function saveDistance(payload) {
  console.log("save distance", payload)
  return { type: DISTANCE, payload };
}

export function saveTime(payload) {
  console.log("save time", payload)
  return { type: TIME, payload };
}