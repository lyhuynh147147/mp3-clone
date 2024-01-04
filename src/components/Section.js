import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import SectionItem from './SectionItem';

const Section = ({ data}) => {
    const { currentWidth } = useSelector((state) => state.app);
    const navigate = useNavigate()

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold pl-4'>{data?.title}</h3>
                <span className='text-xs'>Tất cả</span>
            </div>

            <div className='flex items-start gap-2'>
                {data && data?.items?.slice(0, 5)?.map(item => (
                    <SectionItem
                        key={item.encodeId}
                        data={data}
                        title={item.title}
                        link={item.link}
                        sortDescription={item.sortDescription}
                        thumbnailM={item.thumbnailM}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(Section)