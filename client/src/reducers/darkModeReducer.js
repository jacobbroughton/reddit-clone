import { loadState } from "../localStorage"

// *
// Initial State
// **
// const initialState = loadState('darkModeState') || false;

export const darkModeReducer = (state = loadState('darkModeState') || false, action) => {
  switch(action.type) {
    case "TOGGLE_DARK_MODE": 
      return !state
    default : { 
      return state
    }
  }
}

export const toggleDarkMode = () => async (dispatch, action) => {
  dispatch({ type: "TOGGLE_DARK_MODE" })
}