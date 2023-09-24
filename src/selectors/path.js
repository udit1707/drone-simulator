import { createSelector } from "reselect";

const baseState = (state) => state.path;

export const allPathSelector = createSelector(baseState, (state) => ({
  paths: state.paths,
}));
