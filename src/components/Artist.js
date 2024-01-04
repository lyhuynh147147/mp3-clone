import React, { memo, useState } from "react";
import { handleRoundedNumber } from "../ultis/fn";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";

const { AiOutlineUserAdd } = icons;

const Artist = ({ img, title, follower, link }) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div className="flex flex-col gap-[15px] w-full ">
            <Link
                className="relative overflow-hidden rounded-full cursor-pointer"
                to={link}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img
                    src={img}
                    alt="avt-singer"
                    className={`w-full object-contain rounded-full ${isHover ? "animate-scale-up-image" : "animate-scale-down-image"
                        }`}
                />
                {isHover && (
                    <div className="absolute right-0 bottom-0 left-0 top-0 bg-overlay-30 rounded-full"></div>
                )}
            </Link>
            <div className="flex flex-col gap-1 items-center">
                <Link
                    to={link}
                    className="text-sm font-medium hover:underline hover:text-main-500"
                >
                    {title}
                </Link>
                <span className="text-xs opacity-70">{`${handleRoundedNumber(
                    follower
                )} quan tâm`}</span>
                <button
                    type="button"
                    className="bg-main-500 px-4 py-1 text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-white"
                >
                    <span>{<AiOutlineUserAdd />}</span>
                    <span className="text-xs opacity-80">QUAN TÂM</span>
                </button>
            </div>
        </div>
    );
};

export default memo(Artist);