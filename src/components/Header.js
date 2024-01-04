import React from 'react'
import icons from '../ultis/icons'
import { Search } from './'
import { useNavigate, useParams } from 'react-router-dom'

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons

const Header = () => {
    
    const navigate = useNavigate()
    const { singer } = useParams()
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-6 cursor-pointer'>
                    <span onClick={() => navigate(-1)}><HiArrowNarrowLeft size={24} color={singer ? '#ccc' : 'white'} /></span>
                    <span onClick={() => navigate(1)}><HiArrowNarrowRight size={24} color={singer ? '#ccc' : 'white'} /></span>
                </div>
                <div className='768:w-1/2'>
                    <Search />
                </div>
            </div>
            <div className='hidden 640:block'>
                Login
            </div>

        </div>
    )
}

export default Header