import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
const C = createContext()
export const useTheme = () => useContext(C)
export function ThemeProvider({ children }) {
  const [dark, setDark] = useLocalStorage('sp_dark', false)
  return <C.Provider value={{ dark, setDark }}>{children}</C.Provider>
}
