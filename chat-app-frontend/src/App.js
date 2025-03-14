import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
};

export default App;
