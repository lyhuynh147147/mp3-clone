import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import * as apis from '../apis'
import { toast } from 'react-toastify'
import moment from 'moment'
import LoadingSong from './LoadingSong'
import { PiRepeatOnceLight } from 'react-icons/pi'
import { BsMusicNoteList } from 'react-icons/bs'

const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsPauseFill,
  BsFillPlayFill,
  CiShuffle,
  SlVolumeOff,
  SlVolume2,
  SlVolume1
} = icons;

var intervalId

const Player = ({ setIsShowRightSidebar }) => {

  const [audio, setAudio] = useState(new Audio())
  const { curSongId, isPlaying, atAlbum, songs } = useSelector((state) => state.music)
  //console.log(curSongId)
  const [songInfo, setSongInfo] = useState()
  const [source, setSource] = useState(null)
  const thumbRef = useRef()
  const trackRef = useRef()
  const [curSeconds, setCurSeconds] = useState(0)
  const dispatch = useDispatch()
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadSource, setIsLoadSource] = useState(false)
  const [volume, setVolume] = useState(50)
  const [prevVolume, setPrevVolume] = useState(25);
  const [isHoverVolume, setIsHoverVolume] = useState(false);
  const volumeRef = useRef();

  // progress bar
  // gán ref = thumbref thì biến thumbref đại diện cho thẻ div đó 

  // console.log(curSongId)
  // console.log(audioEl)
  // Nếu isPlaying là true, bạn sẽ thấy biểu tượng dừng.
  //Nếu isPlaying là false, bạn sẽ thấy biểu tượng phát.

  useEffect(() => {
    const fetchDetailSong = async () => {
      // load source nếu đang lấy api thì vòng quay 
      setIsLoadSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      setIsLoadSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
        //setCurSeconds(0)
        dispatch(actions.setCurSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      }
      else {
        //audio.pause()
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.info(res2.data.msg)
        setCurSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    }

    fetchDetailSong()
  }, [curSongId])

  //console.log({ curSongId });

  const play = async () => {
    await audio.pause();
    await audio.play()
  }

  // xử lý thanh progress bar
  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    //audio.currentTime = 0

    if (isPlaying && thumbRef.current) {
      play();
      intervalId = setInterval(() => {
        // setinterval trả về 1 id
        console.log(audio.currentTime)
        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurSeconds(Math.round(audio.currentTime))
      }, 1000)
    } else {
      intervalId && clearInterval(intervalId)
    }

  }, [audio, isPlaying])


  // end song và xử lý 2 nút shuffle 
  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? play() : handleNextSong()
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    }
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audio, isShuffle, repeatMode]);


  useEffect(() => {
    audio.volume = volume / 100
  }, [audio, volume]);


  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.cssText = `right:${100 - volume}%`
    }
  }, [audio, volume]);

  // repeat once 
  // const handleRepeatOnce = () => {
  //   // console.log('repeat once')
  //   audio.play()
  //   // khi hết nó tự động chơi lại bài đó 
  // }

  useEffect(() => {
    audio.load();
    if (isPlaying) {
      play();
      //const thumbEl = document.getElementById('thumb-progress')
    }
  }, [isPlaying])

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      play();
      dispatch(actions.play(true));
    }
  }

  const handleClickProgressbar = async (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;

    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    //console.log(percent);
    setCurSeconds(Math.round(percent * songInfo.duration / 100))
  }

  // next and prev 
  const handleNextSong = () => {
    console.log(songs)
    // nếu trong album thì mới cho bấm pause next
    if (songs) {
      // songs tồn tại thì đang ở trong playlist
      // mục đích bê thằng songs ra redux cho redux render mà k chuyền cha con nữa vì
      // bê nó ra song checkk curId để biết thằng tiếp theo của thằng hiện tại 
      // vừa là global và đỡ lằng nhằng cha con songs từ Listsongs xong lại chạy sang player lằng nhằng
      // chủ yếu là tính chất global t đoán thế 

      let curentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) curentSongIndex = index
        // bài hiện tại
      });
      dispatch(actions.setCurSongId(songs[curentSongIndex + 1].encodeId))
      // bài tiếp theo
      // ấn next là bài sau tự play 
      // dispatch(actions.play(true))
    }
  }

  const handlePrevSong = () => {

    if (songs) {
      let curentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) curentSongIndex = index
        // bài hiện tại
      })
      dispatch(actions.setCurSongId(songs[curentSongIndex - 1].encodeId))
      // bài trước đó
      // ấn prev là bài sau tự play 
      // dispatch(actions.play(true))
    }
  }

  // phát tất cả khi phát xong 1 bài tự động phát bài ngẫu nhiên 
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
    setIsShuffle(prev => !prev)
  }

  // const handleToggleVolume = () => {
  //   if (+volume !== 0) {
  //     setPrevVolume(volume);
  //     setVolume(0);
  //   } else {
  //     setVolume(prevVolume);
  //   }
  // };


  return (
    <div className='bg-gradient-to-t from-[#73acac] to-transparent px-5 h-full flex'>
      <div className='w-[25%] flex-auto flex gap-3 items-center'>
        <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
          <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className='w-[50%] flex-auto flex items-center justify-center gap-2 flex-col py-2'>
        <div className='flex gap-8 justify-center items-center'>
          <span
            onClick={() => setIsShuffle(prev => !prev)}
            className={`hover:text-main-500 cursor-pointer ${isShuffle ? 'text-purple-600' : 'text-black'}`}
            title='Bật phát ngẫu nhiên'>
            <CiShuffle size={24} />
          </span>
          <span
            className={`${!songs ? 'text-gray-500 ' : 'cursor-pointer hover:text-main-500'}`}
            onClick={handlePrevSong}>
            <MdSkipPrevious size={24} />
          </span>
          <span
            className='cursor-pointer border border-gray-700 rounded-[50%] p-1 hover:text-main-500'
            onClick={handleTogglePlayMusic}
          >
            {
              !isLoadSource
                ? <LoadingSong />
                : isPlaying
                  ? <BsPauseFill size={30} />
                  : < BsFillPlayFill size={30} />
            }
          </span>
          <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer hover:text-main-500'}`}
            onClick={handleNextSong}>
            <MdSkipNext size={24} />
          </span>
          <span
            className={`hover:text-main-500 cursor-pointer ${repeatMode && 'text-purple-600'}`}
            onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
            title='Bật phát lại tất cả'>
            {repeatMode === 1 ? <PiRepeatOnceLight size={24} /> : <CiRepeat size={24} />}

          </span>
        </div>
        <div className="w-full flex items-center gap-3 justify-center text-xs">
          <span className="">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            className="w-3/5 h-[3px] hover:h-[7px] rounded-l-full cursor-pointer rounded-r-full bg-[rgba(0,0,0,0.1)] relative"
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 bottom-0 left-0 rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[25%] hidden flex-auto 1024:flex items-center justify-end gap-4">
        <div
          className='flex gap-2 item-center'
          onMouseEnter={() => setIsHoverVolume(true)}
          onMouseLeave={() => setIsHoverVolume(false)}
        >
          <span
            onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}
          >
            {+ volume >= 50 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 />}
          </span>
          <div
            className={
              `w-[100px] mt-[5px] h-[4px] rounded-l-full rounded-r-full
             bg-white ${isHoverVolume ? "hidden" : "relative"} `}
          >
            <div
              ref={volumeRef}
              className={`absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-main-500 right-[${volume}%]`}
            ></div>
          </div>
          <input
            type='range'
            step={1}
            min={0}
            max={100}
            onChange={(e) => setVolume(e.target.value)}
            className={`w-[100px] ${isHoverVolume ? 'inline' : 'hidden'}`}
          />
        </div>
        <span
          onClick={() => setIsShowRightSidebar(prev => !prev)}
          className='p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100'>
          <BsMusicNoteList size={20} />
        </span>
      </div>
    </div>
  )
}

export default Player