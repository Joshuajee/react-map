import { MAP, DIRECTIONAL_RESPONSE, ORIGIN, DESTINATION } from "../constants/action-types";

export function loadMap(payload) {
  console.log("load map", payload)
  return { type: MAP, payload };
}

export function saveDirectionalResponse(payload) {
  console.log("load directions", payload)
  return { type: DIRECTIONAL_RESPONSE, payload };
}

export function saveOrigin(payload) {
  console.log("save origin", payload)
  return { type: ORIGIN, payload };
}

export function saveDestination(payload) {
  console.log("save destination", payload)
  return { type: DESTINATION, payload };
}