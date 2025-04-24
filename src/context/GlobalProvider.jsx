import React, { createContext, useReducer, useEffect, useState } from 'react'
import AppReducer from './AppReducer'

const initialState = {
    favoriteList: localStorage.getItem('favoriteList') ? JSON.parse(localStorage.getItem('favoriteList')) : []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
    }, [state])

    const addMovieToFavoriteList = (id) => {
        dispatch({ type: 'addMovieToFavoriteList', payload: id })
    }
    const removeMovieFromFavoriteList = (id) => {
        dispatch({ type: 'removeMovieFromFavoriteList', payload: id })
    }

    return (
        <GlobalContext.Provider
            value={{
                favoriteList: state.favoriteList,
                addMovieToFavoriteList,
                removeMovieFromFavoriteList
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}