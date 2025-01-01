export default (state, action) => {
    switch (action.type) {
        case 'addMovieToFavoriteList':
            return {
                ...state,
                favoriteList: [action.payload, ...state.favoriteList]
            }
        case 'removeMovieFromFavoriteList':
            return {
                ...state,
                favoriteList: state.favoriteList.filter(movie => movie.id !== action.payload)
            }
        default:
            return state
    }
}
