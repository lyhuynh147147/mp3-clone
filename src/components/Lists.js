import React, { memo } from 'react'
import { List } from './'
import icons from '../ultis/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'

const { BsDot } = icons

const Lists = ({ totalDuration, isHideTime }) => {
  const { songs } = useSelector(state => state.music)
  //console.log(songs);
  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
      <div className=' flex justify-between items-center p-[10px] font-semibold'>
        <span className={isHideTime && 'font-bold text-lg'}>BÀI HÁT</span>
        {!isHideTime && <span>ALBUM</span>}
        {!isHideTime && <span>THỜI GIAN</span>}
      </div>
      <div className='flex flex-col'>
        {songs?.map(item => (
          <List key={item.encodeId} isHideNode songData={item} />
        ))}
      </div>
      <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
      </span>
    </div>
  )
}

export default memo(Lists)