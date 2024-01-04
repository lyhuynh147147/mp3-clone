import React, { useEffect, useState } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { apiGetDetaiPlaylist } from '../apis';
import { Scrollbars } from 'react-custom-scrollbars-2';

const { ImBin } = icons;

const SidebarRight = () => {

  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } =
    useSelector((state) => state.music);
  //console.log(recentSongs);

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetaiPlaylist(curAlbumId);
    if (response?.data.err === 0) setPlaylist(response.data.data?.song?.items)
  }

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [isPlaying, curAlbumId]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);

  //onsole.log(playlist)
  return (
    <div className='flex flex-col text-xs w-full'>
      <div className='h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex justify-between items-center'>
        <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] py-[6px] cursor-pointer'>
          <span
            className={`px-[5px] ${!isRecent && 'bg-main-100 text-main-500'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
            onClick={() => setIsRecent(prev => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`px-[5px] ${isRecent && 'bg-main-100 text-main-500'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
            onClick={() => setIsRecent(prev => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className='p-2 rounded-full cursor-pointer bg-main-100 hover:bg-[hsla(0,0%,100%,0.3)]'>
          <ImBin size={14} />
        </span>
      </div>

      {isRecent
        ? <div className='w-full flex-col flex-auto flex px-2'>
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            {recentSongs &&
              <div className='flex flex-col'>
                {
                  recentSongs?.map((item, index) => (
                    <SongItem
                      key={index}
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artists}
                      sid={item?.sid}
                      size="h-[40px] w-[40px]"
                    />
                  ))}
              </div>
            }
          </Scrollbars>
        </div>
        : <div className='w-full flex-col flex-auto flex px-2'>
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            {
              curSongData && <SongItem
                thumbnail={curSongData?.thumbnail}
                title={curSongData?.title}
                artists={curSongData?.artistsNames}
                sid={curSongData?.encodeId}
                size="h-[40px] w-[40px]"
                style={"bg-main-500 text-white"}
              />
            }
            <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
              <span className='text-sm font-bold'>Tiếp theo</span>
              <span className='opacity-70 text-xs flex gap-1'>
                <span>Từ Playlist</span>
                <span className='font-medium text-main-500'>{curSongData?.album?.title}</span>
              </span>
            </div>
            {playlist &&
              <div className='flex flex-col'>
                {
                  playlist?.map((item, index) => (
                    <SongItem
                      //key={index}
                      key={item.encodeId}
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artistsNames}
                      sid={item?.encodeId}
                      size="h-[40px] w-[40px]"
                    />
                  ))}
              </div>
            }
          </Scrollbars>
        </div>
      }
      <div className='w-full h-[90px]'></div>
    </div>
  )
}

export default SidebarRight