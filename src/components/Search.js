import React, { useEffect, useState } from 'react'
import icons from '../ultis/icons'
import { apiSearch } from '../apis';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import path from '../ultis/path';
import { GrClose } from 'react-icons/gr';

const { FiSearch } = icons

const Search = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('');
    const { singer } = useParams();

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
    }

    return (
        <div className='w-full flex relative items-center'>
            {keyword &&
                <span
                    onClick={() => setKeyword('')}
                    className='absolute right-[16px] cursor-pointer'>
                    <GrClose />
                </span>}
            <span className={`h-10 pl-4 ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-[#DDE4E4]'} flex items-center justify-center rounded-l-[20px] text-gray-500`}>
                <FiSearch size={24} />
            </span>
            <input
                type='text'
                className={`outline-none px-4 ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-[#DDE4E4]'} py-2 w-full rounded-r-[20px] h-10 text-gray-500`}
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    )
}

export default Search