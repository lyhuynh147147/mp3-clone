import React from 'react'
import { useSelector } from 'react-redux'
import { SongItem, List, SectionItem, Artist, } from "../../components";
import { handleRoundedNumber } from "../../ultis/fn";

const SearchAll = () => {

  const { searchData } = useSelector((state) => state.music)
  console.log(searchData)
  //console.log(searchData.playlists[0].encodeId)

  return (
    <div className="w-full flex flex-col px-[60.6667px] gap-[60px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
        <div className="flex gap-8 ">
          {searchData?.top && (
            <div className="p-[10px] cursor-pointer bg-main-200 rounded-md flex flex-1 gap-8 items-center">
              <img
                src={searchData?.top.thumbnail}
                alt="thumbnail"
                className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === "artist" && "rounded-full"
                  }`}
              />
              <div className="flex flex-col text-xs">
                <span className="mb-[6px]">
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
                </span>
                <span className="text-sm font-semibold">
                  {searchData.top.title || searchData.top.name}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span>
                    {handleRoundedNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm"}
                  </span>
                )}
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item, i) => (
              <div
                //key={i}
                key={item.encodeId}
                className="flex-1">
                <SongItem
                  thumbnail={item.thumbnail}
                  sid={item.encodeId}
                  title={item.title}
                  artists={item.artistsNames}
                  size="w-[84px] h-[84px]"
                  style="bg-main-200"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold mb-5 pl-2">BÀI HÁT</h3>
          <span className="text-sm text-gray-500 mb-5 pr-2">{"TẤT CẢ >"}</span>
        </div>
        <div className="flex justify-between gap-2 flex-wrap w-full">
          {searchData?.songs?.slice(0, 6)?.map((item, i) => (
            <div
              //key={i}
              key={item.encodeId}
              className={`flex-auto w-[45%] ${i % 2 !== 0 ? "pl-4" : "pr-4"}`}
            >
              <List
                songData={item}
                isHideAlbum
                isHideNode />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5">Playlist/Album</h3>
        <div className="flex justify-between items-start gap-7">
          {searchData?.playlists?.slice(0, 5)?.map((item, index) => (
            // Chưa giống, xử lý css sau
            <SectionItem
              // item={item}
              key={index}
              //key={item?.encodeId}
              //data={item}
              title={item?.title}
              link={item?.link}
              sortDescription={item?.sortDescription}
              thumbnailM={item?.thumbnailM}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5">Nghệ Sĩ/OA</h3>
        <div className="flex gap-[28px] ">
          {searchData?.artists?.slice(0, 5)?.map((item, index) => (
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
      <div className='w-full h-[50px]'></div>
    </div>
  );
};

export default SearchAll