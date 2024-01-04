import React, { useState, useEffect, memo } from "react";
import { List } from "./";
import { useNavigate } from "react-router-dom";


const RankList = ({ data, isHideAlbum, number, link }) => {
    // console.log(data);
    const [isShowFull, setIsShowFull] = useState(false);
    const [songs, setSongs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isShowFull) {
            setSongs(data);
        } else {
            setSongs(data?.slice(0, number));
        }
    }, [isShowFull, data]);
    return (
        <>
            {songs?.map((item, index) => (
                <List
                    songData={item}
                    key={index}
                    isHideNode
                    order={index + 1}
                    isHideAlbum={isHideAlbum}
                />
            ))}
            <div className="w-full flex justify-center items-center">
                <button
                    type="button"
                    className="my-4 px-6 py-2 border border-[#0E8080] rounded-l-full rounded-r-full text-sm text-main-500 hover:text-white hover:bg-main-500"
                    onClick={() =>
                        link
                            ? navigate(link.split(".")[0])
                            : setIsShowFull((prev) => !prev)
                    }
                >
                    {isShowFull ? "Ẩn bớt" : "Xem tất cả"}
                </button>
            </div>
        </>
    );
};

export default memo(RankList);