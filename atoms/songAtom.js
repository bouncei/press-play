import { atom } from "recoil";

export const currentTrackId = atom({
  key: "currentTrackId", //Unique ID(with respect to other atoms/selectors)
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
