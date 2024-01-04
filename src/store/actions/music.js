import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag,
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs,
});

export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag,
});

export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data,
});

export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid,
});


export const setRecentSong = (data) => ({
    type: actionTypes.SET_RECENT_SONG,
    data,
});

export const setRecent= (data) => ({
    type: actionTypes.SET_RECENT,
    data,
});

export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response.data.data,
                keyword,
            });
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null,
        });
    }
};

export const getSearchSong = (singerId) => async (dispatch) => {
    try {
        const response = await apis.apiGetArtistSongs(singerId);
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: response.data.data.items,
            });
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null,
        });
    }
};

export const getSearchSongs = (pid) => async (dispatch) => {
    // 1 hàm return ra 1 hàm nữa tham số của hàm đó là dispatch (cái này redux thunk middlewwhare )
    // cái được dispatch là pid
    try {
        const response = await apis.apiGetDetaiPlaylist(pid)
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: response.data?.data?.song?.items
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null
        })
    }
}

