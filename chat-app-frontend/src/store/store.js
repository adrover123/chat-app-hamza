import { legacy_createStore as createStore } from "redux"; // Fix createStore import

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_HISTORY":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

const store = createStore(chatReducer);
export default store;
