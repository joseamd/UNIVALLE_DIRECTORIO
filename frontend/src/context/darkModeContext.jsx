import { createContext, useReducer, useEffect } from "react";
import DarkModeReducer from "./darModeReducer";

// Estado inicial: revisa localStorage primero
const CONTEXT_KEY = window.location.pathname.startsWith("/directorio/admin")
  ? "darkModeAdmin"
  : "darkModePublic";

const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem(CONTEXT_KEY)) ?? false,
};

// Crear el contexto
export const DarkModeContext = createContext(INITIAL_STATE);

// Proveedor del contexto
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  // Guardar en localStorage cada vez que cambia darkMode
  useEffect(() => {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
