import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

//Chưa kết hợp giữa top 100 và section, 2 cái này giống nhau #36

const Top100 = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{data?.title}</h3>
        <span className="text-xs">{data?.items?.length > 5 && "TẤT CẢ"}</span>
      </div>
      <div className="flex justify-between items-start gap-7">
        {data?.items?.slice(0, 5).map((item) => (
          <div
            key={item.encodeId}
            className="flex flex-col gap-3 flex-auto text-sm w-1/5"
          >
            <img
              className="rounded-lg h-auto w-full cursor-pointer"
              onClick={() => {
                navigate(item?.link?.split(".")[0]);
              }}
              src={item.thumbnailM}
              alt="thumbnailSection"
            ></img>
            <span className="text-sm font-bold">
              {item.title.length > 26
                ? `${item.title.slice(0, 26)}...`
                : item.title}
            </span>
            <span className="text-gray-500">
              {item.artists.map((artist) => artist.name).join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Top100);