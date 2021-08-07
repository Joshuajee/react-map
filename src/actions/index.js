import { MAP, DIRECTIONAL_RESPONSE } from "../constants/action-types";

export function loadMap(payload) {
  return { type: MAP, payload };
}

export function saveDirectionalResponse(payload) {
  return { type: DIRECTIONAL_RESPONSE, payload };
}