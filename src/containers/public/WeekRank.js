import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { RankList } from "../../components";
import { apiGetChartHome } from "../../apis";
import bgChart from '../../assets/img/week-chart-bg.jpg'

const notActiveStyle = "text-[24px] py-[12px] font-semibold opacity-70 text-black";
const activeStyle =
    "text-[24px] text-main-500 py-[12px] font-semibold border-b-2 border-[#0E8080]";

const WeekRank = ({ weekChart }) => {
    //console.log(weekChart);
    const { pid } = useParams();



    useEffect(() => {
        // console.log(pid);
    }, [pid]);

    return (
        <div>
            <div className='flex flex-col '>
                <div className="relative">
                    <img
                        src={bgChart}
                        alt='bg-chart'
                        className='w-full h-[500px] object-cover grayscale' />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]'></div>
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
                    <div className='absolute top-0 left-0 right-0 bottom-1/2 flex px-[60px] flex-col gap-4'>
                        <h3 className='font-bold text-[40px] mt-[90px] text-main-500'>Bảng Xếp Hạng Tuần</h3>
                        <div className="flex gap-8">
                            {weekChart?.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={item.link.split(".")[0]}
                                    className={({ isActive }) =>
                                        isActive ? activeStyle : notActiveStyle
                                    }
                                >
                                    {item.country === "vn"
                                        ? "VIỆT NAM"
                                        : item.country === "us"
                                            ? "US-UK"
                                            : "K-POP"}
                                </NavLink>
                            ))}
                        </div>
                        <div className="mt-4 w-full pb-[100px]">
                            <RankList
                                data={weekChart?.find((item) => item.link.includes(pid))?.items}//chartData?.RTChart?.chart?.items
                                number={10}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekRank;