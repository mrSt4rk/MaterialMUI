import { createContext, useState } from 'react';


export const AppThemeContext = createContext({});
export const AppThemeProvider = (props) => {

  const [direction, setDirection] = useState('ltr');

  return (
    <AppThemeContext.Provider value={{ direction, setDirection }}>
      {props.children}
    </AppThemeContext.Provider>
  )
}