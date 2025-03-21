import { createContext, useEffect, useReducer } from "react";
export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  const storedData = localStorage.getItem("my-splash-data");
  try {
    return JSON.parse(storedData) || { likedImages: [], downloadImages: [] };
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return {
      likedImages: [],
      downloadImages: []
    };
  }
}

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LIKE":
      return {
        ...state,
        likedImages: [...state.likedImages, payload],
      };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => image.id !== payload)
      };
    case "DOWNLOAD":
      return {
        ...state,
        downloadImages: [...state.downloadImages, payload],
      };
    case "REMOVE_DOWNLOAD":
      return {
        ...state,
        downloadImages: state.downloadImages.filter((image) => image.id !== payload)
      };
    default:
      return state;
  }
}

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage())

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state))
  }, [state])

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
