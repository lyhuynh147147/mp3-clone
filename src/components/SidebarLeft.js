import React from 'react'
import logo from '../assets/logo.svg'
import path from '../ultis/path'
import { NavLink, useNavigate } from 'react-router-dom'
import { sidebarMenu } from '../ultis/menu'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center'

const SidebarLeft = () => {

    const navigate = useNavigate()

    return (
        <div className='flex h-full flex-col bg-main-200'>
            <div onClick={() => navigate(path.HOME)}
                className='w-full h-[70px] 1024:py-[15px] 1024:px-[25px] flex justify-start items-center cursor-pointer'>
                <img src={logo} alt='logo'
                    className='w-[120px] h-10 1024:block hidden' />
                <img
                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.76/static/media/icon_zing_mp3_60.f6b51045.svg"
                    alt="logo"
                    className="w-[75px] h-[45px] 1024:hidden"
                />

            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        end={item.end}
                        className={({ isActive }) => isActive ? activeStyle : notActiveStyle}

                    >
                        {item.icons}
                        <span className='1024:inline hidden'>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft