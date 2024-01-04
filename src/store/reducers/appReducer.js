
import actionTypes from "../actions/actionTypes";

const initState = {
    banner: null,
    friday: null,
    artists: null,
    loveLife: null,
    top100: null,
    liveRadio: null,
    hotAlbum: null,
    isLoading: false,
    newRelease: null,
    newEveryday: null,
    newMusic: null,
    weekChart: null,
    favoritedArtist: null,
    chart: null,
    rank: null,
    singers: null,
    scrollTop: true

}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            console.log(action);
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || null,
                artists: action.homeData?.find(item => item.sectionId === "hArtistTheme") || null,
                loveLife: action.homeData?.find(item => item.sectionId === "hEditorTheme2") || null,
                top100: action.homeData?.find(item => item.sectionId === "h100") || null,
                liveRadio: action.homeData?.find(item => item.sectionId === "hLiveRadio") || null,
                hotAlbum: action.homeData?.find(item => item.sectionId === "hAlbum") || null,
                newRelease: action.homeData?.find(item => item.sectionType === "new-release") || null,
                newEveryday: action.homeData?.find(item => item.sectionId === "hNewrelease") || null,
                newMusic: { ...action.homeData?.find(item => item.sectionId === "hAlbum") } || null,
                weekChart: action.homeData?.find((item) => item.sectionType === "weekChart")?.items || null,
                favoritedArtist: action.homeData?.find(item => item.sectionId === "hEditorTheme3") || null,
                chart: action.homeData?.find(item => item.sectionId === "hZC")?.chart || null,
                rank: action.homeData?.find(item => item.sectionId === "hZC")?.items || null,
                singers: action.homeData?.find(item => item.sectionId === "hEditorTheme4")?.items[0]?.artists || null,//artistSpotlight
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        case actionTypes.ZERO_SCROLLTOP:
            return {
                ...state,
                scrollTop: action.flag
            }

        default:
            return state
    }
}

export default appReducer