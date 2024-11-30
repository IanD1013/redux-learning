import * as actions from './actionTypes';

// export function bugAdded(description) {
//   return {
//     type: actions.BUG_ADDED,
//     payload: { description },
//   };
// }

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: { description },
});