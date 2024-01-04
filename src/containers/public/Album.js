import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { AudioLoading, Lists } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { BsFillPlayFill } from 'react-icons/bs'

const Album = () => {
    const { isPlaying } = useSelector(app => app.music)
    const { pid } = useParams()
    const [playlistData, setPlaylistData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid))
        const fetchDetailPlaylist = async () => {
            // loading khi đang lấy api 
            dispatch(actions.loading(true))
            const response = await apis.apiGetDetaiPlaylist(pid)
            // khi có data rồi đ loading nữa
            dispatch(actions.loading(false))
            //console.log(response)
            if (response?.data.err === 0) {
                setPlaylistData(response.data?.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song.items))
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    useEffect(() => {
        console.log(location?.state?.playAlbum);
        if (location.state?.playAlbum) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.total) - 1;
            console.log(randomSong);
            dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
            );
            dispatch(actions.play(true));
        }
    }, [pid, playlistData]);

    return (
        <div className='flex gap-8 w-full mt-[90px] h-full px-[59px] animate-scale-center'>
            
            <div className='flex-none w-1/4 flex flex-col items-center gap-2' >
                <div className='w-full relative overflow-hidden'>
                    <img
                        src={playlistData?.thumbnailM}
                        alt="thumbnail"
                        className={`w-full object-contain 
                        ${isPlaying
                                ? 'rounded-full animate-rotate-center'
                                : 'rounded-md animate-rotate-center-pause'} shadow-md`}
                    />

                    <div className='absolute top-0 bottom-0 right-0 left-0 hover:bg-overlay-30 flex items-center justify-center'>
                        <span className='p-3 border border-white rounded-full'>
                            {
                                isPlaying ? <AudioLoading />
                                    : <BsFillPlayFill size={20} color='white' />
                            }
                        </span>
                    </div>
                </div>
                <div className='flex flex-col '>
                    <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
                    <span className='flex gap-2 items-center text-gray-500 text-xs'>
                        <span>Cập nhật:</span>
                        <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </span>
                    <span className='flex gap-2 items-center text-gray-500 text-xs'>{playlistData?.artistsNames}</span>
                    <span className='flex gap-2 items-center text-gray-500 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
                </div>
            </div>
            <Scrollbars style={{ width: '100%', height: '80%' }}>
                <div className='flex-auto mb-40'>
                    <span className='text-sm'>
                        <span className='text-gray-600'>Lời tựa </span>
                        <span>{playlistData?.sortDescription}</span>
                    </span>
                    <Lists songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    )
}

export default Album