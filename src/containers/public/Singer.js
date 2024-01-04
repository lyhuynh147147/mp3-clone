import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis';
import { SongItem, Section, Artist } from "../../components";
import icons from "../../ultis/icons";
import moment from 'moment';
import { useSelector } from 'react-redux';

const { AiOutlineUserAdd, BiPlay } = icons;

const Singer = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [isHoverPlay, setIsHoverPlay] = useState(false);
    const ref = useRef();
    const { scrollTop } = useSelector(state => state.app)
    console.log(scrollTop)

    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apiGetArtist(singer);
            if (res.data.err === 0) {
                setArtistData(res.data.data);
            }
        };
        singer && fetchArtistData();
    }, [singer]);

    console.log(artistData);
    // Đưa lên đầu trang
    useEffect(() => {
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }, [singer]);

    return (
        <div className="flex flex-col w-full">
            <div ref={ref} className="relative">
                <img
                    src={artistData?.cover}
                    alt="background"
                    className="w-full h-[410px] object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(76,79,64,0.8)] to-transparent text-white">
                    <div className="absolute bottom-0 pb-6 px-[60px]">
                        <div className="flex gap-8 items-center">
                            <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
                            <span
                                className="p-2 rounded-full bg-white text-main-500 hover:text-gray-100 cursor-pointer relative"
                                onMouseEnter={() => setIsHoverPlay(true)}
                                onMouseLeave={() => setIsHoverPlay(false)}
                            >
                                <div className="w-8 h-8"></div>
                                {isHoverPlay && (
                                    <span className="absolute left-[-1px] top-[-1px] right-[-1px] bottom-[-1px] rounded-full animate-scale-up-center bg-main-500"></span>
                                )}
                                <span className="absolute left-0 top-0 right-0 bottom-0 p-2 z-50">
                                    <BiPlay size={32} />
                                </span>
                            </span>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <span className="text-sm text-gray-100 font-semibold">
                                {`${Number(artistData?.totalFollow?.toLocaleString()).toFixed(3)} người quan tâm`}</span>
                            <button
                                type="button"
                                className="bg-transparent px-4 py-1 border border-gray-300 text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-gray-100 font-semibold"
                            >
                                <span>{<AiOutlineUserAdd />}</span>
                                <span className="text-xs">QUAN TÂM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-[30px] px-[60px] flex ">
                <div className="w-[40%] flex-auto pr-4">
                    <h3 className="mb-5 font-bold text-xl">Mới nhất</h3>
                    <div className='flex gap-4 p-4 pr-11 bg-[#C4CDCC] rounded-md'>
                        <img
                            src={artistData?.sections[0].items[0].thumbnail}
                            alt='thumbnail'
                            className='w-[151px] h-[151px] object-cover rounded-md' />
                        <div className='flex flex-col text-xs gap-[12px] opacity-80 text-black'>
                            <span>Single</span>
                            <span className='text-sm font-bold'>{artistData?.sections[0].items[0].title}</span>
                            <span>{artistData?.sections[0].items[0].artistsNames}</span>
                            <span>{artistData?.sections[0].items[0].releaseDate}</span>
                            <span>{moment.utc(artistData?.sections[0].items[0].duration * 1000).format('mm:ss')}</span>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] flex-auto rounded-md">
                    <h3 className="mb-5 font-bold text-xl">Bài hát nổi bật</h3>
                    <div className="flex flex-wrap w-full justuty-between">
                        {artistData?.sections[0]?.items?.slice(0, 6)?.map((item, index) => (
                            <div
                                key={item.encodeId}
                                className="w-[90%] min-[1024px]:w-[45%] mr-6 border-b border-gray-400"
                            >
                                <SongItem
                                    thumbnail={item.thumbnailM}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    sid={item.encodeId}
                                    size="w-[40px] h-[40px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {artistData?.sections
                ?.filter((item) => item.sectionType === "playlist")
                .map((item, index) => (
                    <Section key={index} data={item} />
                ))}


            <div className="flex flex-col w-full px-[60px] mt-12">
                <h3 className="text-xl font-bold mb-5">Bạn có thể thích</h3>
                <div className="flex items-start gap-7">
                    {artistData?.sections
                        ?.find((item) => item.sectionType === "artist")
                        ?.items?.slice(0, 6)
                        ?.map((item, index) => (
                            <Artist
                                key={index}
                                img={item.thumbnailM}
                                title={item.name}
                                follower={item.totalFollow}
                                link={item.link}
                            />
                        ))}
                </div>
            </div>

            <div className="w-full px-[60px] mt-12">
                <h3 className="text-xl font-bold mb-5">
                    {`Về ${artistData?.name}`}
                </h3>
                <div className="flex gap-8">
                    <img
                        src={artistData?.thumbnail}
                        alt="avt"
                        className="w-[45%] flex-none h-[275px] object-cover rounded-md object-bos"
                    />
                    <div className="flex flex-col gap-8 text-sm opacity-80">
                        <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
                        <div className="flex flex-col gap-2">
                            <span className="text-xl font-bold">
                                {Number(artistData?.follow.toLocaleString()).toFixed(3)}
                            </span>
                            <span>Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default Singer