import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SongItem from './SongItem'

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.app);
    const [isActive, setIsActive] = useState(0);
    const [songs, setSongs] = useState([[]]);

    useEffect(() => {
        if (isActive === 0) {
            setSongs(newRelease?.items?.all);
        } else if (isActive === 1) {
            setSongs(newRelease?.items?.vPop);
        } else {
            setSongs(newRelease?.items?.others);
        }
    }, [isActive, newRelease]);

    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <h3 className="text-xl font-bold">{newRelease?.title}</h3>
            <div className="flex items-center justify-between">
                <div className="flex gap-5 text-xs">
                    <button
                        onClick={() => setIsActive(0)}
                        type="button"
                        className={`py-1 px-6 rounded-l-full rounded-r-full border-[0.5px] border-gray-500 ${isActive === 0 && "bg-main-500 text-white"
                            }`}
                    >
                        TẤT CẢ
                    </button>
                    <button
                        onClick={() => setIsActive(1)}
                        className={`py-1 px-6 rounded-l-full rounded-r-full border-[0.5px] border-gray-500 ${isActive === 1 && "bg-main-500 text-white"
                            }`}
                        type="button"
                    >
                        VIỆT NAM
                    </button>
                    <button
                        type="button"
                        className={`py-1 px-6 rounded-l-full rounded-r-full border-[0.5px] border-gray-500 max-768:hidden ${isActive === 2 && "bg-main-500 text-white"
                            }`}
                        onClick={() => setIsActive(2)}
                    >
                        QUỐC TẾ
                    </button>
                </div>
                <span className="text-xs ">TẤT CẢ</span>
            </div>
            <div className="flex flex-wrap w-full justify-between">
                {songs?.map((item, index) => (
                    <div key={index} className="w-[90%] 768:w-[45%] 1024:w-[30%]">
                        <SongItem
                            key={index}
                            thumbnail={item.thumbnailM}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default NewRelease;