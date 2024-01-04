import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Header, Loading, LoadingSong, Player, SidebarLeft, SidebarRight } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars-2';
import * as actions from "../../store/actions"

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    const { isLoading, scrollTop } = useSelector(state => state.app)
    const { singer } = useParams()
    const dispatch = useDispatch()

    const handleScrollTop = (e) => {
        //console.log(e.target.scrollTop)
        if (singer) {
            if (e.target.scrollTop === 0) {
                dispatch(actions.zeroScrollTop(true));
            } else {
                dispatch(actions.zeroScrollTop(false));
            }
        }
    };

    return (
        // overfolow y auto không set cứng chiều dọc khi chiều dọc vượt quá giao diện thì sẽ xuất hiện thanh cuộn
        // min height screen chiều cao nhỏ nhất là full màn hình
        // flex-none phần tử k đc phép mở rộng giữ nguyên kích thước ban đâu trái ngược với flex autio
        // mind width 1600 trên 1600 flex dưới 16000 hidden
        // min-h-screen thì chiều cao ít nhất sẽ là chiều cao màn hình ngay cả khi nó k đủ kích thước
        // min-h-screen nếu phần tử vượt quá sẽ cuộn cho cả màn hình chứ k riêng phần tử
        // Lớp h-screen được sử dụng để thiết lập chiều cao chính xác cho phần tử bằng với chiều cao của màn hình. Nếu nội dung trong phần tử vượt quá chiều cao của màn hình, phần tử có thể trở nên cuộn lên/xuống để xem toàn bộ nội dung.
        <div className='w-full relative h-screen flex flex-col bg-[#CED9D9]'>
            <div className=' w-full h-full flex flex-auto'>
                <div className='w-[70x] h-full flex-none 1024:w-[240px]'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto relative flex flex-col '>
                    {isLoading &&
                        <div className='flex absolute z-10 top-0 bottom-0 left-0 right-0 items-center bg-[#CED9D9] justify-center '>
                            <Loading />
                        </div>
                    }
                    <div className={`
                    ${scrollTop ? 'bg-gradient-to-t from-[#1b4e4e] to-transparent' : 'bg-main-300'} h-[70px] fixed top-0 1024:left-[240px] 
                         ${isShowRightSidebar ? '1024:right-[329px] left-[75px] right-0' : 'left-[75px] right-0'}  px-[59px] z-50 flex items-center`}
                    >
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars
                            onScroll={handleScrollTop}
                            autoHide
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Outlet />
                            {/* <div className='h-[120px] w-full'></div> */}

                        </Scrollbars>
                    </div>
                </div>

                {
                    isShowRightSidebar && <div className='w-[329px] hidden 1024:flex h-screen flex-none animate-slide-left'>
                        <SidebarRight />
                    </div>
                }
            </div>
            <div className='w-full fixed bottom-0 left-0 right-0 h-[80px] z-30'>
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    )
}
export default Public

