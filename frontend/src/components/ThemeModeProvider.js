import  React, {useEffect, useState, useMemo} from "react"
import PropTypes from "prop-types"
import {ThemeProvider, createTheme} from "@mui/materials"
import { ThemeModeContext } from "src/context/ThemeModeProvider"

export const ThemeContext=React.createContext({
    toggleThemeMode:()=>{}
})

const getDesignTokens=(node)=>{
    return {
        palette:{
            mode
        }
    }
}
export default function ThemeModeProvider({children}){
    const [mode, setMode]=useState("light")

    useEffect(()=>{
        const saveMode=localStorage.getItem('themeMode') || 
        "light";
        setMode(saveMode);
    }, [setMode]);

    useEffect(()=>{
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    const themeMode=useMemo(()=>{
        return {
            toggleThemeMode:()=>{
                setMode((prevMode)=>{
                    if (prevMode === "light"){
                        return "dark"
                    }
                    return "light"
                })
            }
        }
    })

    const theme=useMemo(()=>{
        return createTheme(getDesignTokens(mode));
    }, [mode])
    return (
        <ThemeModeContext.Provider value={themeMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}
ThemeProvider.propTypes={
    children:PropTypes.node
}
