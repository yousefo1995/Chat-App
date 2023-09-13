import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const storedData = JSON.parse(localStorage.getItem("chat"));
  const initialState = storedData
    ? storedData
    : {
        chatId: "null",
        user: {},
      };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE-USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const stateForLocalStorageg = JSON.stringify(state);
    localStorage.setItem("chat", stateForLocalStorageg);
  }, [state]);
  return (
    <ChatContext.Provider value={{ dispatch, data: state }}>
      {children}
    </ChatContext.Provider>
  );
};
