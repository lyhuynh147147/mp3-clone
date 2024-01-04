import React, { useEffect } from 'react'
import { Artist, ChartSection, NewRelease, Section, Slider, Top100, WeekRank } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Sliders from "react-slick"

const Home = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7
    };

    const { newRelease, newMusic, newEveryday, artists, loveLife, top100, liveRadio, hotAlbum, friday, weekChart, favoritedArtist, singers } = useSelector(state => state.app)

    return (

        <div className='overflow-y-auto w-full'>
            <div className='w-full h-[70px]'></div>
            <Slider />
            <Section data={newEveryday} />
            <NewRelease />
            <Top100 data={top100} />
            {weekChart && <div className='flex items-center px-[44px] w-full mt-12'>
                {weekChart?.map((item) => (
                    <Link
                        to={item?.link?.split('.')[0]}
                        key={item?.link}
                        className="flex-1 px-4"
                    >
                        <img src={item.cover}
                            alt='cover'
                            className='w-full object-cover rounded-md'
                        />
                    </Link>
                ))}
            </div>}

            {favoritedArtist && <div className='mt-12 px-[59px] flex-col flex gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>{favoritedArtist?.title}</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex mx-[-16px]'>
                    {favoritedArtist?.items?.filter((i, index) => index <= 4).map(singer => {
                        return (
                            <div
                                key={singer.encodeId}
                                className='flex-1 px-4 relative'
                            >
                                <img
                                    src={singer.thumbnail}
                                    alt='singer'
                                    className='w-full object-contain rounded-md'
                                />
                                <div className='absolute w-full bottom-[16px] flex justify-evenly pr-8'>
                                    <img
                                        src={singer?.artists[0]?.thumbnail}
                                        alt='singer'
                                        className='w-[25%] object-cover rounded-md'
                                    />
                                    <img
                                        src={singer?.artists[1]?.thumbnail}
                                        alt='singer'
                                        className='w-[25%] object-cover rounded-md'
                                    />
                                    <img
                                        src={singer?.artists[2]?.thumbnail}
                                        alt='singer'
                                        className='w-[25%] object-cover rounded-md'
                                    />
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
            }
            <ChartSection />
            <Section data={liveRadio} />
            {/* {singers && <div className='px-[59px] w-full mt-12'>
                <Sliders {...settings}>
                    {singers?.map((item) => (
                        <div className='px-4'>
                            <Artist
                                key={item.id}
                                img={item.thumbnail}
                                follower={item.totalFollow}
                                link={item.link}
                                title={item.name}
                            />
                        </div>
                    ))}
                </Sliders>
            </div>} */}
            {/* <Section data={newMusic} /> */}
            {/* <Section data={artists} />
            <Section data={loveLife} /> */}
            
            {/* <Section data={hotAlbum} /> */}
            <div className='w-full h-[90px]'></div>
            {/* <NewReleas /> */}
        </div>
    )
}

export default Home